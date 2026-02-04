export interface IPaginationMeta {
  currentPage: number;
  previousPage: number;
  nextPage: number;
  totalPage: number;
  totalData: number;
  limit: number;
}
export interface GetAllQueryType {
  search: string;
  page: number;
  limit: number;
  orderBy: string;
}