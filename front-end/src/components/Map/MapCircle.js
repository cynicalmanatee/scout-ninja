import React from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Circle,
} from "react-google-maps";
import MapMarker from "./MapMarker";

/**
 * A 2d map render that creates a draggable circle rendered on top of a map.
 * Used after start coordinates have been chosen to draw the bounds of the game. 
 * 
 * @params initial start coordinates and function to set bounds radius
 * @return JSX elements
 */
const Map = (props) => { 

  // Function to pass radius of circle up to CreateGame
  const setBounds = (val) => props.func(val);

  var radius = 0;

  // Stores the current circle radius in the state
  function updateRadius() {
    radius = this.getRadius();
    console.log(radius);
    setBounds(Math.floor(radius));
  }

  return (
    <>
      <GoogleMap defaultZoom={15} defaultCenter={props.startcoord}>
        <MapMarker lat={props.startcoord.lat} lng={props.startcoord.lng} />
        {/* <MapMarker lat={props.endcoord.lat} lng={props.endcoord.lng} /> */}
        <Circle
          defaultCenter={props.startcoord}
          defaultRadius={100}
          defaultDraggable={false}
          defaultEditable={true}
          defaultVisible={true}
          onRadiusChanged={updateRadius}
        />
      </GoogleMap>
    </>
  );
};

/**
 * Wraps the map in google map javascript functionalities.
 * Allows us to utilize the various apis provided by react-google-maps.
 * 
 * @returns a wrapped JSX element
 */
const WrappedMap = withScriptjs(withGoogleMap(Map));

/**
 * The render for the google map wrapped in the javascript functionalities provided by react-google.maps.
 * Contains the API key and map parameters used to render the map.
 * 
 * @params a whole list of various functions and states passed down from CreateGame
 * @returns JSX elements
 */
const MapCircle = (props) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAP_KEY}`}
        loadingElement={<div style={{ height: "100%" }}></div>}
        containerElement={<div style={{ height: "100%" }}></div>}
        mapElement={<div style={{ height: "100%" }}></div>}
        startcoord={props.start}
        // endcoord={props.end}
        func={props.func}
      />
    </div>
  );
};

export default MapCircle;
