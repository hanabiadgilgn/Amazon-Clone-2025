import React from 'react'
import { FadeLoader } from 'react-spinners'

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50-vh",
      }}
    >
      <FadeLoader color="#11701e"  />
    </div>
  );
}

export default Loader