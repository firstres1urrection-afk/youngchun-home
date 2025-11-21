const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create a checkout session with price_data instead of priceId to avoid expired price IDs
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Youngchun Beta Ticket',
                description: 'Beta 이용권'
              },
              unit_amount: 500,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/overseas-mode.html`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
      });
      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
}
