import React from 'react';
import './styles/FriendlistItem.css';
import { useServer } from "../../contexts/BackendContext";

const FriendlistItem = ({player}) => {
	const { whichProfilePic } = useServer();

    return (
		<div className="player-heading">
			<img className="player-profile-picture" src={whichProfilePic(player.profile_pic)} width="100%" alt="pp" />
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
					: (player.nickname)}
			</span>
			<span className="player-uid"><b>Email:</b> {player.email}</span>
			<span className="player-location"><b>Country:</b> {player.country}</span>
			<span className="player-rank"><b>Rating:</b> {player.rating}</span>
		</div>
	);
}

export default FriendlistItem
