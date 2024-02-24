import express from 'express';
import { createUser } from '../controllers/handle-user';


export default (router: express.Router) => {
  router.post('/api/v1/user',createUser);

};