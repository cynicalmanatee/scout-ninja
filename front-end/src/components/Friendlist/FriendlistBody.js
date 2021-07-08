import React from "react";
import { useState } from "react";
import HistoryTab from "../Generic-Components/HistoryTab";
import StatsTab from "../Generic-Components/StatsTab";
import Button from "../Generic-Components/Button";

/**
 * This is the body of the profile page. There are buttons that are associated with
 * changing the content to the corresponding button's choice.
 * @returns the component to be drawn
 */
function FriendlistBody() {
	//uses the state to determine whether to show the history tab or the stats tab
	const [showHistoryTab, setShowHistoryTab] = useState(true);
	return (
		<div id="body">
			<div id="profile-body-tabs">
				<Button description="History" color="wheat" onClick={histTrue} />
				<Button description="Stats" color="wheat" onClick={histFalse} />
			</div>
			{showHistoryTab ? <HistoryTab /> : <StatsTab />}
		</div>
	);
	//sets the showHistoryTab in more context
	function histTrue() {
		setShowHistoryTab(true);
	}
	//sets the showHistoryTab in more context

	function histFalse() {
		setShowHistoryTab(false);
	}
}

export default FriendlistBody;
