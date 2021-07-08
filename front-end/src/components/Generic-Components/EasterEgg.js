import React, { useState } from "react";
import Logo from "./assets/winner.png";

function EasterEgg() {
	const [numClick, setNumClick] = useState(0);
	const [gridRow, setGridRow] = useState(1);
	const [gridColumn, setGridColumn] = useState(1);
	const [color, setColor] = useState("rgb(255,255,255)");
	const name = [
		"Click The Button",
		"Keep Going!",
		"Almost There!",
		"SOOOOO CLOOOSE",
		"POWER THROUGH",
		"How are you still here?",
	];
	const [message, setMessage] = useState(name[0]);

	return (
		<div>
			<h1
				style={{
					color: color,
				}}
			>
				<h2>{"Your Score: " + numClick + "!!"}</h2>
				{message}
			</h1>
			<div
				style={{
					display: "grid",
					gridTemplateRows:
						"4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh 4vh",
					gridTemplateColumns:
						"9vw 9vw 9vw 9vw 9vw 9vw 9vw 9vw 9vw 9vw",
					width: "95vw",
					height: "100vh",
				}}
			>
				<button
					style={{
						display: "block",
						gridRowStart: gridRow,
						gridColumnStart: gridColumn,
						width: "" + (numClick + 10) + "px",
						height: "" + (numClick + 10) + "px",
						margin: "auto",
					}}
					onClick={() => {
						setNumClick(numClick + 1);
						setGridRow(Math.floor(Math.random() * 20 + 1));
						setGridColumn(Math.floor(Math.random() * 10 + 1));
						updateMessage();
						updateColor();
						console.log(numClick);
					}}
				>
					<img src={Logo} width={"2%"} height={"2%"} />
				</button>
			</div>
		</div>
	);

	function updateMessage() {
		let wow = "";
		for (let i = 0; i < numClick % 10; i++) {
			wow = wow + "!";
		}
		if (numClick > 10000) {
			setMessage(name[5] + wow);
		} else if (numClick > 1000) {
			setMessage(name[4] + wow);
		} else if (numClick > 100) {
			setMessage(name[3] + wow);
		} else if (numClick > 50) {
			setMessage(name[2] + wow);
		} else if (numClick > 25) {
			setMessage(name[1] + wow);
		} else {
			setMessage(name[0] + wow);
		}
	}

	function updateColor() {
		let red = Math.floor(Math.random() * 256);
		let green = Math.floor(Math.random() * 256);
		let blue = Math.floor(Math.random() * 256);
		let color = "rgb(" + red + ", " + green + ", " + blue + ")";
		setColor(color);
		console.log(color);
	}
}

export default EasterEgg;
