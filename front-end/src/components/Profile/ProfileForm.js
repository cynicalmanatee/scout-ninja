import React, { useEffect, useState } from "react";
import "./styles/UserInfo.css";
import profilePicture from "./assets/Harry Head.png";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";
import "./styles/ProfileForm.css";

/**
 * Displays the current user information
 * @returns JSX elements
 */
function ProfileForm(props) {
  //gets the user info from the server.
  const {
    getUser,
    email,
    rating,
    profilepic,
    whichProfilePic,
    profilePicList,
  } = useServer();
  //authenticates the current user.
  const { currentUser } = useAuth();
  const [togglePPSelect, setTogglePPSelect] = useState(false);
  const [currentPP, setCurrentPP] = useState(profilepic);

  const pictureIndex = () => {
    let counter = 0;
    return profilePicList().map((picture) => {
      return (
        <img
          onClick={() => {
            props.setp(picture.index);
            setCurrentPP(picture.index);
            setTogglePPSelect(false);
          }}
          className="form-picture-index"
          src={picture.picture}
          style={{width: "80%", borderRadius: "50%", margin: "10%", border: "2px solid black"}}
          alt="temporary"
        />
      );
    });
  };

  return (
    <div id="form-user-info-heading">
      <div
        id="form-picture-select"
        style={togglePPSelect ? { display: "grid" } : { display: "none" }}
      >
          <h3 style={{margin: "10%", fontSize: "1.5rem", fontWeight: "bolder"}}>Pick your desired profile picture.</h3>
        {pictureIndex()}
      </div>
      <img
        id="form-profile-picture"
        src={whichProfilePic(currentPP)}
        width="100%"
        alt="temporary"
        onClick={() => {
          setTogglePPSelect(true);
        }}
      />
      <span id="form-welcome">New Nickname:</span>
      <input
        type="text"
        id="form-nickname-form"
        placeholder={props.name}
        onChange={(event) => props.setn(event.target.value)}
        maxLength="15"
      />
      <span id="form-uid">
        <b>Email:</b> {email}
      </span>
      <div id="form-location-box">
        <span id="form-location">
          <b>Country:</b>{" "}
        </span>
        <input
          type="text"
          id="form-location-input"
          placeholder={props.count}
          onChange={(event) => props.setc(event.target.value)}
          maxLength="20"
        />
      </div>
      <span id="form-rank">
        <b>Rating:</b> {rating}
      </span>
    </div>
  );
}

export default ProfileForm;
