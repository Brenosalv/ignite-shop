import cartImage from "@/assets/cart.svg"
import logoImg from "@/assets/logo.svg"
import { useCart } from "@/contexts/useCart"
import { Badge, CartButton, LayoutHeader } from "@/styles/pages/app"
import Image from "next/image"
import { useState } from "react"
import CartSidebar from "./CartSidebar"

export function Header() {
  const { cartState } = useCart()

  const [isOpen, setIsOpen] = useState(false)

  const numberOfProductsInCart = cartState.items.reduce((acc, currentValue) => (
    acc + currentValue.quantity
  ), 0)

  function handleCartSidebarOpen() {
    setIsOpen(isOpen => !isOpen)
  }

  function handleCartSidebarClose() {
    setIsOpen(false)
  }

  return (
    <LayoutHeader>
      <Image src={logoImg} alt="" />

      <CartButton onClick={handleCartSidebarOpen}>
        <Image src={cartImage} alt="Cart" />
        {numberOfProductsInCart > 0 && <Badge>{numberOfProductsInCart}</Badge>}
      </CartButton>

      <CartSidebar isOpen={isOpen} onClose={handleCartSidebarClose} />
    </LayoutHeader>
  )
}
