import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: String(process.env.REGION),
  credentials: {
    accessKeyId: String(process.env.AWS_VERCEL_ACCESS_KEY),
    secretAccessKey: String(process.env.AWS_VERCEL_SECRET_ACCESS_KEY),
  },
});
