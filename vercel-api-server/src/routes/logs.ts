import express from 'express';
import { getLogs } from '../controllers/handle-logs';


export default (router: express.Router) => {
  router.get('/api/v1/logs/:id',getLogs);

};