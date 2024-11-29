import { FC } from "react";
import { TProduct } from "../../types/products";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ProductList: FC = () => {
  const { products } = useSelector((state: RootState) => state.products);

  const renderProductCard = () =>
    products ? (
      products.map((product: TProduct) => (
        <ProductCard key={product.id} cardInfo={product} />
      ))
    ) : (
      <div>Loading products...</div>
    );

  return <section className={s.productList}>{renderProductCard()}</section>;
};

export default ProductList;
