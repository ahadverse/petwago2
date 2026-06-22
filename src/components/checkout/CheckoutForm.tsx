'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

interface CheckoutFormProps {
  onBack: () => void;
  paymentIntentId: string;
  orderNumber: string;
}

export default function CheckoutForm({ onBack, paymentIntentId, orderNumber }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartTotal, clearCart } = useCart();
  const { clearGuestUser } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shipping = cartTotal >= 49 ? 0 : 6.99;
  const total = cartTotal + shipping;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/thank-you?status=success&order=${orderNumber}`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message ?? 'Payment failed. Please try again.');
      setIsProcessing(false);
      return;
    }

    if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
      await fetch(`/api/orders/by-payment-intent/${paymentIntentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: paymentIntent.status === 'succeeded' ? 'paid' : 'processing' }),
      });
      clearCart();
      clearGuestUser();
      router.push(`/thank-you?status=success&order=${orderNumber}`);
    } else {
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Return to information
        </button>
        <Button type="submit" size="lg" disabled={!stripe} loading={isProcessing}>
          {`Pay $${total.toFixed(2)}`}
        </Button>
      </div>
    </form>
  );
}
