
import express, { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const mainRouter = express.Router({
  strict: true
});

mainRouter.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res
      .status(StatusCodes.OK)
      .json({
        message: 'TEST',
        status: StatusCodes.OK,
      })
  } catch (err) {
    next(err);
  }
});