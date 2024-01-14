import closeImg from "@/assets/close.svg";
import { useCart } from "@/contexts/useCart";
import {
  CartEmpty,
  CloseButton, CompletePurchaseButton, ContentContainer,
  ImageContainer,
  ProductContainer,
  ProductInfoContainer,
  ProductName,
  ProductPrice,
  ProductQuantity,
  ProductsList,
  QuantityLabel,
  QuantityValue, RemoveProductButton, SidebarContainer,
  SummaryInfoContainer, Title,
  TotalValue, TotalValueLabel
} from '@/styles/components/cartSidebar';
import Image from 'next/image';

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

const CartSidebar = ({ isOpen, onClose }: CartSidebarProps) => {
  const { cartState, removeFromCart, isCreatingCheckoutSession, completePurchase } = useCart()

  const numberOfProductsInCart = cartState.items.reduce((acc, currentValue) => (
    acc + currentValue.quantity
  ), 0)

  const totalValue = cartState.items.reduce((accumulator, currentItem) => (
    accumulator + parseFloat(currentItem.price.replace(/[^0-9.-]/g, '')) * currentItem.quantity
  ), 0)

  const totalValuePrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format((totalValue || 0) / 100)

  function handleRemoveItem(itemId: string) {
    removeFromCart(itemId)
  }

  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>
        <Image src={closeImg} alt='Close' />
      </CloseButton>

      <ContentContainer>
        <Title>
          Shopping cart
        </Title>

        {numberOfProductsInCart === 0 && <CartEmpty>Your shopping cart is empty.</CartEmpty>}

        <ProductsList>
          {cartState.items?.map((item) => (
            <ProductContainer key={item.id}>
              <ImageContainer>
                <Image src={item.imageUrl} width={100} height={100} alt="Product Image" />
              </ImageContainer>

              <ProductInfoContainer>
                <ProductName>
                  {item.name}
                </ProductName>

                <ProductPrice>
                  {item.price}
                </ProductPrice>

                <ProductQuantity>
                  Qtd: {item.quantity}
                </ProductQuantity>

                <RemoveProductButton onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </RemoveProductButton>
              </ProductInfoContainer>
            </ProductContainer>
          ))}
        </ProductsList>

        <footer>
          <SummaryInfoContainer>
            <QuantityLabel>
              Quantity
            </QuantityLabel>

            <QuantityValue>
              {numberOfProductsInCart} items
            </QuantityValue>
          </SummaryInfoContainer>

          <SummaryInfoContainer>
            <TotalValueLabel>
              Total value
            </TotalValueLabel>

            <TotalValue>
              {totalValuePrice}
            </TotalValue>
          </SummaryInfoContainer>

          <CompletePurchaseButton disabled={isCreatingCheckoutSession || numberOfProductsInCart === 0} onClick={completePurchase}>
            Complete purchase
          </CompletePurchaseButton>
        </footer>
      </ContentContainer>
    </SidebarContainer>
  )
}

export default CartSidebar
