const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const params = new URLSearchParams();
    params.append('mode', 'payment');
    params.append('success_url', 'https://youngchun-home.vercel.app/overseas-mode.html');
    params.append('cancel_url', 'https://youngchun-home.vercel.app/');
    params.append('automatic_payment_methods[enabled]', 'true');
    params.append('line_items[0][price_data][currency]', 'usd');
    params.append('line_items[0][price_data][product_data][name]', 'Youngchun Beta 이용권');
    params.append('line_items[0][price_data][unit_amount]', '500');
    params.append('line_items[0][quantity]', '1');

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await response.json();
    if (session.url) {
      res.status(200).json({ url: session.url });
    } else {
      res.status(500).json({ error: session.error || 'Failed to create session' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
