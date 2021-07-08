import React, { useState } from "react";

/**
 * Proof concept for a distance calculator between two locations on a sphere.
 * @returns a calculator that calculates using longitude and latitude
 */
function DistanceCalculator() {
	// set of states for saving the latitudes and longitudes of two coordinates.
	const [lat1, setLat1] = useState();
	const [lat2, setLat2] = useState();
	const [lon1, setLong1] = useState();
	const [lon2, setLong2] = useState();
	const [answer, setAnswer] = useState("Waiting for Answer");
	return (
		<div>
			<input
				type="text"
				placeholder="Lat1"
				onChange={(event) => setLat1(event.target.value)}
			/>
			<input
				type="text"
				placeholder="Lat2"
				onChange={(event) => setLat2(event.target.value)}
			/>
			<input
				type="text"
				placeholder="Long1"
				onChange={(event) => setLong1(event.target.value)}
			/>
			<input
				type="text"
				placeholder="Long2"
				onChange={(event) => setLong2(event.target.value)}
			/>
			<button
				onClick={() => {
					calc();
				}}
			>
				Calculate
			</button>
			<p id="answer">{answer}</p>
		</div>
	);
	
	//Function for calculating distance.
	function calc() {
		console.log(lat1 + " " + lat2 + " " + lon1 + " " + lon2);
		const R = 6371e3; // metres

		const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
		console.log(φ1);
		const φ2 = (lat2 * Math.PI) / 180;
		console.log(φ2);
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lon2 - lon1) * Math.PI) / 180;

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		const d = R * c; // in metres
		console.log(d);
		setAnswer(d);
	}
}

export default DistanceCalculator;
