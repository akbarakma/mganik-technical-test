import Joi from "joi";
import type { Request } from 'express';
import { Example } from "tsoa";

export class GetInventoryReportValidator {
  @Example(1)
  page: number;
  @Example(5)
  limit: number;
  /**
   * Order the results by a field.
   * Examples:
   * - "+name" + for ascending
   * - "-name" - for descending
   * - default: "+name"
   */
  orderBy?: string;
  name?: string;
  categoryId?: number;
  
  static getAllQuery(request: Request) {
    const querySchema = Joi.object({
      page: Joi
        .number()
        .min(1)
        .default(1),
      limit: Joi
        .number()
        .max(50)
        .default(5),
      orderBy: Joi
        .string(),
      name: Joi
        .string()
        .optional()
        .allow(""),
      categoryId: Joi
        .number()
        .optional(),
    });
    const query = request.query;
    const result = querySchema.validate(query);
    return result;
  }
}