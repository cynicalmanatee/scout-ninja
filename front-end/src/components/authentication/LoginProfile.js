import "./LoginProfile.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import WelcomeMessage from "./WelcomeMessage";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <div id="login-page">
      <WelcomeMessage />
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default Profile;
