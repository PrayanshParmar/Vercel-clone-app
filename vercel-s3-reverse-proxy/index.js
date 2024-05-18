const express = require("express");
const app = express();
require("dotenv").config();
const httpProxy = require("http-proxy");
const PORT = String(process.env.PORT);

const BASE_PATH = process.env.BASE_PATH;

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
proxy.on("error", (err, req, res) => {
  res.status(500).send('Proxy server error.');
});

app.listen(PORT, () => {
  console.log(`Reverse proxy running on ${PORT}`);
});
