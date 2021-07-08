import React from "react";
import { Marker } from "react-google-maps";
import logo from "../Generic-Components/assets/Logo.png";

/**
 * A map marker to be rendered on the map when placing clues or starting coordinates.
 * 
 * @params coordinates to render the marker on
 * @return JSX elements
 */
const MapMarker = (props) => {
  const defaultMapOptions = {
    fullscreenControl: false,
    clickableIcons: false,
  };

  return (
    <Marker
      icon={{
        url: logo,
        scaledSize: new window.google.maps.Size(50, 50),
        anchor: new window.google.maps.Point(25, 45),
        options: { defaultMapOptions },
      }}
      position={{ lat:  props.lat , lng:  props.lng  }}
    />
  );
};

export default MapMarker;
