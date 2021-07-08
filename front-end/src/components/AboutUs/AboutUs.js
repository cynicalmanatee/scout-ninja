import React from "react";

import "./styles/AboutUs.css";

//These imports change the display picture of each developer
import harry from "./img/Harry Avatar.png";
import oscar from "./img/Oscar Avatar.png";
import kenneth from "./img/Kenneth Avatar.png";
import seHwan from "./img/Se Hwan Avatar.png";

function AboutUs() {
	/**
	 * For the following section,
	 * .dev-name changes the name of the developer for that entry
	 * .dev-role changes the role of the developer inrespect to the project
	 * .dev-description chages the show description of each developer
	 */
	return (
		<div id="about-us">
			<h2>About Us</h2>
			<p id="project"></p>
			<p id="app-desc">
				Welcome to ScoutNinja, the scavenger game that promotes exploration, friendly communication,
				and competition! Here at ScoutNinja, we believe that human interaction should not be hampered
				by real-life situations; that is why we have developed a game that allows you to bond with friends
				and family over user-created scavenger hunts. We hope you enjoy your time here!
			</p>
			<br />
			<h2>Developers</h2>
			<div className="developer">
				<img src={harry} />
				<span className="dev-name">Harry He</span>
				<span className="dev-role">UI/UX Lead</span>
				<p className="dev-description">
					Harry is a first year student at BCIT. Harry has a bachelors
					in Chemistry from UBC. In his leisure time, Harry enjoys
					building models and playing video games. Harry enjoys
					challenges and knowledge testing games and activities.
				</p>
			</div>
			<div className="developer">
				<img src={oscar} />
				<span className="dev-name">Oscar La</span>
				<span className="dev-role">Back End Developer</span>
				<p className="dev-description">
					Oscar is a first year student at BCIT. Oscar has a bachelors
					in Applied Animal Science from UBC. In his spare time, Oscar
					is a avid badminton player. Oscar also enjoys solving code
					relate problems. You can often find Oscar browsing the
					LeetCode website.
				</p>
			</div>
			<div className="developer">
				<img src={seHwan} />
				<span className="dev-name">Se Hwan Lee</span>
				<span className="dev-role">API Integration</span>
				<p className="dev-description">
					Se Hwan is a first year BCIT student. This is the second
					project Se Hwan has worked on for his program. In his spare
					time, Se Hwan is a big Star Wars fan, and enjoys watching
					the motion pictures and video games.
				</p>
			</div>
			<div className="developer">
				<img src={kenneth} />
				<span className="dev-name">Kenneth Ng</span>
				<span className="dev-role">Front End Developer</span>
				<p className="dev-description">
					Kenneth is a first year BCIT student. This is the second
					project Kenneth has worked on for the CST program. In his
					spare time, Kenneth is an ice cream officianado. Kenneth
					enjoys going around the city, tasting and rating all the
					different ice cream and gelato establishments.
				</p>
			</div>
		</div>
	);
}

export default AboutUs;
