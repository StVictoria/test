import { products } from "@/data/products";
import { TGetProductsResponse } from "@/types/responses";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TGetProductsResponse>
) {
  const { amount, offset } = req.query;

  let limit = products.length;
  let start = 0;

  if (amount && typeof amount === "string") {
    const parsedAmount = parseInt(amount, 10);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      limit = Math.min(parsedAmount, products.length);
    }
  }
  if (offset && typeof offset === "string") {
    const parsedOffset = parseInt(offset, 10);
    if (!isNaN(parsedOffset) && parsedOffset >= 0) {
      start = Math.min(parsedOffset, products.length);
    }
  }

  const slicedProducts = products.slice(start, start + limit);

  res
    .status(200)
    .json({ products: slicedProducts, allProductsLength: products.length });
}
