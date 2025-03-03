import React from 'react'
import Rating from "@mui/material/Rating"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
import { Button } from '@mui/material';
import classes from './Product.module.css'


function ProductCard({product}) {

    const {image, title, id, rating, price} = product;

  return (
    <div className={`${classes.card__container}`}>
      <a href="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* count */}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
          <br></br>
        </div>
      </div>
      <button className={classes.button}>add to cart</button>
    </div>
  );
}

export default ProductCard