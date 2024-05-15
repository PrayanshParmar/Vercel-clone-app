import express from 'express';
import { createProject, deployProject, getProject } from '../controllers/handle-project';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';


export default (router: express.Router) => {
  router.post('/api/v1/project',ClerkExpressRequireAuth(),createProject);
  router.post('/api/v1/deploy',deployProject);
  router.get('/api/v1/project',ClerkExpressRequireAuth(), getProject);
  
};