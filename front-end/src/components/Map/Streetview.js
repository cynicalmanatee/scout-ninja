/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import GoogleStreetview from "react-google-streetview";

const Streetview = () => {
  return (
    <div style={{height: "300px", width: "300px"}}>
      <GoogleStreetview apiKey={process.env.REACT_APP_MAP_KEY} />
    </div>
  );
};

export default Streetview;
