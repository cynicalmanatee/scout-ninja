import React, { useState, useEffect } from "react";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";

/**
 * Creates JSX elements for a single game.
 * @param {*} props 
 game: game information, reload(): rerenders the game list.
 * @returns JSX elements
 */
const GameListItem = (props) => {
	//set a game for deletion in the database
	const { deleteGame, getGameStats } = useServer();
	//reassign game information from props
	const game = props.game;
	//rerenders the list of games.
	const reload = () => props.reload();
	//sets the completion rate for a player
	const [postInfo, setPostInfo] = useState(0);

	// Not loading game data and completion properly - implement in future
	// useEffect(() => {
	// 	getGameStats(game.id)
	// 	.then((num) => {
	// 		console.log("nothing: " + num);
	// 		console.log("data: " + num.data);
	// 		console.log("complete: " + num.complete)
	// 		if (num.data == null) {
	// 			setPostInfo(69);
	// 		} else {
	// 			setPostInfo(num.complete);
	// 		}
	// 		// console.log(postInfo)
	// 	})
	// 	// console.log(postInfo);
	// }, [])

	return (
		<div
			style={{
				display: "grid",
				gridTemplate: "'name .' auto 'id deletegame' auto 'complete deletegame' auto / 70% 30%",
				width: "100%",
				height: "auto",
				color: "#495867",
				backgroundColor: "#F7F7FF",
				border: "3px solid #495867",
				textAlign: "left",
				fontSize: "18pt",
			}}
		>
			<p
				style={{
					marginBottom: "0",
					gridArea: "name",
					marginLeft: "20px",
				}}
			>
				<b>Game Name:</b> {game.game_name}
			</p>
			<p
				style={{
					marginBottom: "0",
					gridArea: "id",
					marginLeft: "20px",
				}}
			>
				<b>Game ID:</b> {game.id}
			</p>
			<p
				style={{
					marginBottom: "0",
					gridArea: "complete",
					marginLeft: "20px",
				}}
			>
				<b>Completion rate:</b> {postInfo}%
			</p>
			<Button
				style={{ gridArea: "deletegame", margin: "10px" }}
				variant="danger"
				onClick={async (e) => {
					e.preventDefault();
					await deleteGame(game.id);
					reload();
				}}
			>
				Delete Game
			</Button>
		</div>
	);
};

/**
 * compliles and displays a list of game information
 * @returns 
 */
function GameList() {
	//gets a list of games from the server
	const { getGames } = useServer();
	//get the current user information from the server
	const { currentUser } = useAuth();
	//sets the list of games into a useState
	const [posts, setPosts] = useState([]);
	//triggers a rerender when it gets updated
	const [load, setload] = useState();

	let x = 1;

	// console.log(currentUser.email);
	var grab = getGames(currentUser.email);

	//get a new list from the server and triggers the rerender
	const renderagain = () => {
		grab.then((list) => {
			setPosts(list);
		});
		setload(++x);
		setload(++x);
		// console.log("reloaded!");
	};

	//sets a new list when a reload is triggered
	useEffect(() => {
		grab.then((list) => {
			setPosts(list);
		});
		// console.log(posts);
	}, [load]);

	return posts.length !== 0 ? (<>
		{posts.map((game) => {
			return <GameListItem id={x++} game={game} reload={() => renderagain()} />;
		})}</>
	) : (
		<p>Whoops! Looks like you don't have any games created!</p>
	);
}

export default GameList;
