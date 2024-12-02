import { FC, useEffect, useState } from "react";
import { TProduct } from "../../types/products";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "@mui/material";
import { useLazyGetProductsQuery } from "@/store/productsApi";
import { setProducts, setSearchText } from "@/store/productsSlice";
import { PRODUCTS_LOAD_LIMIT } from "@/utils/constants";

const ProductList: FC = () => {
  const [getProducts, { isFetching, error }] = useLazyGetProductsQuery();

  const dispatch = useDispatch();
  const { products, allProductsLength, searchText } = useSelector(
    (state: RootState) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState<TProduct[]>();

  useEffect(() => {
    setFilteredProducts(products);
    dispatch(setSearchText(""));
  }, [products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product: TProduct) =>
        product.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  const handleLoadMore = async () => {
    const {
      products: loadedProducts,
      allProductsLength: loadedAllProductsLength,
    } = await getProducts({
      amount: PRODUCTS_LOAD_LIMIT,
      offset: products.length,
    }).unwrap();

    dispatch(
      setProducts({
        products: loadedProducts,
        allProductsLength: loadedAllProductsLength,
      })
    );
  };

  const renderProductCard = (list: TProduct[]) =>
    list.map((product: TProduct) => (
      <Link key={product.id} href={`products/${product.id}`}>
        <ProductCard cardInfo={product} />
      </Link>
    ));

  return (
    <>
      <section className={s.productList}>
        {products ? (
          searchText && filteredProducts ? (
            renderProductCard(filteredProducts)
          ) : (
            renderProductCard(products)
          )
        ) : (
          <div>Loading products...</div>
        )}
      </section>
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
