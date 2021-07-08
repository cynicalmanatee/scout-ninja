import React, { useState } from "react";
import "./styles/JoinGame.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from "../Generic-Components/Button";
import View from "../Play_Game/View";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Screen that facilitates the user joining a game from the database. Contains checks 
 * that verify the game exists, and displays found game information.
 * 
 * @returns JSX elements
 */
function JoinGame() {

  // User-input game id state
  const [gameID, setGameID] = useState("No ID Entered");

  // Function to grab game information from the database
  const { getGameInfo } = useServer();

  // Current user information
  const { currentUser } = useAuth();

  // Warning message state
  const [warning, setWarning] = useState("");

  // Game info to display on the screen as well as render the game
  const [gameInfo, setGameInfo] = useState("");

  // Function that grabs the game, and checks if it is valid before saving the information
  async function grabGame() {

    // Grabs game info from database using input game id
    await getGameInfo(gameID).then((res) => {

      // Reset warning message and clear previous game info        
      setGameInfo("");
      setWarning("");

      if (res.data === "") {

        // Display warning message if game not found  
        setWarning("Sorry, we couldn't find a game with that ID.");
      } else {

        // Sets game info if found
        setGameInfo(res.data);
      }
    });
  }

  return (
    <div>
      <Router>
        <Route path="/home/play/join-game" exact>
          <div id="join-game-title">
            <span>Join Game!</span>
          </div>
          <form id="join-game-search">
            <label htmlFor="game-name">Game ID:</label>
            <input
              id="join-game-name"
              type="text"
              onChange={(e) => {
                if (e.target.value === "") {
                  setGameID("No ID Selected");
                } else {
                  setGameID(e.target.value);
                  setWarning("");
                }
              }}
            />
            <button
              id="join-game-search"
              className="join-game-button"
              onClick={(e) => {
                e.preventDefault();
                grabGame();
              }}
            >
              Search
            </button>
          </form>
          <span>{warning}</span>
          <div id="join-game-information">
            <span id="join-game-id" className="join-game-left-cat">
              Game ID:
            </span>
            <span className="join-game-right-cat">{gameID}</span>
            <span id="join-game-name" className="join-game-left-cat">
              Game Name:
            </span>
            <span className="join-game-right-cat">{gameInfo !== "" && gameInfo.game.game_name}</span>
            <span id="join-game-author" className="join-game-left-cat">
              Game Author:
            </span>
            <span className="join-game-right-cat">{gameInfo !== "" && gameInfo.game.player_id}</span>
            <span id="join-game-time-limit" className="join-game-left-cat">
              Time Limit:
            </span>
            <span className="join-game-right-cat">{gameInfo !== "" && gameInfo.game.time_limit}</span>
            {/* <div>
              <span>List of Players:</span>
            </div> */}
          </div>

          {gameInfo !== "" && (
            <Link to="/home/play/game/">
              <button id="join-game-start" className="join-game-button">
                Start!
              </button>
            </Link>
          )}
        </Route>
        <Route path="/home/play/game" exact={true}>
          <div>
            <View gameInfo={gameInfo} playerID={currentUser.email}/>
          </div>
        </Route>
      </Router>
    </div>
  );
}

export default JoinGame;