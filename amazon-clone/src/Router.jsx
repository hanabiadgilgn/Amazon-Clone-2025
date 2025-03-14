import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51I1dlkDtHgkAHmA7pvXDrVerAcAvRdKqVcSEsd7GXSPvTziyDiccTHA2hz0a4hWBVWz8tGILAIZ6kPEP2vEzpEnc005ZWx8Kj0"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        <Route path="/payments" element={
            <ProtectedRoute
              msg={"you must log in to pay"}
              redirect={"/payments"} 
              >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />

        <Route path="/orders" element={
            <ProtectedRoute
              msg={"you must log in to see your orders"}
              redirect={"/orders"}
              >
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;