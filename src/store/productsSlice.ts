import { TProduct } from "@/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TProductsState = {
  products: TProduct[];
  allProductsLength: number;
  searchText: string;
};

const initialState: TProductsState = {
  products: [],
  allProductsLength: 0,
  searchText: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(
      state,
      {
        payload: { products, allProductsLength },
      }: PayloadAction<{ products: TProduct[]; allProductsLength: number }>
    ) {
      state.products = [...state.products, ...products];
      state.allProductsLength = allProductsLength;
    },
    setSearchText(state, { payload }: PayloadAction<string>) {
      state.searchText = payload;
    },
  },
});

export const { setProducts, setSearchText } = productsSlice.actions;
export default productsSlice.reducer;
