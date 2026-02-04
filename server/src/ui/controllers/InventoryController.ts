import { Route, Tags, Get, Queries, Patch, Body, Path } from "tsoa";
import type { GetInventoryReportValidator } from "../validators/Inventory/GetInventoryReportValidator.js";
import { PaginationHelper } from "../helpers/PaginationHelper.js";
import dbImport from "../../sequelize/models/index.cjs";
import type { ProductCategoryType, ProductType } from "../types/ProductTypes.js";
import type { IPaginationMeta } from "../types/CommonTypes.js";
import type { InventoryReduceValidator } from "../validators/Inventory/InventoryReduceValidator.js";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";

const db = dbImport as any;

const { products, categories, stock_logs, Sequelize, sequelize } = db;

@Route("/api/inventory")
@Tags('Inventory API')
export class InventoryController {
  constructor() {}

  @Get('report')
  public async getInventoryReport(@Queries() query: GetInventoryReportValidator): Promise<{ data: ProductType[], count: number, paginationMeta: IPaginationMeta }> {
    const whereOption = {
      is_deleted: false,
    };
    let order = PaginationHelper.sorter(query.orderBy || "+name");
    if (query.name) {
      Object.assign(whereOption, {
        name: {
          [Sequelize.Op.iLike]: `%${query.name}%`
        }
      });
    }
    if (query.categoryId) {
      Object.assign(whereOption, {
        category_id: query.categoryId,
      });
    }

    const {limit, offset} = PaginationHelper.getOffsetLimit(query.page, query.limit);
    const productDataRaw = await products.findAndCountAll({
      where: whereOption,
      limit,
      offset,
      order,
      attributes: ['id', 'name', 'stock'],
      include: [{
        model: categories,
        required: true,
        where: {
          is_deleted: false,
        },
        attributes: ["id", "name"],
      }]
    });

    const productData: ProductType[] = productDataRaw.rows.map((prod: any) => {
      const category: ProductCategoryType = {
        category_id: prod.category.id,
        name: prod.category.name,
      }
      const product: ProductType = {
        product_id: prod.id,
        name: prod.name,
        stock: prod.stock,
        category: category,
      }
      return product;
    });

    const paginationMeta = PaginationHelper.generateMeta(query.page, query.limit, productDataRaw.count);

    return {
      data: productData,
      count: productDataRaw.count,
      paginationMeta: paginationMeta,
    };
  }

  @Patch(':id/reduce')
  public async reduceInventory(@Path() id: number, @Body() query: InventoryReduceValidator): Promise<boolean> {
    if (query.amount < 1) {
      throw createHttpError(StatusCodes.BAD_REQUEST, 'Please select the correct Amount');
    }

    const t = await sequelize.transaction();
    try {
      const inventoryDataRaw = await products.findOne({
        where: {
          id: id,
          is_deleted: false,
        },
        transaction: t,
        lock: t.LOCK.UPDATE,
        attributes: ['id', 'name', 'stock'],
      });
      if (!inventoryDataRaw) throw createHttpError(StatusCodes.NOT_FOUND, 'Product Not Found');
      const productData: ProductType = {
        product_id: inventoryDataRaw.id,
        name: inventoryDataRaw.name,
        stock: inventoryDataRaw.stock,
      }

      if (productData.stock < query.amount) {
        throw createHttpError(StatusCodes.BAD_REQUEST, 'Stock is not Available');
      }

      const newStock = productData.stock - query.amount;
      
      await products.update({ stock: newStock },
        {
          where: {
            id: productData.product_id,
          },
          transaction: t,
        },
      );

      await stock_logs.create({
        product_id: productData.product_id,
        type: 'REDUCE',
        time: new Date(),
      }, {
        transaction: t,
      });

      await t.commit();
      return true;
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
}
