import React, { useEffect, useState } from "react";
import "./styles/UserInfo.css";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

/**
 * Displays the current user information
 * @returns JSX elements
 */
function UserInfo() {
  //gets the user info from the server.
  const {
    getUser,
    profilepic,
    whichProfilePic,
    nickname,
    country,
    email,
    rating,
  } = useServer();

  // Redirects user to login page
  const history = useHistory();

  // State for error message for log out
  const [error, setError] = useState("");

  // Currentuser for user info, logout for logout functionality
  const { currentUser, logout } = useAuth();

  // Logout functionality
  async function handleLogout() {
    // Resets error message
    setError("");

    // Logs the user out and redirects them to the login page
    try {
      await logout();
      history.push("/login");
    } catch {
      // Displays error message if failed
      setError("Failed to Log Out");
    }
  }

  // gets the current user's email address.
  useEffect(() => {
    getUser(currentUser.email);
  }, [profilepic, nickname, country, email]);

  return (
    <div>
      {" "}
      {error && <span style={{ color: "red" }}>{error}</span>}
      <button
        id="logoutButt"
        onClick={handleLogout}
        style={{
          margin: "20px",
          backgroundColor: "#BDD5EA",
          color: "black",
        }}
      >
        Log Out
      </button>
      <div id="user-info-heading">
        <img
          id="profile-picture"
          src={whichProfilePic(profilepic)}
          width="100%"
          alt="profile display of user"
        />
        <span id="welcome">Welcome,</span>
        <span
          id="nickname"
          style={{
            fontSize:
              typeof nickname === "undefined"
                ? "1.2rem"
                : "" +
                  (25 / nickname.length > 1.5 ? 1.5 : 25 / nickname.length) +
                  "rem",
            gridColumnStart: "2",
            gridRowStart: "2",
            marginTop: "auto",
            marginBottom: "auto",
            fontWeight: "bolder",
            fontFamily: '"Permanent Marker", cursive,',
          }}
        >
          {typeof nickname === "undefined" ? "Placeholder Name" : nickname}
        </span>
        <span id="uid">
          <b>Email:</b> {email}
        </span>
        <span id="location">
          <b>Country:</b> {country}
        </span>
        <span id="rank">
          <b>Rating:</b> {rating}
        </span>
      </div>
    </div>
  );
}

export default UserInfo;
