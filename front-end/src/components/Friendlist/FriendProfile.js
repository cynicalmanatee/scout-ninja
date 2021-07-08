import React from "react";
import UserInfo from "../Generic-Components/UserInfo";
import Body from "./FriendlistBody";
import "./styles/FriendlistProfile.css";

/**
 * This is a copy of the profile component that is designed to be used for a friend's profile when it is clicked 
 * in the friends list. This also removes the edit button functionality.
 * 
 * Because of time constraints, this component was never implemented
 */
const FriendProfile = ({ name, match }) => {
	return (
		<div id="profile-page">
			{match.params.friendId}
			<UserInfo name = {name}/>
			<hr />
			<Body />
		</div>
	);
};

export default FriendProfile;
