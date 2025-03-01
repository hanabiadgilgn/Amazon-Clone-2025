import React from "react";
import { categoryInfos } from './categoryFullInfos.js'
import CategoryCard from "./CategoryCard.jsx"
import classes from './Category.module.css'

function Category() {
  return (
    <section className={classes.category__container}>
      {
        categoryInfos.map((infos)=> (
          <CategoryCard data= {infos} />
        ))
      }
    </section>
    
  );
}

export default Category;
