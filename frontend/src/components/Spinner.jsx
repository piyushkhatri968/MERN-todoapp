import React from "react";
import OrbitProgress from "react-loading-indicators/OrbitProgress";

const Spinner = () => {
  return (
    <div>
      <OrbitProgress text="Loading" size="large" textColor="black" />
    </div>
  );
};

export default Spinner;
