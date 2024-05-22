import express from "express";
import logs from "./logs";

const router = express.Router();

export default (): express.Router => {

  logs(router);

  return router;
};
