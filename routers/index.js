import express from 'express';
import userRouter from './user.js';
import trackRouter from './track.js';
import scrapRouter from './scrap.js';

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/track', trackRouter);
mainRouter.use('/scrap', scrapRouter);

export default mainRouter;