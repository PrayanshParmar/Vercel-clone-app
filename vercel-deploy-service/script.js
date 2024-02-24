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

   await producer.send({topic: 'container-logs', messages: [{key: 'log', value: JSON.stringify({PROJECT_ID,DEPLOYMENT_ID,log})}]})
}

async function init() {

  await producer.connect();

  console.log("Executing script.js");
  await publishLogs("Build Started...");
  const outDirPath = path.join(__dirname, "output");
  console.log(outDirPath);
  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log("Data", data.toString());
     publishLogs(data.toString());
  });

  p.stdout.on("error", function (data) {
    console.log("Error", data.toString());
    publishLogs(`error: ${data.toString()}`);
  });

  p.on("close", async function () {
    console.log("Build completed");
    await publishLogs("Build completed");
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
}

init();
