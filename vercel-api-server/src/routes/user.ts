import express from 'express';
import { createUser, findUser } from '../controllers/handle-user';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';


export default (router: express.Router) => {
  router.post('/api/v1/user', ClerkExpressRequireAuth(), createUser);
  router.get('/api/v1/user', ClerkExpressRequireAuth(), findUser);
  

};