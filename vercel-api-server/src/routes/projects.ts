import express from 'express';
import { createProject, deployProject } from '../controllers/handle-project';


export default (router: express.Router) => {
  router.post('/api/v1/project',createProject);
  router.get('/api/v1/deploy',deployProject);
  
};