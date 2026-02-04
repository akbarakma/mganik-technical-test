import express, { type Request, type Response, type NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import { GetInventoryReportValidator } from '../validators/Inventory/GetInventoryReportValidator.js';
import { InventoryController } from '../controllers/InventoryController.js';

export const inventoryRouter = express.Router({
  strict: true
});

const inventoryController = new InventoryController();

inventoryRouter.get('/report', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = GetInventoryReportValidator.getAllQuery(req);
    if (error) {
      let message = 'Internal Server Error';
      if (error.details[0]?.message) message = error.details[0]?.message;
      throw createError(StatusCodes.BAD_REQUEST, message);
    }
    const result = await inventoryController.getInventoryReport(value);
    res
      .status(StatusCodes.OK)
      .json({
        message: 'GET_INVENTORY_REPORT',
        status: StatusCodes.OK,
        content: result,
      });
  } catch (err) {
    next(err);
  }
});

inventoryRouter.patch('/:id/reduce', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = GetInventoryReportValidator.getAllQuery(req);
    if (error) {
      let message = 'Internal Server Error';
      if (error.details[0]?.message) message = error.details[0]?.message;
      throw createError(StatusCodes.BAD_REQUEST, message);
    }
    const result = await inventoryController.getInventoryReport(value);
    res
      .status(StatusCodes.OK)
      .json({
        message: 'GET_INVENTORY_REPORT',
        status: StatusCodes.OK,
        content: result,
      });
  } catch (err) {
    next(err);
  }
});