const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const s3Client = require("./config/s3.connector");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const kafkaConnector = require("./config/kafka.connector");
const mime = require("mime-types");

const PROJECT_ID = process.env.PROJECT_ID;
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID;
const GIT_REPOSITORY__URL = process.env.GIT_REPOSITORY__URL;

const producer = kafkaConnector.producer();

async function publishLogs(log, status) {
  await producer.send({
    topic: "container-logs",
    messages: [
      { key: "log", value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, log, status }) },
    ],
  });
}

async function handleError(log) {
  await publishLogs(`Error: ${log}`,"FAILED");
  console.error(log);
  process.exit(1); // Exit the process with a non-zero status code to indicate failure
}

async function init() {
  try {
    await producer.connect();
    await publishLogs(`Cloning ${GIT_REPOSITORY__URL}`,"IN_PROGRESS");
    await publishLogs("Cloning completed","IN_PROGRESS");
    console.log("Executing script.js");
    await publishLogs("Build Started...","IN_PROGRESS");

    const outDirPath = path.join(__dirname, "output");
    console.log(outDirPath);

    const pInstall = exec(`cd ${outDirPath} && npm install`);

    pInstall.stdout.on("data", function (data) {
      console.log("npm install output:", data.toString());
      publishLogs(data.toString(),"IN_PROGRESS");
    });

    pInstall.stderr.on("data", function (data) {
      console.error("npm install error:", data.toString());
      publishLogs(`npm install error: ${data.toString()}`,"IN_PROGRESS");
    });

    pInstall.on("exit", async function (code) {
      if (code !== 0) {
        return handleError("npm install failed");
      }

      console.log("npm install completed");
      await publishLogs("npm install completed","IN_PROGRESS");

      console.log("Executing npm run build...");
      const pBuild = exec(`cd ${outDirPath} && npm run build`);

      pBuild.stdout.on("data", function (data) {
        console.log("npm run build output:", data.toString());
        publishLogs(data.toString(),"IN_PROGRESS");
      });

      pBuild.stderr.on("data", function (data) {
        console.error("npm run build error:", data.toString());
        publishLogs(`npm run build error: ${data.toString()}`,"IN_PROGRESS");
      });

      pBuild.on("exit", async function (code) {
        if (code !== 0) {
          return handleError("npm run build failed");
        }

        console.log("npm run build completed");
        await publishLogs("npm run build completed","IN_PROGRESS");

        const buildFolderPath = fs.existsSync(
          path.join(__dirname, "output", "build")
        )
          ? path.join(__dirname, "output", "build")
          : path.join(__dirname, "output", "dist");
        const buildFolderContents = fs.readdirSync(buildFolderPath, {
          recursive: true,
        });

        await publishLogs("Starting to upload","IN_PROGRESS");
        for (const file of buildFolderContents) {
          const filePath = path.join(buildFolderPath, file);
          if (fs.lstatSync(filePath).isDirectory()) continue;

          console.log("uploading", filePath);
          await publishLogs(`uploading ${file}`,"IN_PROGRESS");
          const command = new PutObjectCommand({
            Bucket: String(process.env.AWS_S3_BUCKET_NAME),
            Key: `outputs/${PROJECT_ID}/${file}`,
            Body: fs.createReadStream(filePath),
            ContentType: mime.lookup(filePath),
          });

          await s3Client.send(command);
          console.log("uploaded", filePath);
          await publishLogs(`uploaded ${file}`,"IN_PROGRESS");
        }

        console.log("Done...");
        await publishLogs("Done...","READY");
        process.exit(0); // Exit the process with a success code
      });
    });
  } catch (error) {
    await handleError(`Unexpected error: ${error.message}`);
  }
}

init();
