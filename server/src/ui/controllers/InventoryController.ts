import { Route, Tags, Get, Queries } from "tsoa";
import type { GetInventoryReportValidator } from "../validators/Inventory/GetInventoryReportValidator.js";
import { PaginationHelper } from "../helpers/PaginationHelper.js";
import dbImport from "../../sequelize/models/index.cjs";
import type { ProductCategoryType, ProductType } from "../types/ProductTypes.js";
import type { IPaginationMeta } from "../types/CommonTypes.js";

const db = dbImport as any;

const { products, categories, Sequelize } = db;

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
}
