const fs = require('fs');
const path = require('path');

// Decode the base64 string from the environment variable
const caPemBase64 = process.env.PRISMA_CA_PEM_BASE64;
if (!caPemBase64) {
    throw new Error('Environment variable PRISMA_CA_PEM_BASE64 is not set.');
}

const caPem = Buffer.from(caPemBase64, 'base64').toString('utf-8');

// Write the decoded content to the Prisma folder
const prismaFolderPath = path.join(__dirname, 'prisma');
const caPemPath = path.join(prismaFolderPath, 'ca.pem');

// Ensure the Prisma directory exists
if (!fs.existsSync(prismaFolderPath)) {
    fs.mkdirSync(prismaFolderPath);
}

// Write the file
fs.writeFileSync(caPemPath, caPem);
