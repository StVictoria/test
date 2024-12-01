import { TGetProductsResponse } from "@/types/responses";
import api from "./api";

export const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      TGetProductsResponse,
      { amount: number; offset: number }
    >({
      query: ({ amount, offset }) =>
        `/products?amount=${amount}&offset=${offset}`,
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetProductsQuery } = productsApi;
