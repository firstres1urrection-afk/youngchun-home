const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Youngchun Beta Ticket',
                description: 'Beta ticket',
              },
              unit_amount: 500, // USD 5.00
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/overseas-mode.html?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?canceled=true`,
      });

      return res.status(200).json({ url: session.url });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', 'POST');
  res.status(405).end('Method not allowed');
}
