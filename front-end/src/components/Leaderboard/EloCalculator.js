import React, { useState } from "react";

/**
 * Proof of concept for a Elo Calculator
 * @returns JSX elements for a Elo calculator
 */
function EloCalculator() {

	//the initial rating and the result of the game.
	const [elo1, setElo1] = useState("Waiting for results");
	const [elo2, setElo2] = useState("Waiting for results");
	const [elo3, setElo3] = useState("Waiting for results");
	const [result1, setResult1] = useState();
	const [result2, setResult2] = useState();
	const [result3, setResult3] = useState();
	return (
		<div>
			<input
				type="text"
				placeholder="Elo of Player 1"
				onChange={(e) => setElo1(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Elo of Player 2"
				onChange={(e) => setElo2(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Elo of Player 3"
				onChange={(e) => setElo3(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Result of Player 1"
				onChange={(e) => setResult1(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Result of Player 2"
				onChange={(e) => setResult2(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Result of Player 3"
				onChange={(e) => setResult3(e.target.value)}
			/>
			<br></br>
			<button onClick={() => calcElo()}>Calculate Result</button>
			<hr />
			<span>{elo1}</span>
			<br />
			<span>{elo2}</span>
			<br />
			<span>{elo3}</span>
		</div>
	);
	//calculates the elo change based on current rank and expected outcome
	function calcElo() {
		//pass in player's current rating
		var players = [elo1, elo2, elo3];

		var properSum = 0;
		for (let i = 0; i < players.length; i++) {
			properSum = properSum + parseInt(players[i]);
		}
		console.log(players);
		var sum = 0;
		var avg = 0;
		var expected = [0, 0, 0];
		for (let i = 0; i < players.length; i++) {
			for (let j = 0; j < players.length; j++) {
				if (i != j) {
					sum = sum + parseInt(players[j]);
				}
			}
			avg = sum / (players.length - 1);
			// console.log("Average" + i + ": " + avg);
			expected[i] =
				1.0 / (1.0 + Math.pow(10.0, (avg - players[i]) / 400.0));
			avg = 0;
			sum = 0;
		}

		//pass in player's score for the game

		var score = [
			{ player: 1, score: result1 },
			{ player: 2, score: result2 },
			{ player: 3, score: result3 },
		];
		var sorted = score.sort(function (a, b) {
			return b.score - a.score;
		});


		var inc = 1 / (players.length - 1);
		var start = 1;
		for (let i = 0; i < sorted.length; i++) {
			sorted[i].score = start;
			start = start - inc;
		}


		score = sorted.sort(function (a, b) {
			return a.player - b.player;
		});

		var newSum = 0;
		var newElo = [0, 0, 0];
		for (let i = 0; i < players.length; i++) {
			newElo[i] = Math.floor(
				parseInt(players[i]) + 32 * (score[i].score - expected[i])
			);

			newSum = newSum + newElo[i];
		}

		var adjustedSum = properSum - newSum;
		if (adjustedSum > 0) {
			newElo[newElo.length - 1] = newElo[newElo.length - 1] + adjustedSum;
		} else {
			newElo[0] = newElo[0] + adjustedSum;
		}

		setElo1(newElo[0]);
		setElo2(newElo[1]);
		setElo3(newElo[2]);
	}
}

export default EloCalculator;
