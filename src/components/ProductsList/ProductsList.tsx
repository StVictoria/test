import { FC } from "react";
import { TProduct } from "../../types/products";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import Link from "next/link";

interface IProductList {
  list: TProduct[];
}

const ProductList: FC<IProductList> = ({ list }) => {
  const renderProductCard = () =>
    list ? (
      list.map((product: TProduct) => (
        <Link key={product.id} href={`products/${product.id}`}>
          <ProductCard cardInfo={product} />
        </Link>
      ))
    ) : (
      <div>Loading products...</div>
    );

  return <section className={s.productList}>{renderProductCard()}</section>;
};

export default ProductList;
