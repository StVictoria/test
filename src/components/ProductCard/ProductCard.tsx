import { FC } from "react";
import { TProduct } from "../../types/products";
import { Card } from "@mui/material";
import s from "./ProductCard.module.scss";

interface IProductCard {
  cardInfo: TProduct;
}

const ProductCard: FC<IProductCard> = ({ cardInfo }) => {
  const { title, price, shortDesc } = cardInfo;

  return (
    <Card className={s.productCard}>
      <h3>📖 {title}</h3>
      <div className={s.price}>$ {price}</div>
      <p>{shortDesc}</p>
    </Card>
  );
};

export default ProductCard;
