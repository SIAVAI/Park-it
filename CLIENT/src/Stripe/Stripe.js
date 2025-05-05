// Stripe.js (make sure this file exists)
import { loadStripe } from "@stripe/stripe-js";

// Define stripePromise with the public key
export const stripePromise = loadStripe(
  "pk_test_51RL5zfEIQKivmoRR0M70yZyhL3V0pdCUKuJm5e1FB734sWu8iDIX37IErjDWDP33UvdJ3ENq8RYkn3RnR83XBPt0000QR6VtN0"
); // Public key for frontend
