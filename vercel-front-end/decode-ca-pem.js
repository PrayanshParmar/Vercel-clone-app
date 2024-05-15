const fs = require('fs');
const path = require('path');

const decodeCaPem = () => {
  const caPemBase64 = process.env.PRISMA_CA_PEM_BASE64;
  if (!caPemBase64) {
    throw new Error('Environment variable PRISMA_CA_PEM_BASE64 is not set.');
  }

  const caPem = Buffer.from(caPemBase64, 'base64').toString('utf-8');
  const prismaFolderPath = path.join(process.cwd(), 'prisma');
  const caPemPath = path.join(prismaFolderPath, 'ca.pem');

  if (!fs.existsSync(prismaFolderPath)) {
    fs.mkdirSync(prismaFolderPath);
  }

  fs.writeFileSync(caPemPath, caPem);
  console.log(`CA certificate written to ${caPemPath}`);
};

decodeCaPem();
