import React from 'react'

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Case() {

    const router = useRouter();
    const { status } = router.query;

    const donation = {
        name: 'alex',
        price: 100
    }

    const publishableKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
    const stripePromise = loadStripe(publishableKey);

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;
        const checkoutSession = await await axios.post('/api/create-stripe-session', {
          donation: donation,
        });
        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
    };

  return (
    <div className="p-10 space-y-3">
        {status && status === 'success' && (
          <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
            Payment Successful
          </div>
        )}
        {status && status === 'cancel' && (
          <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
            Payment Unsuccessful
          </div>
        )}
        <p>{donation.name}</p>
        <p>{donation.price}</p>
        <button className='text-white bg-black py-2 px-4 rounded-lg' onClick={createCheckOutSession}>Donate</button>
    </div>
  )
}
