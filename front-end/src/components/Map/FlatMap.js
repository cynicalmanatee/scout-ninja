import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
import { Button } from "react-bootstrap";
import MapMarker from "./MapMarker";

/**
 * Displays a map that allows the user to place markers and confirm their submission.
 * Used in CreateGame to place starting coordinates as well as hint markers.
 * 
 * @params various states that allow FlatMap to set values as well as confirm selection
 * @returns JSX elements
 */
const Map = (props) => {

  // States for setting, submitting, and confirming start marker
  var startConfirmed = props.startConfirmed;
  var confirmStart = (val) => props.confirmStart(val);
  const [startMarker, setStartMarker] = useState(props.startCoord);

  // State on whether to allow markers to be placed
  var done = props.done;
  var setDone = (val) => props.setDone(val);

  // Alert display state
  const [alertPop, setAlert] = useState(false);

  // State for whether the map is displayed to set a clue
  const [settingClue, setSettingClue] = useState(props.settingClue);

  // Clue marker coordinates state
  const [clueMarker, setClueMarker] = useState();
  
  // States for index of clicked clue as well as the list of clues
  var clueIndex = props.clueIndex;
  var clueList = props.clueList;
  var setHintMap = (val) => props.setHintMap(val);
  var setClue = (val) => props.setClue(val);

  // Allows FlatMap to set the start coordinate in CreateGame
  const setStart = (val) => props.setStart(val);

  // Determines functionality of submit button
  function setWhich() {

    // Checks whether the map is displayed to set a clue or start coordinate
    if (settingClue) {

      // If setting clue marker
      if (!clueMarker) {
        // Displays alert if no clue marker has been placed when submitting
        setAlert(true);
      } else {
        setAlert(false);

        // Saves clue marker coordinates to clue list
        const list = [...clueList];
        list[clueIndex]["coord"] = clueMarker;
        setClue(list);

        // Prevents further editing on map; removes map display
        setDone(true);
        setHintMap();
      }

      // If setting start marker
    } else if (!startConfirmed) {

      // Displays alert if no start marker has been set while submitting 
      if (!startMarker) {
        setAlert(true);
      } else {
        setAlert(false);

        // Prevents further marker editing; saves and confirms start marker
        setDone(true);
        confirmStart(true);
        setStart(startMarker);
      }
    }
  }

  return (
    <div style={{textAlign: "center"}}>
      {alertPop && <p>Please drop a marker before submitting.</p>}
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: 49.253349, lng: -123.004204 }}
        onClick={(event) => {

          // Sets clue marker if setting clue; start marker if not
          if (settingClue) {
            setClueMarker({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          } else if (!done) {
            setStartMarker({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            })
          }
        }}
      >
        {startMarker && (
          <MapMarker lat={startMarker.lat} lng={startMarker.lng} />
        )}

        {clueMarker && (
          <MapMarker lat={clueMarker.lat} lng={clueMarker.lng} />
        )}

        {settingClue && clueList.map((clue) => {

          // Displays all clues set so far
          return <MapMarker lat={clue.coord.lat} lng={clue.coord.lng} />
        })}
      </GoogleMap>
      {!done && (
        <Button
          style={{ width: "140px", height: "50px", marginTop: "20px", }}
          variant="success"
          onClick={() => setWhich()}
        >
          Submit marker
        </Button>
      )}
    </div>
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
const FlatMap = (props) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_MAP_KEY}`}
        loadingElement={<div style={{ height: "100%" }}></div>}
        containerElement={<div style={{ height: "100%" }}></div>}
        mapElement={<div style={{ height: "100%" }}></div>}
        done={props.done}
        setDone={props.setDone}
        setStart={props.start}
        startCoord={props.startCoord}
        settingClue={props.settingClue}
        setClue={props.setClue}
        clueList={props.clueList}
        clueIndex={props.clueIndex}
        setHintMap={props.setHintMap}
        startConfirmed={props.startConfirmed}
        confirmStart={props.confirmStart}
        // end={props.end}
        // done={props.done}
        // setdone={props.setdone}
      />
    </div>
  );
};

export default FlatMap;
