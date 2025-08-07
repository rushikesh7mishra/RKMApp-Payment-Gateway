import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Premium() {
  const [searchParams] = useSearchParams();
  const [isPremium, setIsPremium] = useState(Cookies.get("isPremium") === "true");

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "success") {
      alert("Payment successful! You are now a premium user.");
      Cookies.set("isPremium", "true", { expires: 7 });
      setIsPremium(true);
    } else if (status === "cancel") {
      alert("Payment canceled.");
    }
  }, [searchParams]);

  const handleCheckout = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({ sessionId: data.id });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  const handleCancelPremium = () => {
    Cookies.remove("isPremium");
    setIsPremium(false);
    alert("You are no longer a premium user.");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-24 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800/60 backdrop-blur-md shadow-xl rounded-xl p-10 max-w-md text-center"
      >
        {isPremium ? (
          <>
            <h2 className="text-3xl font-bold text-green-400 mb-4">You're a Premium User 🎉</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancelPremium}
              className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold"
            >
              Cancel Premium
            </motion.button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
            <p className="text-gray-300 mb-6">Get full access for just $30.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
            >
              Proceed to Payment
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
