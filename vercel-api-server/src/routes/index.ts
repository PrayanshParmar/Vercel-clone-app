import express from "express";
import user from "./user";

import projects from "./projects";
import logs from "./logs";

const router = express.Router();

export default (): express.Router => {
  user(router);
  projects(router);
  logs(router);

  return router;
};
