'use client'

import { HomeContainer, Product } from '@/styles/pages/home'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCarouselProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef}>
      {products?.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        </Link>
      ))}
    </HomeContainer>
  )
}
