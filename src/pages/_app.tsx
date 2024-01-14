import { Header } from "@/components/Header";
import { CartProvider } from "@/contexts/useCart";
import { globalStyles } from '@/styles/global';
import '@/styles/globals.css';
import { Container } from "@/styles/pages/app";
import type { AppProps } from 'next/app';

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
