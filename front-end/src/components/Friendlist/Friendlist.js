import React, { useState, useEffect } from "react";
import UserInfo from "../Profile/UserInfo";
import FriendlistBody from "./FriendlistBody";
import FriendlistForm from "./FriendlistForm";
import Button from "../Generic-Components/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles/Friendlist.css";
import { useServer } from "../../contexts/BackendContext";
import { useAuth } from "../../contexts/AuthContext";
import FriendlistItem from "./FriendlistItem";

function Friendlist() {
  //Get the list of friends from the back end server, currently not working
  const { getFriends } = useServer();
  //Sends the friend information to the backend to create a connection between users
  const { addFriend } = useServer();
  //Gets the current user information from the backend server
  const { currentUser } = useAuth();
  //Sets the retrieved list of friends from the back end to an usable state within the component
  const [friends, setFriends] = useState();

  //toggles the add friend input box
  const [toggleForm, setToggleForm] = useState(false);
  //Stores the dynamically generated list of friends in JSX
  const [friendlistList, setFriendlistList] = useState([]);
  //Stores the status of adding a friend, either successful or friend not found
  const [status, setStatus] = useState("");
  //Stores the email address the user inputs for adding a friend
  const [targetEmail, setTargetEmail] = useState("");
  //stores the add friend input form as a JSX
  const [friendForm] = useState(addFriendForm);

  //facilitates adding friend to the back end server
  function add(mail) {
    console.log(mail);
    addFriend(currentUser.email, mail).then((res) => {
      console.log(res);
      setStatus("Friend added!");
    });
  }

  const mapFriends = () => {
    return friends.map((friend) => {
      return (
        <FriendlistItem key={"friend" + x++} player={friend} />
      );
    });
  };

  //returns the opposite of toggleForm
  function toggleAddFriend() {
    return !toggleForm;
  }

  //generates the add friend form in JSX
  function addFriendForm() {
    return [
      <div id="add-friend-form">
        <form>
          <label htmlFor="id">Friend ID</label>
          <input
            id="id"
            type="text"
            onChange={(e) => setTargetEmail(e.target.value)}
          />
          <span>{}</span>
        </form>
      </div>,
    ];
  }

  useEffect(() => {
    getFriends(currentUser.email).then((list) => {
        setFriends(list.data);
      });
  }, []);

  let x = 0;

  return (
    <Router>
      <Switch>
        <div>
          <UserInfo />

          <div className="friendlist-body">
            <h2>Friend List</h2>
            <br />
            {toggleForm ? <FriendlistForm setEmail={setTargetEmail} /> : ""}

            {toggleForm ? (
              <button
                className="friendlist-form-button"
                onClick={() => {
                  add(targetEmail);
                  setToggleForm(toggleAddFriend);
                }}
              >
                Submit
              </button>
            ) : (
              <button
                className="friendlist-form-button"
                onClick={() => setToggleForm(toggleAddFriend)}
              >
                Add Friend
              </button>
            )}
            <p>{status}</p>
            <p>{friends && mapFriends()}</p>
          </div>
        </div>
      </Switch>
    </Router>
  );
}

export default Friendlist;
