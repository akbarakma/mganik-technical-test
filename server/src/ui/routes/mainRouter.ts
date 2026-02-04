import express from 'express';
import { inventoryRouter } from './InventoryRouter.js';

export const mainRouter = express.Router({
  strict: true
});

mainRouter.use('/inventory', inventoryRouter);