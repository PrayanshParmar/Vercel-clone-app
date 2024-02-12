const { S3Client } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: String(process.env.REGION),
  credentials: {
    accessKeyId: String(process.env.AWS_VERCEL_ACCESS_KEY),
    secretAccessKey: String(process.env.AWS_VERCEL_SECRET_ACCESS_KEY),
  },
});

module.exports = s3Client;
