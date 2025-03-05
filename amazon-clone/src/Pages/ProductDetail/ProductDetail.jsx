import React, { useEffect, useState } from 'react'
import classes from './ProductDetail.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loader from '../../Components/Loader/Loader';

function ProductDetail() {
  const [product, setProduct] = useState({})
  const [isLoading, setLoading] = useState(false)
  const {productId} = useParams()
 

  useEffect(()=> {
    // when the page refershed setLoading should be true
    setLoading(true)
    // by using axios, we can requst the product id
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
      setLoading(false)
    })
  }, [])


  return (
    <LayOut>
      {isLoading ? (<Loader />) : (<ProductCard 
      product={product} 
      flex={true} 
      renderDescption={true} 
      />)}
    </LayOut>
  );
}

export default ProductDetail