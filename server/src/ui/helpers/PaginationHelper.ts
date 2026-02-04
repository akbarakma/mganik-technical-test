import type { IPaginationMeta } from '../types/CommonTypes.js';

export class PaginationHelper {
  static camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

  public static sorter(sort: string): object {
    const sorts: any = [];
    const sortStrings = sort.split(',');

    for (const item of sortStrings) {
      let sortString = item.trim();
      let sortMethod;
      if (sortString.charAt(0) === '-') {
        sortMethod = 'desc';
      } else {
        sortMethod = 'asc';
      }
      sortString = sortString.substr(1);
      sorts.push([this.camelToSnakeCase(sortString), sortMethod]);
    }

    return sorts;
  }

  public static generateMeta(page = 1, limit = 10, totalData: number): IPaginationMeta {
    const totalPage = Math.ceil(totalData / limit);
    return {
      currentPage: Number(page),
      previousPage: (page > 0) ? (Number(page) - 1) : 0,
      nextPage: (page < Number(totalPage)) ? (Number(page) + 1) : Number(totalPage),
      totalPage,
      totalData,
      limit: Number(limit),
    };
  }

  public static getOffsetLimit(page = 1, perPage = 10): { offset: number; limit: number } {
    let offset = 0; let limit = 0;

    if (page <= 0) {
      page = 1;
    }
    page = page - 1;
    offset = (page * perPage);
    limit = perPage;

    return { offset, limit };
  }
}