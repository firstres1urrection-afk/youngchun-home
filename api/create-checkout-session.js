const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { priceId } = req.body;
      if (!priceId) {
        return res.status(400).json({ error: 'Missing priceId' });
      }
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          { price: priceId, quantity: 1 },
        ],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/overseas-mode.html?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?canceled=true`,
      });
      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }
}
