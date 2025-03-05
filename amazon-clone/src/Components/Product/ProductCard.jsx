import React from 'react'
import Rating from "@mui/material/Rating"
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat';
// import{ Button}  from '@mui/material'
import classes from './Product.module.css'
import {Link} from 'react-router-dom'

function ProductCard({product, flex, renderDescption}) {

    const {image, title, id, rating, price, description} = product;

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDescption && <div style={{maxWidth: "750px"}}>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
          <br></br>
        </div>
        <button className={classes.button}>
        add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard