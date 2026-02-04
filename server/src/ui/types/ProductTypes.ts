export interface ProductType {
  product_id: number;
  name: string;
  stock: number;
  category: ProductCategoryType;
}

export interface ProductCategoryType {
  category_id: number;
  name: string;
}