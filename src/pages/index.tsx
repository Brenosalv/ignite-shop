import cart2Image from "@/assets/cart2.svg"
import { useCart } from "@/contexts/useCart"
import { CartButton } from "@/styles/pages/app"
import { ProductType } from "@/types/product"
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from "next"
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from "stripe"
import { stripe } from "../lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"

interface HomeProps {
  products: ProductType[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  })

  const { addToCart, cartState } = useCart()

  function handleCartClick(event: { preventDefault: () => void }, product: ProductType) {
    event.preventDefault()
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <CartButton color='green' onClick={(event) => handleCartClick(event, product)}>
                    <Image src={cart2Image} alt="Cart" />
                  </CartButton>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100),
      defaultPriceId: price.id,
      quantity: 0
    }
  })

  return {
    props: {
      list: [1, 2, 3],
      products
    },
    revalidate: 60 * 60 * 2 // Request each 2 hours
  }
}
