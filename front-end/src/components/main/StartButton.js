import React, { useState } from "react";
import "./StartButton.css";
import { Button } from "react-bootstrap";

const StartButton = () => {
  const [playClicked, setPlayClicked] = useState(false);

  return playClicked ? (
    <Button variant="danger" size="lg" id="startbutt" onClick={() => setPlayClicked(!playClicked)} block >
      <div id="starttext">
        <h3 id="buttword">No</h3>
      </div>
    </Button>
  ) : (
    <Button variant="danger" size="lg" id="startbutt" onClick={() => setPlayClicked(!playClicked)} block >
      <div id="starttext">
        <h3 id="buttword">Play</h3>
      </div>
    </Button>

    // <div id="startbutt" onClick={() => setPlayClicked(true)}>
    //   <div id="starttext">
    //     <h3 id="buttword">Play</h3>
    //   </div>
    // </div>
  );
};

export default StartButton;
