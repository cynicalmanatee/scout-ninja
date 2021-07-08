import React, { useEffect } from "react";
import "./styles/TopPlayer.css";
import profilePicture from "../Profile/assets/Kenneth Head.png";

/**
 * formats a JSX element for a player in a certain position
 * @param {*} param0 player: player data, index: placement in the top 10;
 * @returns JSX elements
 */
const TopPlayer = ({ player, index }) => {

	return (
		<div className="player-heading">
			<img className="player-profile-picture" src={profilePicture} width="100%" />
			<span
				className="player-nickname"
				style={{
					fontSize:
						typeof player.nickname === "undefined"
							? "1.2rem"
							: "" +
							  (25 / player.nickname.length > 1.4
									? 1.3
									: 25 / player.nickname.length) +
							  "rem",
					marginTop: "auto",
					marginBottom: "auto",
					fontWeight: "bolder",
					fontFamily: '"Permanent Marker", cursive,',
				}}
			>
				{typeof player.nickname === "undefined"
					? "Placeholder Name"
					: ("#" + index + ": " + player.nickname)}
			</span>
			<span className="player-uid"><b>Email:</b> {player.email}</span>
			<span className="player-location"><b>Country:</b> {player.country}</span>
			<span className="player-rank"><b>Rating:</b> {player.rating}</span>
		</div>
	);
}

export default TopPlayer;
