import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "../Generic-Components/PrivateRoute";
import CreateGame from "./CreateGame";
import { BackProvider } from "../../contexts/BackendContext";
import name_logo from "../../assets/name_logo.png";
import JoinGame from "./JoinGame";
import "./styles/ChoosePlay.css";

import SlideShow from "../Generic-Components/SlideShow.js";
import CreateGame1 from "./assets/creategame1.png";
import CreateGame2 from "./assets/creategame2.png";
import CreateGame3 from "./assets/creategame3.png";
import CreateGame4 from "./assets/creategame4.png";
import CreateGame5 from "./assets/creategame5.png";
import CreateGame6 from "./assets/creategame6.png";
import CreateGame7 from "./assets/creategame7.png";
import CreateGame8 from "./assets/creategame8.png";
import CreateGame9 from "./assets/creategame9.png";
import CreateGame0 from "./assets/creategame0.png";
import PlayGame00 from "./assets/playgame0.png";
import PlayGame01 from "./assets/playgame01.png";
import PlayGame02 from "./assets/playgame02.png";
import PlayGame03 from "./assets/playgame03.png";
import PlayGame04 from "./assets/playgame04.png";
import PlayGame05 from "./assets/playgame05.png";
import PlayGame06 from "./assets/playgame06.png";
import PlayGame07 from "./assets/playgame07.png";
import PlayGame08 from "./assets/playgame08.png";
import PlayGame09 from "./assets/playgame09.png";

/**
 * Screen that provides the user the option to play a game, create a game, or look at 
 * instructions on how to use the app. Contains the components that facilitate the 
 * aforementioned functionalities.
 * 
 * @returns JSX elements
 */
const ChoosePlay = () => {

	// Create game tutorial images
	const [imageListCreate] = useState([
		CreateGame1,
		CreateGame2,
		CreateGame3,
		CreateGame4,
		CreateGame5,
		CreateGame6,
		CreateGame7,
		CreateGame8,
		CreateGame9,
		CreateGame0,
	]);

	// Play game tutorial images stored in state
	const [imageListPlay] = useState([
		PlayGame00,
		PlayGame01,
		PlayGame02,
		PlayGame03,
		PlayGame04,
		PlayGame05,
		PlayGame06,
		PlayGame07,
		PlayGame08,
		PlayGame09,
	]);

	// Create game tutorial text stored in state
	const [textListCreate] = useState([
		"Place your starting location Marker.",
		"Confirm your starting location marker.",
		"Set the boundary by dragging the circle, confirm when done.",
		"Enter your Clue and any Hints you would like to give the players.",
		"Choose the goal for the clue.",
		"Repeat for all clues (up to 5) and submit.",
		"Enter a name for the game, and set a time limit for scoring.",
		"Check the Game overview, and Submit the game.",
		"Click on your profile to view your created games.",
		"Share your Game ID with your friends to play!",
	]);

	// Play game tutorial text stored in state
	const [textListPlay] = useState([
		"Enter the Game ID and search for the game.",
		"Once the game is found, click the 'Start' button to start the game.",
		"The First Clue will Appear at the bottom.",
		"The 'Reset Position' button will take you back to the start, the 'Overlay' button will close the overlay.",
		"Click on the google streetview arrows to move around.",
		"Once you think you found the location, click Check Location.",
		"If your guess is correct, the game will let you 'You have found something', Click on Submit Location to move on to the next Clue.",
		"Once you are done with all the clues, Click 'Finish Game'.",
		"Confirm Your selection.",
		"The game will display your time taken and score, you can share your results on your social!",
	]);

	// Displays the options to play a game, create a game, or view the tutorial
	const Options = () => {
		return (
			<>
				<img
					id="chooseplay-logo"
					src={name_logo}
					style={{
						width: "90%",
						margin: "auto",
						marginTop: "10vh",
						display: "block",
						marginBottom: "10%",
					}}
				></img>
				<Link to="/home/play/join-game">
					<div className="play-button">
						<h1 className="playtext">Play Game</h1>
					</div>
				</Link>
				<br />
				<Link to="/home/creategame">
					<div className="play-button">
						<h1 className="playtext">Create Game</h1>
					</div>
				</Link>
				<br />
				<Link to="/home/play/tutorial">
					<div className="play-button">
						<h1 className="playtext">Tutorial</h1>
					</div>
				</Link>
			</>
		);
	};

	return (
		<div id="choose">
			<Router>
				<Switch>
					<PrivateRoute path="/home/play/join-game">
						<JoinGame />
					</PrivateRoute>
					<PrivateRoute path="/home/creategame">
						<BackProvider>
							<CreateGame />
						</BackProvider>
					</PrivateRoute>
					<Route path="/home/play/tutorial" exact>
						<div id="tutorial-box">
							<img src={name_logo} id="tutorial-logo" />
							<span id="tutorial-title">Tutorial</span>
							<Link to="/home/play/tutorial/create-game">
								<div class="tutorial-button">
									<span>Create Game</span>
								</div>
							</Link>

							<Link to="/home/play/tutorial/play-game">
								<div class="tutorial-button">
									<span>Play Game</span>
								</div>
							</Link>
						</div>
					</Route>
					<Route path="/home/play/tutorial/create-game">
						<div id="create-game-tutorial">
							<img src={name_logo} id="tutorial-logo" />
							<span id="tutorial-title-sub">
								Create a Game Tutorial
							</span>
							<SlideShow
								images={imageListCreate}
								texts={textListCreate}
							/>
						</div>
					</Route>
					<Route path="/home/play/tutorial/play-game">
						<div id="play-game-tutorial">
							<img src={name_logo} id="tutorial-logo" />
							<span id="tutorial-title-sub">
								Play a Game Tutorial
							</span>
							<SlideShow
								images={imageListPlay}
								texts={textListPlay}
							/>
						</div>
					</Route>
					<PrivateRoute
						component={Options}
						path="/home/play"
						exact
					></PrivateRoute>
				</Switch>
			</Router>
		</div>
	);
};

export default ChoosePlay;
