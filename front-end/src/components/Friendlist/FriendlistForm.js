import React from "react";

/**
 * This creates a simple form that can add a friend by their UID.
 * @returns The component to be drawn
 */
function FriendlistForm({setEmail}) {
	return (
		<div id="add-friend-form">
			<form>
				<label htmlFor="id">Friend ID</label>
				<input id="id" type="text" onChange={(e)=>setEmail(e.target.value)} />
				<span>{}</span>
			</form>
		</div>
	);
}

export default FriendlistForm;
