import React, { useState } from "react";
import Title from "../Generic-Components/Title";
import Button from "../Generic-Components/Button";
import {Link} from "react-router-dom";

/**
 * Component that allows the input of game name and time limit for a created game.
 * 
 * @params game detail state from CreateGame
 * @returns JSX elements
 */
function GameName(props) {

  // Function derived from CreateGame to store game name and time limit, and the state that stores it
  const setValues = (val) => props.func(val);
  const state = props.gameDetails;

  // Function derived from CreateGame to confirm that user info has been submitted
  const setDone = () => props.submit(true);

  return (
    <div className="game-name">
      <Title title="createLevel" description="CREATE A LEVEL" />
      <form>
        <div className='prompt'>
          <label>GAME NAME (optional)<br></br>
          <input type='text' name="name" value={state.name} onChange={(e) => setValues({...state, name: e.target.value})} maxLength="20"/>
          </label>
        </div>
        <div className='prompt'>
          <label>Set a time limit<br></br>
          <input type='number' name="time" placeholder="time limit in minutes" value={state.time} onChange={(e) => setValues({...state, time: e.target.value})} min="1" max="60" />
          </label>
        </div>
      </form>
    </div>
  )
}

export default GameName;
