import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './payment.module.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const cardElementOptions = {
  style: {
    base: {
      display: 'flex',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // amount in cents
    })
      .then((response) => response.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      alert('Payment successful!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <CardElement id='elements' options={cardElementOptions} className={styles.CardElement} />
      <button type="submit" disabled={!stripe} className={styles.button}>Pay</button>
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </form>
  );
};

const PaymentPage = () => (
  <div className={styles.container}>
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  </div>
);

export default PaymentPage;
