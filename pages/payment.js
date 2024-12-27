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

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || ""
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Please enter your card details.");
      setLoading(false);
      return;
    }

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
      body: JSON.stringify({ amount: 5000, description: "Auction Payment" }),
    });

    if (!response.ok) {
      setError("Failed to create payment intent.");
      setLoading(false);
      return;
    }

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
      <CardElement className="border border-gray-300 rounded p-3" />
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {success && (
        <p className="text-green-500 font-medium">Payment successful! 🎉</p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded text-white transition ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? <span className="loader"></span> : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: 'url("/images/hero.png")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Complete Your Payment
            </h1>
            <p className="text-gray-600">
              Secure your car auction payment quickly and easily.
            </p>
          </header>
          <CheckoutForm />
        </div>
      </div>
    </div>
  </Elements>
);

export default PaymentPage;
