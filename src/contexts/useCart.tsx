import axios from 'axios'
import React, { ReactNode, createContext, useContext, useReducer, useState } from 'react'

interface CartItem {
  id: string
  name: string
  price: string
  imageUrl: string
  defaultPriceId: string
  quantity: number
}

interface CartState {
  items: CartItem[]
}

interface CartContextProps {
  cartState: CartState
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  completePurchase: () => Promise<void>
  isCreatingCheckoutSession: boolean
}

interface CartProviderProps {
  children: ReactNode
}

const initialCartState: CartState = {
  items: [],
}

const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CLEAR_CART = 'CLEAR_CART'

type CartAction =
  | { type: typeof ADD_TO_CART; payload: CartItem }
  | { type: typeof REMOVE_FROM_CART; payload: string }
  | { type: typeof CLEAR_CART }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      }
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      }
    default:
      return state
  }
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  function addToCart(item: CartItem) {
    dispatch({ type: ADD_TO_CART, payload: item })
  }

  function removeFromCart(itemId: string) {
    dispatch({ type: REMOVE_FROM_CART, payload: itemId })
  }

  function clearCart() {
    dispatch({ type: CLEAR_CART })
  }

  async function completePurchase() {
    try {
      setIsCreatingCheckoutSession(true);

      const products = cartState.items.map((item) => ({
        priceId: item.defaultPriceId,
        quantity: item.quantity
      }));

      const response = await axios.post('/api/checkout', {
        products: products,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  }

  const contextValue: CartContextProps = {
    cartState,
    addToCart,
    removeFromCart,
    clearCart,
    completePurchase,
    isCreatingCheckoutSession
  }

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
