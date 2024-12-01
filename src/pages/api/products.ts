import { products } from "@/data/products";
import { TProduct } from "@/types/products";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<TProduct[]>) {
  res.status(200).json(products);
}
