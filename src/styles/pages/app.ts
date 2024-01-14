import { styled } from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const LayoutHeader = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const CartButton = styled('button', {
  position: 'relative',
  padding: '0.75rem',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.85,
    transition: 'ease-in-out 100ms'
  },
  '&:active': {
    opacity: 0.65,
  },
  variants: {
    color: {
      gray: {
        backgroundColor: '$gray800',
      },
      green: {
        backgroundColor: '$green500',
      }
    }
  },
  defaultVariants: {
    color: 'gray'
  }
})

export const Badge = styled('span', {
  position: 'absolute',
  top: -6,
  right: -6,
  color: '$white',
  fontSize: '$xs',
  fontWeight: '700',
  lineHeight: '22.40px',
  backgroundColor: '$green500',
  border: '2px solid $gray900',
  width: '24px',
  height: '24px',
  borderRadius: '100%',
}) 
