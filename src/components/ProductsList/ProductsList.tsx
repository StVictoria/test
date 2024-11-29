import { FC } from "react";
import { TProduct } from "../../types/products";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";

interface IProductList {
  list: TProduct[];
}

const ProductList: FC<IProductList> = ({ list }) => {
  const renderProductCard = () =>
    list.map((product: TProduct) => (
      <ProductCard key={product.id} cardInfo={product} />
    ));

  return <section className={s.productList}>{renderProductCard()}</section>;
};

export default ProductList;
