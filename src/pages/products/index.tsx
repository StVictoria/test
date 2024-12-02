import { FC, useEffect, useState } from "react";
import ProductList from "@/components/ProductsList/ProductsList";
import { GetServerSideProps } from "next";
import { TProduct } from "@/types/products";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/store/productsSlice";
import Search from "@/components/Search/Search";
import { TGetProductsResponse } from "@/types/responses";
import { BASE_URL, PRODUCTS_LOAD_LIMIT } from "@/utils/constants";
import { RootState } from "@/store/store";

interface IProducts {
  products: TProduct[];
  allProductsLength: number;
}

const ProductsPage: FC<IProducts> = ({ products, allProductsLength }) => {
  const dispatch = useDispatch();
  const { products: storedProducts } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!storedProducts.length) {
      dispatch(setProducts({ products, allProductsLength }));
    }
  }, []);

  return (
    <main>
      <Search />
      <ProductList />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `${BASE_URL}/products?amount=${PRODUCTS_LOAD_LIMIT}&offset=0`
  );
  const { products, allProductsLength }: TGetProductsResponse =
    await res.json();

  return {
    props: { products, allProductsLength },
  };
};

export default ProductsPage;
