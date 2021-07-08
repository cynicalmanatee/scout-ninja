import React, { useState } from "react";

/**
 * Proof of concept scoring function based on distance to goal and time using a Logistics formula. Did not end up implementing
 * @returns JSX elements as a scoring calculator.
 */
function Scoring() {
	const [distance1, setDistance1] = useState();
	const [distance2, setDistance2] = useState();
	const [distance3, setDistance3] = useState();
	const [distance4, setDistance4] = useState();
	const [distance5, setDistance5] = useState();
	const [time, setTime] = useState();
	const [timeLimit, setTimeLimit] = useState();
	const [finalScore, setFinalScore] = useState("waiting on input");
	return (
		<div>
			<input
				type="text"
				placeholder="distance to target in metres"
				onChange={(e) => setDistance1(e.target.value)}
			/>
			<input
				type="text"
				placeholder="distance to target in metres"
				onChange={(e) => setDistance2(e.target.value)}
			/>
			<input
				type="text"
				placeholder="distance to target in metres"
				onChange={(e) => setDistance3(e.target.value)}
			/>
			<input
				type="text"
				placeholder="distance to target in metres"
				onChange={(e) => setDistance4(e.target.value)}
			/>
			<input
				type="text"
				placeholder="distance to target in metres"
				onChange={(e) => setDistance5(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Time Taken in seconds"
				onChange={(e) => setTime(e.target.value)}
			/>
			<input
				type="text"
				placeholder="time limit in seconds"
				onChange={(e) => setTimeLimit(e.target.value)}
			/>
			<button onClick={() => setFinalScore(calculateDistance())}>
				Calculate Score
			</button>
			<span>{finalScore}</span>
		</div>
	);

	function calculateDistance() {
		var score = [
			parseInt(distance1),
			parseInt(distance2),
			parseInt(distance3),
			parseInt(distance4),
			parseInt(distance5),
		];
		var total = 0;
		for (let i = 0; i < score.length; i++) {
			total =
				total + Math.floor(logisticFormula(score[i], 0.05, 150, 5000));
		}
		console.log(total);

		let midpoint = (3.0 / 4.0) * parseInt(timeLimit);
		let rate = 5.0 / midpoint;
		var timeScore =
			1.0 + logisticFormula(parseInt(time), rate, midpoint, 1);
		console.log(timeScore);

		return Math.floor(timeScore * total);
	}

	function logisticFormula(e, rate, midpoint, maxScore) {
		let score = 0;

		score =
			maxScore - maxScore / (1 + Math.exp(-1 * rate * (e - midpoint)));

		return score;
	}
}

export default Scoring;
