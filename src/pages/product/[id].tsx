import { useCart } from "@/contexts/useCart";
import { ProductType } from "@/types/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useCart()

  function handleAddToCart() {
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>{product?.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product?.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product?.name}</h1>
          <span>{product?.price}</span>

          <p>{product?.description}</p>

          <button onClick={handleAddToCart}>
            Add to cart
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return ({
    paths: [
      { params: { id: 'prod_Mss1OHIN02ducn' } }
    ],
    fallback: true
  })
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id || '';

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product?.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product?.id,
        name: product?.name,
        imageUrl: product?.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format((price.unit_amount || 0) / 100),
        description: product?.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 2  // Request each 2 hours
  }
}
