import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import asyncLoading from "react-async-loader";
import GoogleStreetview from "./GoogleStreetview";
import CountdownTimer from "./CountdownTimer";
import "./View.css";
import facebookicon from "../Generic-Components/assets/facebook.png";
import twittericon from "../Generic-Components/assets/twitter.png";
import { useServer } from "../../contexts/BackendContext";
import {
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  LineShareButton,
  EmailShareButton,
  RedditShareButton,
  TumblrShareButton,
  WhatsappShareButton,
} from "react-share";

// eslint-disable-next-line react/prop-types
function SplitView({ googleMaps, gameInfo, playerID }) {
  const gameDetails = gameInfo.game;
  var clueshints = [];

  for (let i = 0; i < gameInfo.clues.length; i++) {
    clueshints.push({
      num: "Clue " + gameInfo.clues[i].order_num,
      clue: gameInfo.clues[i].clue,
      hint: gameInfo.clues[i].hint,
      targetLat: parseFloat(gameInfo.clues[i].coord_lat),
      targetLong: parseFloat(gameInfo.clues[i].coord_long),
    });
  }

  const game = {
    name: gameDetails.game_name,
    author: gameDetails.player_id,
    gameID: gameDetails.id,
    timeLimit: gameDetails.time_limit /* in minutes */,
    startingLocation: {
      lat: parseFloat(gameDetails.start_coord_lat),
      long: parseFloat(gameDetails.start_coord_long),
    },
    // clues: clueshints,
  };

  const website = "https://scoutninja.herokuapp.com/home";
  const { submitScore, rating } = useServer();

  const [currentGameID] = useState(gameInfo.gameID);
  const [coord, setCoord] = useState(game.startingLocation);
  const [goal, setGoal] = useState({
    lat: clueshints[0].targetLat,
    long: clueshints[0].targetLong,
  });
  const [showClue, setShowClue] = useState(0);
  const [distance, setDistance] = useState();
  const [showHint, setShowHint] = useState(clueshints[0].hint);
  const [displayHint, setDisplayHint] = useState(false);
  const [result, setResult] = useState(initializeResults);
  const [startTime] = useState(Date.now());
  const [progress, setProgress] = useState("0%");
  const [totalTime, setTotalTime] = useState(game.timeLimit * 60);
  const [score, setScore] = useState(0);
  const [overlay, setOverlay] = useState(true);
  const [complete, setComplete] = useState(initializeComplete);
  const [confirm, setConfirm] = useState(false);

  //Dynamically updates the progress par when the dom is rerendered.
  React.useEffect(() => {
    setProgress(updateProgress);
  });

  function finalScore() {
    let counter = 0;
    for (let i = 0; i < complete.length; i++) {
      if (complete[i]) {
        counter++;
      }
    }
    let completionRate = counter / complete.length;
    let timeFactor = game.timeLimit * 60000;
    timeFactor = timeFactor - timeTaken();
    timeFactor = timeFactor / (game.timeLimit * 60000);
    timeFactor = timeFactor + 1;

    let score = Math.floor(10000 * timeFactor * completionRate);

    return score;
  }

  function initializeComplete() {
    let temp = [];
    for (let i = 0; i < clueshints.length; i++) {
      temp.push(false);
    }

    return temp;
  }

  function changeComplete() {
    let temp = complete;

    temp[showClue] = true;

    return temp;
  }
  //initilizes the result array with the number of clues and the time stamp taken
  function initializeResults() {
    let currentResults = [];
    let temp;
    for (let i = 0; i < clueshints.length; i++) {
      temp = { clue: clueshints[i].order_num, time: -1 };
      currentResults.push(temp);
    }
    return currentResults;
  }

  //Updates the result Array with the current clue and the time taken in milliseconds
  function updateResults(clue, _time) {
    let currentResults = [];
    currentResults = result;
    result[clue].time = _time;
    return currentResults;
  }

  //calculate the time taken for this game.
  function timeTaken() {
    let t = -1;
    for (let i = 0; i < result.length; i++) {
      if (result[i].time > t) {
        t = result[i].time;
      }
    }

    return t;
  }

  //converts the time taken into a String format
  function timeText() {
    let t = timeTaken();
    t = Math.floor(t / 1000);
    if (t == -1) {
      return "did not complete";
    } else {
      let tString = "";
      tString = (t % 60) + " seconds" + tString;
      t = Math.floor(t / 60);
      tString = (t % 60) + " minutes " + tString;
      return tString;
    }
  }

  //generates the end token that is being sent to the back end server.

  //function that calculates the current progress of the game in %
  function updateProgress() {
    let completed = 0;
    for (let i = 0; i < result.length; i++) {
      if (result[i].time != -1) {
        completed++;
      }
    }

    let percent = Math.floor((completed * 100) / result.length);
    let temp = "" + percent + "%";
    return temp;
  }

  //Dynamically generate a dropdown menu of the different clues for the game. (deprecated)
  function clueDropdown() {
    let clueList = [];
    let temp;
    let counter = 0;
    for (let i = 0; i < clueshints.length; i++) {
      temp = (
        <option key={counter + ".0"} value={counter}>
          {game.clues[i].num}
        </option>
      );
      counter++;
      clueList.push(temp);
    }

    return clueList;
  }

  function hintDropdown() {
    let dropdown = [];
    dropdown.push(
      <option key={"hintdrop1"} value={0}>
        {""}
      </option>
    );
    dropdown.push(
      <option key={"hintdrop2"} value={1}>
        {"Hint 1"}
      </option>
    );

    return dropdown;
  }

  function hintList() {
    let _hintList = [];
    _hintList.push("");
    _hintList.push(clueshints[showClue].hint);
    return _hintList;
  }

  //calculates the distance between the current location and the goal location
  function dist() {
    let temp = Math.floor(
      findDistance(coord.lat, goal.lat, coord.long, goal.long)
    );

    return temp;
  }

  function parseBool(string) {
    switch (string.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case null:
        return false;
      default:
        return Boolean(string);
    }
  }

  //components

  const finishGame = (
    <div>
      <button
        id="view-finishGame"
        onClick={() => {
          setConfirm(parseBool("true"));
          setScore(finalScore());
          setTotalTime(timeText());
        }}
      >
        Finish Game
      </button>
    </div>
  );

  const confirmGame = (
    <div>
      <Link to="/home/play/game/end-game-screen">
        <button
          className="view-confirm-buttons"
          onClick={() => {
            submitScore(playerID, game.gameID, score, rating);
          }}
        >
          Confirm
        </button>
      </Link>
      <button
        className="view-confirm-buttons"
        onClick={() => setConfirm(parseBool("false"))}
      >
        Return to game
      </button>
    </div>
  );

  return (
    <Router>
      <Switch>
        <Route path="/home/play/game" exact>
          <div id="view-main-box">
            <div id="view-map-box">
              <GoogleStreetview
                googleMaps={googleMaps}
                changeCoord={(coord) => setCoord(coord)}
                startingLat={game.startingLocation.lat}
                startingLon={game.startingLocation.long}
                toggleOverlay={() => setOverlay(!overlay)}
              />
            </div>
            <div id="view-map-info" style={{ display: overlay ? "" : "none" }}>
              <button
                onClick={() => {
                  setDistance(dist);
                }}
                id="check-location"
              >
                Check Location
              </button>
              <button
                id="submit-answer"
                onClick={() => {
                  if (dist() <= 25) {
                    setResult(updateResults(showClue, Date.now() - startTime));
                    setComplete(changeComplete);
                    if (showClue >= clueshints.length - 1) {
                      setShowClue(clueshints.length - 1);
                      setShowHint(clueshints[clueshints.length - 1].hint);
                    } else {
                      setShowClue(showClue + 1);
                      setShowHint(clueshints[showClue + 1].hint);
                    }
                  }
                }}
              >
                Submit Answer
              </button>

              <form id="play-game-hint-form">
                <label htmlFor="hint-num">{"See Hint?  "}</label>
                <select
                  name="hint-num"
                  onChange={(e) => {
                    setDisplayHint(parseBool(e.target.value));
                  }}
                >
                  <option value={false}></option>
                  <option value={true}>Hint 1</option>
                </select>
                <span id="play-game-current-hint">
                  {"Hint: " + (displayHint ? showHint : "")} asdasdasdasdasd
                </span>
              </form>
              <div id="view-timer">
                <CountdownTimer setTimer={game.timeLimit * 60} />
              </div>
              <div id="view-status">
                <h1>
                  Status:{" "}
                  {distance < 20 ? "You Found Something!" : "Nothing Here"}
                </h1>
                <h1>Progress:{progress}</h1>
              </div>
              <div id="view-finish-game">
                {confirm ? confirmGame : finishGame}
              </div>
            </div>
            <span id="play-game-current-clue">
              {"Clue: " + clueshints[showClue].clue}
            </span>
          </div>
        </Route>
        <Route path="/home/play/game/end-game-screen">
          <div id="play-game-complete">
            <span id="play-game-complete-title">Game Submitted</span>
            <span id="play-game-complete-id">Game ID: {game.gameID}</span>
            <span id="play-game-complete-time">
              Total Time Taken: {totalTime}
            </span>
            <span id="play-game-complete-score">Final Score: {score}</span>
            <form id="play-game-complete-share">
              <legend>Share to Social Media!</legend>
              {/* <button id="play-game-complete-facebook">
								<img
									className="social-icon"
									src={facebookicon}
								/>
								Facebook
							</button> */}
              <FacebookShareButton
                url={website}
                quote={"My Highscore! " + score}
              >
                <FacebookIcon />
              </FacebookShareButton>

              <RedditShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
              >
                <RedditIcon />
              </RedditShareButton>

              <WhatsappShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
              >
                <WhatsappIcon />
              </WhatsappShareButton>

              <TumblrShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
              >
                <TumblrIcon />
              </TumblrShareButton>

              <LineShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
              >
                <LineIcon />
              </LineShareButton>

              <TwitterShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
                tags={["boomer", "zoomer", "game"]}
              >
                <TwitterIcon />
              </TwitterShareButton>
              <LinkedinShareButton
                url={website}
                title={"My Highscore on SCOUTNINJA! " + score}
              >
                <LinkedinIcon />
              </LinkedinShareButton>
              <EmailShareButton
                url={website}
                subject={"My Highscore on SCOUTNINJA! " + score}
              >
                <EmailIcon />
              </EmailShareButton>
            </form>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

// Code from: https://www.movable-type.co.uk/scripts/latlong.html
//calculaters the distance between two sets of coordinates
function findDistance(lat1, lat2, lon1, lon2) {
  let distance = 0;
  // Earth's radius
  const R = 6371e3;
  const lat1_rad = (lat1 * Math.PI) / 180;
  const lat2_rad = (lat2 * Math.PI) / 180;
  const latDiff_rad = ((lat2 - lat1) * Math.PI) / 180;
  const lonDiff_rad = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(latDiff_rad / 2) * Math.sin(latDiff_rad / 2) +
    Math.cos(lat1_rad) *
      Math.cos(lat2_rad) *
      Math.sin(lonDiff_rad / 2) *
      Math.sin(lonDiff_rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in meters
  distance = R * c;

  return distance;
}
// End of code from: https://www.movable-type.co.uk/scripts/latlong.html

const mapScriptsToProps = ({ apiKey }) => ({
  googleMaps: {
    globalPath: "google.maps",
    url: `https://maps.googleapis.com/maps/api/js?key=${"AIzaSyCQpoAKuSc17eoy2rSpYY_sICaUxUk2tMU"}`,
    jsonp: true,
  },
});

export default asyncLoading(mapScriptsToProps)(SplitView);
