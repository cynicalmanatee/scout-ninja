import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";

const WelcomeMessage = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="signin">
        <h1 id="welcome">Welcome! Please Sign In.</h1>
        <h3>Authentication supported by Auth0.</h3>
      </div>
    );
  }

  return (
    <div className="signin">
      <h1 id="welcome">Welcome, {user.nickname}!</h1>
      <img id="prof" src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      {/* {<JSONPretty data={user} />} */}
    </div>
  );
};

export default WelcomeMessage;
