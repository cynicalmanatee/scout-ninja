import React from "react";
import { useState } from "react";
import HistoryTab from "./HistoryTab";
import StatsTab from "./StatsTab";
import { Button } from "react-bootstrap";
import "./styles/Body.css";
// import Button from "./../Generic-Components/Button";

/**
 * This is the body of the profile page. There are buttons that are associated with
 * changing the content to the corresponding button's choice.
 * @returns the component to be drawn
 */
function Body() {
	const [showHistoryTab, setShowHistoryTab] = useState(true);
  const [selected, setSelected] = useState([{backgroundColor: "#FE5F55",
    color: "#FFFFFF",
    width: "47vw",
    fontSize: "20pt" } , {backgroundColor: "#F7F7FF",
    color: "#495867",
    width: "43vw",
    fontSize: "20pt" }]);

	return (
		<div id="body">
			<div id="profile-body-tabs" style={{ marginBottom: "20px" }}>
				{/* <Button description="History" color="wheat" onClick={histTrue} /> */}
        <Button
            style={selected[0]}
            // style={{ backgroundColor: "#F7F7FF", color: "#495867", width: "45vw", fontSize: "20pt"}}
            onClick={histTrue}
          >
          <b>Game List</b>
          </Button>
          <Button
            style={selected[1]}
            // style={{ backgroundColor: "#F7F7FF", color: "#495867", width: "45vw", fontSize: "20pt"}}
            onClick={histFalse}
          >
          <b>History</b>
          </Button>
				{/* <Button description="Game List" color="wheat" onClick={histFalse} /> */}
			</div>
			{!showHistoryTab ? <HistoryTab /> : <StatsTab />}
		</div>
	);
  
  //change the styling of the history and stats buttons
	function histTrue() {
    setSelected([{backgroundColor: "#FE5F55",
    color: "#FFFFFF",
    width: "47vw",
    fontSize: "20pt" } , {backgroundColor: "#F7F7FF",
    color: "#495867",
    width: "43vw",
    fontSize: "20pt" }]);
		setShowHistoryTab(true);
	}
  //change the styling of the history and stats buttons
	function histFalse() {
    setSelected([{backgroundColor: "#F7F7FF",
    color: "#495867",
    width: "43vw",
    fontSize: "20pt" }, {backgroundColor: "#FE5F55",
    color: "#FFFFFF",
    width: "47vw",
    fontSize: "20pt" }]);
		setShowHistoryTab(false);
	}
}

export default Body;
