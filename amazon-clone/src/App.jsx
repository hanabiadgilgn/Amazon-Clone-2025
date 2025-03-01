import { useState } from "react";
import Header from "./Components/Header/Header";
import CarouselEffect from "./Components/Carousel/CarouselEffect";
import Category from './Components/Category/Category';


function App() {
  return (
    <div>
      <Header />
      <CarouselEffect />
      <Category />
    </div>
  );
}

export default App;
