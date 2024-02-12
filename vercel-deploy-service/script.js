const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const s3Client = require("./config/s3.connector");
const redisPublisher = require("./config/redis.connector");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const PROJECT_ID = process.env.PROJECT_ID;

function publishLogs(logs) {
  redisPublisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ logs }));
}

async function init() {
  console.log("Executing script.js");
  publishLogs("Build Started...");
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
    publishLogs("Build completed");
    const buildFolderPath = path.join(__dirname, "output", "build");
    const buildFolderContents = fs.readdirSync(buildFolderPath, {
      recursive: true,
    });

    publishLogs("Starting to upload");
    for (const file of buildFolderContents) {
      const filePath = path.join(buildFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log("uploading", filePath);
      publishLogs(`uploading ${file}`);
      const command = new PutObjectCommand({
        Bucket: String(process.env.AWS_S3_BUCKET_NAME),
        Key: `outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath),
      });

      await s3Client.send(command);
      console.log("uploaded", filePath);
      publishLogs(`uploaded ${file}`);
    }
    console.log("Done...");
    publishLogs("Done...");
  });
}

init();
