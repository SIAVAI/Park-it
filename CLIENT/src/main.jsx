import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Provider/AuthProvider";
import { Elements } from "@stripe/react-stripe-js";

import router from "./Routes/Router";
import { stripePromise } from "./Stripe/Stripe";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>

      <Toaster />
    </AuthProvider>
  </StrictMode>
);
