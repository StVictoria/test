import { TProduct } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TProductsState = {
  products: TProduct[];
};

const initialState: TProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<TProduct[]>) {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
