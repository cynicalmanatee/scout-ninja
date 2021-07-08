import React, { useState } from "react";
import { Button } from "react-bootstrap";
import FlatMap from "../Map/FlatMap";
import GameName from "../Home/GameName";
import Summary from "./Summary";
import MapCircle from "../Map/MapCircle";
import HintClue from "./HintClue";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Create a game page; contains the components that facilitate game creation as well as the 
 * states that store all game data. Also renders all components that accept user input for 
 * game creation.
 * 
 * @returns JSX elements
 */
const CreateGame = () => {

  // Start coordinates and its confirmatory state
  const [startCoord, setStartCoord] = useState();
  const [locationChosen, setLocationChosen] = useState(false);

  // Confirmatory state for submitting a start coordinate
  const [startConfirmed, confirmStart] = useState(false);

  // State to prevent markers from being moved after confirming
  const [done, setDone] = useState(false);

  // Bounds of the game (circle radius in meters) and its confirmation state
  const [bounds, setBounds] = useState(500);
  const [boundsDone, setBoundsDone] = useState(false);

  // Other game details and its confirmatory state
  const [gameDetails, setDetails] = useState({
    name: "untitled",
    time: "5",
    radius: 500,
  });
  const [detailDone, setDetailDone] = useState();

  // Clues and hints and their confirmatory state
  const [clues, setClues] = useState([
    { clue: "", hint: "", order_num: 1, coord: { lat: "", lng: "" } },
  ]);
  const [cluesDone, setCluesDone] = useState(false);

  // Display state if user is choosing a clue location
  const [showHintMap, setHintMap] = useState(false);

  // Confirmatory state of the game being created
  const [gameCreated, setGameCreated] = useState(false);

  // Warning message state if user does something not allowed
  const [alert, setAlert] = useState("");

  // createGame and createClues functions store all info into database
  const { createGame, createClues } = useServer();

  // Current user info to grab current user email
  const { currentUser } = useAuth();

  // Function to resets all states back to beginning 
  function reset() {
    setLocationChosen(false);
    setStartCoord();
    confirmStart(false);
    setDone(false);
    setBounds();
    setDetails({
      name: "untitled",
      time: "5",
      radius: 500,
    });
  }

  // Function for trimming whitespace taken from: https://www.w3schools.com/jsref/jsref_trim_string.asp
  function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
  }

  // Checks whether clues and locations have been filled out, and returns true if any inputs are missing or empty
  function checkEmptyClues() {
    let empty = false;
    for(let i = 0; i < clues.length; i++) {
      console.log("clue: " + clues[i].clue)
      if (clues[i].coord.lat === "" || myTrim(clues[i].clue) === "") {
        empty = true;
      }
    }
    return empty;
  }

  return (
    <div id="test1" style={{ color: "#F7F7FF", margin: "20px" }}>
      {!startCoord && (
        <h3 style={{ textAlign: "center", margin: "20px" }}>Please select and confirm your starting position.</h3>
      )}

      {startCoord && !locationChosen && (
        <div id="test2" style={{ textAlign: "center", margin: "20px" }}>
          <h3>
            Is this the starting position you want to set for your game?
          </h3>
        </div>
      )}

      {!startCoord || !locationChosen ? (
        <>
          <FlatMap
            start={(word) => setStartCoord(word)}
            done={done}
            setDone={(state) => setDone(state)}
            clue={false}
            clueList={clues}
            startConfirmed={startConfirmed}
            confirmStart={(state) => confirmStart(state)}
          />
        </>
      ) : (
        <></>
      )}

      {startCoord && !locationChosen && (
        <div id="test3" style={{ marginBottom: "20px" }}>
          <Button
            variant="success"
            onClick={() => {
              setLocationChosen(true);
            }}
            style={{ height: "50px", width: "35vw", margin: "10px", }}
          >
            Yup!
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              reset();
            }}
            style={{ height: "50px", width: "35vw", margin: "10px", }}
          >
            No!
          </Button>
        </div>
      )}

      {locationChosen && !boundsDone && (
        <div id="test4" style={{ textAlign: "center" }}>
          <h3>
            Please set the boundary for your game!
          </h3>
          <MapCircle
            func={(vals) => setBounds(vals)}
            start={startCoord}
          />
          <Button
            variant="success"
            onClick={() => setBoundsDone(true)}
            style={{ height: "50px", width: "140px", margin: "20px" }}
          >
            Submit Radius
          </Button>
        </div>
      )}

      {boundsDone && !cluesDone && (
        <>
          <HintClue
            func={(vals) => setClues(vals)}
            state={clues}
            start={startCoord}
            setHintMap={setHintMap}
            showHintMap={showHintMap}
            done={done}
            setDone={(state) => setDone(state)}
          />
          <p>{alert}</p>
          {!showHintMap && (
            <Button
              style={{
                height: "60px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "40px",
              }}
              variant="success"
              onClick={() => {
                if (checkEmptyClues()) {
                  setAlert("Please make sure you have all fields filled out for every clue!");
                } else {
                  setCluesDone(true);
                }

              }}
            >
              Submit clues
            </Button>
          )}
        </>
      )}

      {cluesDone && !detailDone && (
        <>
          <GameName gameDetails={gameDetails} func={(vals) => setDetails(vals)} />
          <Button
            style={{ height: "50px", width: "140px", margin: "5px" }}
            variant="success"
            onClick={() => setDetailDone(true)}
          >
            Submit info
          </Button>
        </>
      )}

      {done && detailDone && cluesDone && !gameCreated && (
        <>
          <Summary
            start={startCoord}
            bound={bounds}
            detail={gameDetails}
            clues={clues}
          />
          <Button
            style={{ width: "200px", height: "100px" }}
            variant="success"
            onClick={() => {
              setGameCreated(true);
              createGame(
                gameDetails.name,
                currentUser.email,
                startCoord,
                bounds,
                parseInt(gameDetails.time),
                clues
              );
            }}
          >
            Confirm
          </Button>
        </>
      )}

      {gameCreated && (
        <>
          <h3>

            Your game has been created! To share your game, please go to the
            'Created Games' section in your profile.
          </h3>

        </>
      )}
    </div>
  );
};

export default CreateGame;
