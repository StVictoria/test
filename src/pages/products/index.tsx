import { TextField } from "@mui/material";
import { FC, useEffect } from "react";
import ProductList from "@/components/ProductsList/ProductsList";
import { GetServerSideProps } from "next";
import { TProduct } from "@/types/products";
import { useDispatch } from "react-redux";
import { setProducts } from "@/store/productsSlice";

interface IProducts {
  products: TProduct[];
}

const ProductsPage: FC<IProducts> = ({ products }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(products));
  }, []);

  return (
    <main>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{ marginBottom: "40px" }}
      />
      <ProductList />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/products");
  const products: TProduct[] = await res.json();

  return {
    props: { products },
  };
};

export default ProductsPage;
