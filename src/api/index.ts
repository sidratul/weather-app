import express from 'express';
import { weaterRouter } from './weather';

export const apiRouter = express.Router();
apiRouter.use('/weather', weaterRouter);


