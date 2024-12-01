import { FC, useEffect, useState } from "react";
import ProductList from "@/components/ProductsList/ProductsList";
import { GetServerSideProps } from "next";
import { TProduct } from "@/types/products";
import { useDispatch } from "react-redux";
import { setProducts } from "@/store/productsSlice";
import Search from "@/components/Search/Search";
import debounce from "@/utils/debounce";
import { TGetProductsResponse } from "@/types/responses";
import { PRODUCTS_LOAD_LIMIT } from "@/utils/constants";

interface IProducts {
  products: TProduct[];
  allProductsLength: number;
}

const ProductsPage: FC<IProducts> = ({ products, allProductsLength }) => {
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] =
    useState<TProduct[]>(products);

  const handleSearch = debounce((queryStr: string) => {
    setFilteredProducts(
      products.filter((product: TProduct) =>
        product.title.toLowerCase().includes(queryStr.toLowerCase())
      )
    );
  });

  useEffect(() => {
    dispatch(setProducts({ products, allProductsLength }));
  }, []);

  return (
    <main>
      <Search onSearch={handleSearch} />
      <ProductList list={filteredProducts} />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `http://localhost:3000/api/products?amount=${PRODUCTS_LOAD_LIMIT}&offset=0`
  );
  const { products, allProductsLength }: TGetProductsResponse =
    await res.json();

  return {
    props: { products, allProductsLength },
  };
};

export default ProductsPage;
