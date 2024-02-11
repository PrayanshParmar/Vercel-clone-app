const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const s3Client = require("./config/s3.connector");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
var mime = require("mime-types");

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
  console.log("Executing script.js");
  const outDirPath = path.join(__dirname, "output");
  console.log(outDirPath);
  const p = exec(`cd ${outDirPath} && npm install && npm run build`);

  p.stdout.on("data", function (data) {
    console.log("Data", data.toString());
  });

  p.stdout.on("error", function (data) {
    console.log("Error", data.toString());
  });

  p.on("close", async function () {
    console.log("Build completed");
    const buildFolderPath = path.join(__dirname, "output", "build");
    const buildFolderContents = fs.readdirSync(buildFolderPath, { recursive: true });

    for (const file of buildFolderContents) {
      const filePath = path.join(buildFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      console.log("uploading", filePath);
      const command = new PutObjectCommand({
        Bucket: String(process.env.AWS_S3_BUCKET_NAME),
        Key: `outputs/${PROJECT_ID}/${file}`,
        Body: fs.createReadStream(filePath),
        ContentType: mime.lookup(filePath),
      });

      await s3Client.send(command);
      console.log("uploaded", filePath);
    }
    console.log("Uploaded Sucessfully");
  });
}

init();
