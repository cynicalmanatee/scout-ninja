// Some code excerpts taken from https://github.com/cluemediator/dynamic-input-fields-reactjs/blob/master/src/App.js

import React, { useState } from "react";
import FlatMap from "../Map/FlatMap";
import { Button } from "react-bootstrap";

/**
 * Page to set the hints, clues, and coordinates for a created game.
 * 
 * Users can choose to add more clues, remove clues, set coordinates to each clue, and 
 * edit previous clues. Checks for empty inputs are done in the CreateGame parent component.
 * 
 * @params clue and map states from CreateGame
 * @returns JSX elements
 */
const HintClue = (props) => {

  // The list of clues we are editing
  var clue = props.state;

  // Function to edit the list of clues in the parent element
  const setClue = (val) => props.func(val);

  // Start coordinate to render in as a guidepoint
  const startCoord = props.start;

  // Whether to render the map or not (so that it doesn't render while selecting points)
  const showHintMap = props.showHintMap;

  // Function that allows for the display and/or removal of the map
  const setHintMap = (val) => props.setHintMap(val);

  // Determines which clue the user is choosing a clue location
  const [clueIndex, setClueIndex] = useState(0);

  // Handles any input change from the user (for hint or clue descriptions)
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...clue];
    list[index][name] = value;
    setClue(list);
  };

  // Removing the last clue from the list
  const handleRemoveClick = (index) => {
    const list = [...clue];
    list.splice(index, 1);
    setClue(list);
  };

  // Adds a new clue to the clue list and displays on the page
  const handleAddClick = (index) => {
    setClue([
      ...clue,
      { clue: "", hint: "", order_num: index + 1, coord: { lat: "", lng: "" } },
    ]);
  };

  // Allow input on the map and re-display the map onto the screen; sets clue index to the clicked one
  const choosePoint = (index) => {
    props.setDone(false);
    setHintMap(true);
    setClueIndex(index);
  };

  return (
    <div className="App">
      <h1>Set Clues and Hints</h1>
      {showHintMap ? (
        <>
          <p>Please select a point for your clue.</p>
          <FlatMap
            settingClue={true}
            clue={true}
            startCoord={startCoord}
            done={props.done}
            setDone={(state) => props.setDone(state)}
            setClue={setClue}
            clueList={clue}
            clueIndex={clueIndex}
            start={() => console.log("start")}
            setHintMap={(val) => setHintMap(val)}
          />
        </>
      ) : (
        <>
          <p>
            Clues are vague descriptions to guide the player and hints are more
            direct clarifications of the clue they're under!
          </p>
          {clue.map((x, i) => {
            return (
              <div style={{ marginTop: "20px" }} key={i} className="box">
                <h3>Clue #{i + 1}:</h3>
                <input
                  name="clue"
                  placeholder="Enter Clue Description"
                  value={x.clue}
                  maxLength="50"
                  onChange={(e) => handleInputChange(e, i)}
                />

                <br />
                <input
                  className="ml10"
                  name="hint"
                  placeholder="Enter Hint Description"
                  value={x.hint}
                  maxLength="100"
                  onChange={(e) => handleInputChange(e, i)}
                  style={{ height: "auto", width: "100%" }}
                />
                <br />
                <Button
                  style={{ marginTop: "5px", backgroundColor: "#577399", }}
                  onClick={() => choosePoint(i)}
                >
                  Select clue location
                </Button>
                {i !== 0 && i == clue.length - 1 && (
                  <>
                    <Button
                      style={{ marginTop: "5px", backgroundColor: "#FE5F55", }}
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </Button>
                  </>
                )}
              </div>
            );
          })}
          <div className="btn-box" style={{ marginTop: "5px", width: "100%" }}>
            {clue.length - 1 <= 3 && (
              <Button style={{ backgroundColor: "#F7F7FF", color: "#495867", width: "100%" }} onClick={() => handleAddClick(clue.length)}>
                Add another hint/clue
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HintClue;
