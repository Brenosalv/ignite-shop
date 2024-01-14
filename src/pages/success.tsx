import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesList, ProductsList, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  costumerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase complete | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Purchase complete</h1>

        <ImagesList>
          {products?.map((product) => (
            <ImageContainer>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ImagesList>

        {products.length === 1 ? (
          <p>
            Uhuul <strong>{costumerName}</strong>, your <strong>{products[0].name}</strong> already is on the way.
          </p>
        ) : (
          <>
            <p>
              Uhuul <strong>{costumerName}</strong>, your t-shirts already are on the way:
            </p>
            {products?.map((product) => (
              <ProductsList>
                <li>{product.name}</li>
              </ProductsList>
            ))}
          </>
        )}

        <Link href="/">
          Back to catalog
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const costumerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product;

  const products = session.line_items?.data.map(
    (lineItemData) => ({
      name: (lineItemData?.price?.product as Stripe.Product).name,
      imageUrl: (lineItemData?.price?.product as Stripe.Product).images[0]
    }))

  return {
    props: {
      costumerName,
      products: products
    }
  }
}
