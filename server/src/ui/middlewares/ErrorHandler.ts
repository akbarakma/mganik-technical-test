import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export class ErrorHandler {
  static handle (err: any, req: Request, res: Response, next: NextFunction) {
    console.log('Error Message: ', err.message);
    console.log("Url          : ", req.originalUrl);
    // console.log(err);
    if (req.body) console.log('req.body: ', req.body);
    if (req.query) console.log('req.query: ', req.query);
    if (req.params) console.log('req.params: ', req.params);
    console.log("\n");
    if (err.status && err.message) {
      res
        .status(err.status)
        .json({
          message: err.message,
          status: err.status,
        })
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: 'internal_server_error',
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        })
    }
  }
}