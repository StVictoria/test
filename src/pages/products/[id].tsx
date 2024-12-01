import { TProduct } from "@/types/products";
import { GetServerSidePropsContext } from "next";
import { FC } from "react";
import s from "./ProductPage.module.scss";
import Image from "next/image";
import bookImg from "@/assets/bookImg.png";

interface IProductPage {
  product: TProduct;
}

const ProductPage: FC<IProductPage> = ({ product }) => {
  const { title, price, fullDesc } = product;
  return product ? (
    <section className={s.page}>
      <Image
        src={bookImg}
        alt="Book image"
        placeholder="blur"
        width={200}
        className={s.image}
      />
      <h2>{title}</h2>
      <p className={s.price}>$ {price}</p>
      <p>{fullDesc}</p>
    </section>
  ) : (
    <div>Loading product...</div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await res.json();

  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
};

export default ProductPage;
