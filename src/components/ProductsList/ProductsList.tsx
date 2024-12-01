import { FC } from "react";
import { TProduct } from "../../types/products";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import { useLazyGetProductsQuery } from "@/store/productsApi";
import { setProducts } from "@/store/productsSlice";
import { PRODUCTS_LOAD_LIMIT } from "@/utils/constants";

interface IProductList {
  list: TProduct[];
}

const ProductList: FC<IProductList> = ({ list }) => {
  const [getProducts, { isFetching, error }] = useLazyGetProductsQuery();

  const { products, allProductsLength } = useSelector(
    (state: RootState) => state.products
  );

  const dispatch = useDispatch();

  const handleLoadMore = async () => {
    const {
      products: loadedProducts,
      allProductsLength: loadedAllProductsLength,
    } = await getProducts({ amount: PRODUCTS_LOAD_LIMIT, offset: products.length }).unwrap();
    dispatch(
      setProducts({
        products: loadedProducts,
        allProductsLength: loadedAllProductsLength,
      })
    );
  };

  const renderProductCard = () =>
    products ? (
      products.map((product: TProduct) => (
        <Link key={product.id} href={`products/${product.id}`}>
          <ProductCard cardInfo={product} />
        </Link>
      ))
    ) : (
      <div>Loading products...</div>
    );

  return (
    <>
      <section className={s.productList}>{renderProductCard()}</section>
      {allProductsLength > products.length && (
        <Button
          fullWidth
          size="large"
          variant="outlined"
          style={{ marginTop: "20px" }}
          disabled={isFetching}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default ProductList;
