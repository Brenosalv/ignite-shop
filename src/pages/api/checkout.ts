import { NextApiRequest, NextApiResponse } from "next"
import { stripe } from "../../lib/stripe"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { products } = req.body

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." })
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ error: 'Prices not found or invalid format.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const lineItems = products.map(product => ({
    price: product.priceId,
    quantity: product.quantity,
  }))

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
