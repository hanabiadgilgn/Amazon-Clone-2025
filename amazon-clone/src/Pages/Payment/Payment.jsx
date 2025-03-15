import React, { useContext, useState } from 'react'
import classes from './Payment.module.css'
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard"
import { useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from '../../Api/axios.js';
import { ClipLoader } from "react-spinners";
import { db } from '../../Utility/firebase.js';
import { useNavigate } from 'react-router-dom';


function Payment() {
  const [{ user, basket }] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false)

  // stripe confirms the payment
  const stripe = useStripe();
  // elements confirms the card
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. backend OR function ----> contact to the client secrect
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2. client side OR react side confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // console.log(paymentIntent);

      // 3. after the confirmation ----> then SAVE the orders in firestone database, and then clear the basket.
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

      setProcessing(false);
      
      navigate("/orders", {state: {msg: "you have placed new Orders"}})
    } catch (error) {
      console.log(error)
      setProcessing(false)
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      {/* Payment */}
      <section className={classes.payment}>
        {/* Address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Test street</div>
            <div>MN, Rosemount</div>
          </div>
        </div>
        <hr />

        {/* Product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit"> 
                    {
                      processing? (
                        <div className={classes.loading}> 
                          <ClipLoader color="gray" size={12}/> 
                          <p>Please Wait ...</p>
                        </div> ): ("Pay Now ")
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment
