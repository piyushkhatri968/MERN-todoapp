import React from "react";
import Atom from "react-loading-indicators/Atom";

const Spinner = () => {
  return (
    <div>
      <Atom
        text="Loading..."
        textColor="black"
        color="black" // spinner color
        style={{ fontSize: "25px" }} // overall size of the spinner
      />
    </div>
  );
};

export default Spinner;
