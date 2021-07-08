import React, { useState } from "react";
import UserInfo from "../Profile/UserInfo";
import "./styles/Home.css";
import ChoosePlay from "../Home/ChoosePlay";
import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../Generic-Components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import EasterEgg from "../Generic-Components/EasterEgg";

import { TwitterTimelineEmbed, TwitterFollowButton } from "react-twitter-embed";

/**
 * Home screen; contains redirects to play-game, create-game, and tutorial functions.
 * Also the only page where the user can log out of the app.
 *
 * @returns JSX elements
 */
function Home() {
  // Removes play button once clicked
  const [playClicked, setPlayClicked] = useState(false);
  const { currentUser } = useAuth();
  const [clickMe, setClickMe] = useState(0);

  return (
    <>
      <div id="home">
        <Router>
          <Switch>
            <PrivateRoute exact path="/home">
              <UserInfo email={currentUser.email} />
              <Link to="/home/play">
                <div id="play-button">
                  <div id="playtext">
                    <span>Play!</span>
                  </div>
                </div>
              </Link>

              <div className="centerContent">
                <div className="selfCenter standardWidth">
                  <TwitterTimelineEmbed
                    ssourceType="profile"
                    screenName="scoutninja1"
                    options={{ height: 400 }}
                  />
                </div>
              </div>
              <TwitterFollowButton screenName={"scoutninja1"} />

              <Link to="/home/goodbye">
                <div
                  style={{
                    height: "20vh",
                    width: "100%",
                  }}
                ></div>
              </Link>
            </PrivateRoute>
            <PrivateRoute exact path="/home/play">
              <ChoosePlay />
            </PrivateRoute>
            <Route path="/home/goodbye">
              <EasterEgg />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default Home;
