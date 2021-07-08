import React, { useState, useEffect } from "react";
import UserInfo from "../Profile/UserInfo";
import "./styles/Leaderboard.css";
import { useServer } from "../../contexts/BackendContext";
import { BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import TopPlayer from "./TopPlayer";

//generates a list of players based on rank in JSX elements
const RankList = (props) => {
  var list = props.list;
  let count = 1;
  return list.length !== 0 ? (
    list.map((player) => {
      return <TopPlayer player={player} index={count++} />;
    })
  ) : (
    <p></p>
  );
};

/**
 * The leaderboards section root page
 * @returns JSX elements
 */
function Leaderboard() {
  //retieves players on the leaderboard
  const { getLeaderboards } = useServer();
  //stores the top 10 players in the database
  const [topTen, setTopTen] = useState([]);

  //sets the top 10 list each time the pages changes
  useEffect(() => {
    getLeaderboards().then((list) => {
      setTopTen(list);
    });
  }, []);

  return (
    <Router>
      <div id="leaderboard-main">
        <Switch>
          <Route path="/leaderboard" exact>
            <UserInfo />
            <h2>Leaderboards</h2>
            <div id="blank"></div>
          </Route>
          </Switch>
      </div>
      <div>
        <RankList list={topTen} />
      </div>
    </Router>
  );
}

export default Leaderboard;
