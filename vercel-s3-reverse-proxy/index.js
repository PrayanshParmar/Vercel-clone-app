const express = require("express");
const app = express();
require("dotenv").config();
const httpProxy = require("http-proxy");
const PORT = String(process.env.PORT);

const BASE_PATH =
  "https://vercel-s3-bucket.s3.ap-south-1.amazonaws.com/outputs";

const proxy = httpProxy.createProxyServer();

app.use((req, res) => {
  const hostname = req.hostname;
  const subdomian = hostname.split(".")[0];
  const resolvesTo = `${BASE_PATH}/${subdomian}`;

  return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});

proxy.on("proxyReq", (proxyReq, req, rea) => {
  const url = req.url;
  if (url === "/") {
    proxyReq.path += "index.html";
  }
});

app.listen(PORT, () => {
  console.log(`Reverse proxy running on ${PORT}`);
});
