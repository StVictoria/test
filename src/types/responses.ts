import { TProduct } from "./products";

export type TGetProductsResponse = {
  products: TProduct[];
  allProductsLength: number;
};
