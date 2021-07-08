import React, { useState } from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";
import profile from "../Generic-Components/assets/user.png";
import friends from "../Generic-Components/assets/friends.png";
import home from "../Generic-Components/assets/home.png";
import leader from "../Generic-Components/assets/crown.png";
import AboutUs from "../Generic-Components/assets/group.png";
import { useAuth } from "../../contexts/AuthContext";

function Navbar() {
	const { currentUser } = useAuth();
	const [clicked, setClicked] = useState([
		"navbutt",
		"navbutt",
		"navbuttclick",
		"navbutt",
		"navbutt",
	]);

	function resetColours() {
		let colours = ["navbutt", "navbutt", "navbutt", "navbutt", "navbutt"];
		setClicked(colours);
	}

	function changeColour(button) {
		resetColours();
		let colours = ["navbutt", "navbutt", "navbutt", "navbutt", "navbutt"];
		colours[button] = "navbuttclick";
		setClicked(colours);
	}

	return currentUser ? (
		<footer>
			<Link to="/profile">
				<div
					className={clicked[0]}
					id="profile-icon"
					onClick={() => changeColour(0)}
				>
					<img src={profile} />
					<p className="icon-text">Profile</p>
				</div>
			</Link>
			<Link to="/friend">
				<div
					className={clicked[1]}
					id="friends-icon"
					onClick={() => changeColour(1)}
				>
					<img src={friends} />
					<p className="icon-text">Friends</p>
				</div>
			</Link>
			<Link to="/home">
				<div
					className={clicked[2]}
					id="home-icon"
					onClick={() => changeColour(2)}
				>
					<img src={home} />
					<p className="icon-text">Home</p>
				</div>
			</Link>
			<Link to="/leaderboard">
				<div
					className={clicked[3]}
					id="leaderboard-icon"
					onClick={() => changeColour(3)}
				>
					<img src={leader} />
					<p className="icon-text">Leaderboard</p>
				</div>
			</Link>
			<Link to="/aboutus">
				<div
					className={clicked[4]}
					id="settings-icon"
					onClick={() => changeColour(4)}
				>
					<img src={AboutUs} />
					<p className="icon-text">About Us</p>
				</div>
			</Link>
		</footer>
	) : (
		<></>
	);
}

export default Navbar;
