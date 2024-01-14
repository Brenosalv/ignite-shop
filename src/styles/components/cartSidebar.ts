import { styled } from '..'

export const SidebarContainer = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  width: '20%',
  backgroundColor: '$gray800',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  transition: 'transform 0.3s ease-out',
  transform: 'translateX(100%)',

  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0)',
      },
    },
  },
})

export const CloseButton = styled('button', {
  width: '24px',
  height: '24px',
  cursor: 'pointer',
  position: 'absolute',
  top: 24,
  right: 24,
  backgroundColor: 'transparent',
  border: 'none'
})

export const ContentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '3rem',
  height: '100%',

  footer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'column',
  }
})

export const ProductsList = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24
})

export const Title = styled('h2', {
  color: '$gray100',
  fontSize: '$lg',
  fontWeight: 700,
  lineHeight: '2rem',
  wordWrap: 'break-word'
})

export const ProductContainer = styled('div', {
  display: 'flex',
  gap: 20
})

export const ProductInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const ProductName = styled('p', {
  color: '$gray300',
  fontSize: '$md',
  lineHeight: '1.8rem',
  wordWrap: 'break-word'
})

export const ProductPrice = styled('p', {
  color: '$gray100',
  fontSize: '$md',
  fontWeight: 700,
  lineHeight: '1.8rem',
  wordWrap: 'break-word'
})

export const RemoveProductButton = styled('button', {
  color: '$green500',
  fontSize: '$sm',
  fontWeight: 700,
  lineHeight: '1.6rem',
  wordWrap: 'break-word',
  backgroundColor: 'transparent',
  border: 'none',
  width: 'fit-content',
  cursor: 'pointer',
  marginTop: 8
})

export const SummaryInfoContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 8
})

export const QuantityLabel = styled('label', {
  color: '$gray100',
  lineHeight: '1.6rem',
  wordWrap: 'break-word'
})

export const QuantityValue = styled('span', {
  color: '$gray300',
  fontSize: '$md',
  lineHeight: '1.8rem',
  wordWrap: 'break-word'
})

export const TotalValueLabel = styled('label', {
  color: '$gray100',
  fontSize: '$md',
  fontWeight: 700,
  lineHeight: '1.8rem',
  wordWrap: 'break-word'
})

export const TotalValue = styled('span', {
  color: '$gray100',
  fontSize: '$xl',
  lineHeight: '2.1rem',
  wordWrap: 'break-word'
})

export const CompletePurchaseButton = styled('button', {
  padding: '20px 32px',
  backgroundColor: '$green500',
  color: '$white',
  fontSize: '$md',
  fontWeight: 700,
  lineHeight: '1.8rem',
  wordWrap: 'break-word',
  borderRadius: 8,
  border: 'none',
  marginTop: 60,
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 120,
  height: 120,
  background: 'linear-gradient(188deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})

export const CartEmpty = styled('p', {
  textAlign: 'center'
})

export const ProductQuantity = styled('p', {
  color: '$gray100',
  fontSize: '$xs',
  fontWeight: 400,
  lineHeight: '1.8rem',
  wordWrap: 'break-word'
})
