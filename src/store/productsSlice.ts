import { TProduct } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TProductsState = {
  products: TProduct[];
  allProductsLength: number;
};

const initialState: TProductsState = {
  products: [],
  allProductsLength: 0,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(
      state,
      {
        payload: { products, allProductsLength },
      }: PayloadAction<TProductsState>
    ) {
      state.products = [...state.products, ...products];
      state.allProductsLength = allProductsLength;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
