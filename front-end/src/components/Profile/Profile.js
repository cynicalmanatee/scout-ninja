import React from "react";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Body from "./Body";
import { Button } from "react-bootstrap";
import ProfileForm from "./ProfileForm";
import "./styles/Profile.css";
import { useAuth } from "../../contexts/AuthContext";
import { useServer } from "../../contexts/BackendContext";

/**
 * The profile section of the webapp
 * @returns 
 */
const Profile = () => {
  //toggles the visibility of the profile information edit form.
  const [showForm, setShowForm] = useState(false);

  //gets the current user info from the server
  const { currentUser } = useAuth();
  //gets user information from the server
  const { nickname, country, updateDBUser, whichProfilePic } = useServer();
  //new name the user wants to change to
  const [newName, setNewName] = useState();
  //new location the user wants to change to.
  const [newCountry, setNewCountry] = useState();
  const [pictureIndex, setPictureIndex] = useState(whichProfilePic);

  useEffect(() => {

  }, [showForm])

  return (
    <div id="profile-page">

      {showForm ? (
        <>
          <ProfileForm
            name={nickname}
            count={country}
            setn={setNewName}
            setc={setNewCountry}
            setp = {setPictureIndex}
            pp = {pictureIndex}

          />
          <Button
            id="submit"
            style={{ backgroundColor: "#577399", color: "#F7F7FF"}}
            
            onClick={submitClick}
          >
            <b>Save Info</b>
          </Button>
        </>
      ) : (
        <>
          <UserInfo mail={currentUser.email} />
          <Button
            id="edit-save"
            style={{ backgroundColor: "#BDD5EA" , color: "#495867"}}
            onClick={() => setShowForm(!showForm)}
          >
            <b>Edit Info</b>
          </Button>
        </>
      )}

      <hr />
      <Body />
    </div>
  );

  //posts the information to the server for user information changes.
  function submitClick() {
    updateDBUser(currentUser.email, newName, newCountry, pictureIndex);
    setShowForm(!showForm);
  }
};

export default Profile;
