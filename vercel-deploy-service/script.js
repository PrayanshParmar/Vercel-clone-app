const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const s3Client = require("./config/s3.connector");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const kafkaConnector = require('./config/kafka.connector');
const mime = require("mime-types");

const PROJECT_ID = process.env.PROJECT_ID;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;

const producer = kafkaConnector.producer();

async function publishLogs(log) {
    await producer.send({ topic: 'container-logs', messages: [{ key: 'log', value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, log }) }] });
}

async function init() {
    await producer.connect();

    console.log("Executing script.js");
    await publishLogs("Build Started...");
    const outDirPath = path.join(__dirname, "output");
    console.log(outDirPath);
    const pInstall = exec(`cd ${outDirPath} && npm install`);

    pInstall.stdout.on("data", function (data) {
        console.log("npm install output:", data.toString());
        publishLogs(data.toString());
    });

    pInstall.stderr.on("data", function (data) {
        console.error("npm install error:", data.toString());
        publishLogs(`npm install error: ${data.toString()}`);
    });

    pInstall.on("close", async function () {
        console.log("npm install completed");
        publishLogs("npm install completed");

        console.log("Executing npm run build...");
        const pBuild = exec(`cd ${outDirPath} && npm run build`);

        pBuild.stdout.on("data", function (data) {
            console.log("npm run build output:", data.toString());
            publishLogs(data.toString());
        });

        pBuild.stderr.on("data", function (data) {
            console.error("npm run build error:", data.toString());
            publishLogs(`npm run build error: ${data.toString()}`);
        });

        pBuild.on("close", async function () {
            console.log("npm run build completed");
            publishLogs("npm run build completed");

            const buildFolderPath = path.join(__dirname, "output", "build");
            const buildFolderContents = fs.readdirSync(buildFolderPath, {
                recursive: true,
            });

            await publishLogs("Starting to upload");
            for (const file of buildFolderContents) {
                const filePath = path.join(buildFolderPath, file);
                if (fs.lstatSync(filePath).isDirectory()) continue;

                console.log("uploading", filePath);
                await publishLogs(`uploading ${file}`);
                const command = new PutObjectCommand({
                    Bucket: String(process.env.AWS_S3_BUCKET_NAME),
                    Key: `outputs/${PROJECT_ID}/${file}`,
                    Body: fs.createReadStream(filePath),
                    ContentType: mime.lookup(filePath),
                });

                await s3Client.send(command);
                console.log("uploaded", filePath);
                await publishLogs(`uploaded ${file}`);
            }
            console.log("Done...");
            await publishLogs("Done...");
            process.exit(0);
        });
    });
}

init();
