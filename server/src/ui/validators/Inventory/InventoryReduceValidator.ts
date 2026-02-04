import Joi from "joi";
import type { Request } from 'express';

export class InventoryReduceValidator {
  amount: number;
  
  static getQuery(request: Request) {
    const querySchema = Joi.object({
      productId: Joi
        .number(),
      amount: Joi
        .number(),
    });
    const query = request.body;
    Object.assign(query, {
      productId: request.params.id,
    });
    const result = querySchema.validate(query);
    return result;
  }
}