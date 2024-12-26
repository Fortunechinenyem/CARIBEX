import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
console.log("Stripe Public Key:", process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const card = elements.getElement(CardElement);
    const { error: stripeError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    const response = await fetch("/api/payment/intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, description: "Auction Payment" }), // Replace with dynamic data
    });

    const data = await response.json();
    const { clientSecret } = data;

    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmResult.error) {
      setError(confirmResult.error.message);
    } else if (confirmResult.paymentIntent.status === "succeeded") {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Payment successful!</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6">Complete Your Payment</h1>
      <CheckoutForm />
    </div>
  </Elements>
);

export default PaymentPage;
