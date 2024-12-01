import { products } from '@/data/products';
import { TProduct } from '@/types/products';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const product = products.find((product: TProduct) => product.id === +id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.status(200).json(product);
}