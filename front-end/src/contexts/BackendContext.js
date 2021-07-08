import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import profilePicture1 from "../components/Generic-Components/assets/Harry Head.png";
import profilePicture2 from "../components/Generic-Components/assets/Kenneth Head.png";
import profilePicture3 from "../components/Generic-Components/assets/Oscar Head.png";
import defaultPicture from "../components/Generic-Components/assets/Logo.png";

// Creates a persistent storage of information and functions
const BackendContext = React.createContext();

// Connecting the front-end api to server
const api = axios.create({
  baseURL: "http://localhost:3000/",
});
// http://localhost:3000
//  https://scoutninja.herokuapp.com/

/**Code taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript */
// Function to create a unique id - not used; future implementation for game ids
function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}



// Returns all exported functions and values defined below
export function useServer() {
  return useContext(BackendContext);
}

/**
 * The element that provides functionality and values to all children elements.
 * Used to wrap all elements that require database functions or values. 
 * 
 * @params children elements to provide functionality to
 * @return JSX element
 */
export function BackProvider({ children }) {

  // User states from database such as nickname, country, email, rating
  const [nickname, setNickname] = useState();
  const [country, setCountry] = useState();
  const [email, setEmail] = useState();
  const [rating, setRating] = useState();
  const [profilepic, setProfilePic] = useState();

  // Creates a user entry in the database; used for signup
  function createDBUser(email) {
    axios
    //   .post("https://scoutninja.herokuapp.com/create-user", {
      .post("http://localhost:3000/create-user", {
        data: { mail: email },
      })
      .then((res) => {
        console.log(res);
      });
  }

  function whichProfilePic(id) {
    switch (id) {
      case 0: 
        return profilePicture1;
      case 1: 
        return profilePicture2;
      case 2: 
        return profilePicture3;
      default:
        return defaultPicture;
    }
  }

  function profilePicList() {
    let list = [];
    list.push({picture: profilePicture1, index: 0});
    list.push({picture: profilePicture2, index: 1});
    list.push({picture: profilePicture3, index: 2});
    list.push({picture: defaultPicture, index: 3});

    return list;
  }

  // Grabs user information and stores it into their respective states
  function getUser(mail) {
    return axios
    //   .post("https://scoutninja.herokuapp.com/get-user", { data: mail })
      .post("http://localhost:3000/get-user", { data: mail })
      .then((res) => {
        console.log(res.data);
        setEmail(res.data.email);
        setNickname(res.data.nickname);
        setCountry(res.data.country);
        setRating(res.data.rating);
        setProfilePic(res.data.profile_pic);
        return res.data;
      })
      .catch((error) => console.error(error));
  }

  // Updates a user's nickname and/or country when edited
  function updateDBUser(mail, nickname, country, profpic) {
    setEmail(mail);
    setNickname(nickname);
    setCountry(country);
    setProfilePic(profpic);
    axios
    //   .post("https://scoutninja.herokuapp.com/update-user", {
      .post("http://localhost:3000/update-user", {
        data: {
          email: mail,
          nickname: nickname,
          country: country,
          profile_pic: profpic
        },
      })
      .then((res) => console.log(res));
  }

  // Gets all games from database created by the user
  function getGames(mail) {
    return axios
    //   .post("https://scoutninja.herokuapp.com/get-games", { data: mail })
      .post("http://localhost:3000/get-games", { data: mail })
      .then((res) => {
        console.log(res)
      return res.data});
  }

  // Deletes a game from database based on game-id 
  function deleteGame(id) {
    // return axios.post("https://scoutninja.herokuapp.com/delete-game", { data: id })
    return axios.post("http://localhost:3000/delete-game", { data: id })
    .then((res) => console.log(res));
  }

  // Creates a new game entry in database as well as respective clues/hints entry
  function createGame(name, player, startcoord, bound, time, clueshints) {
    return axios
    //   .post("https://scoutninja.herokuapp.com/create-game", {
      .post("http://localhost:3000/create-game", {
        data: {
          game_name: name,
          mail: player,
          bound: bound,
          time: time,
          start_long: startcoord.lng,
          start_lat: startcoord.lat,
          clueshints: clueshints,
        },
      })
      .then((res) => console.log(res));
  }

  // Grabs the information of a single game based on ID and returns it
  function getGameInfo(id) {
    // return axios.post("https://scoutninja.herokuapp.com/get-game-info", {
    return axios.post("http://localhost:3000/get-game-info", {
      data: parseInt(id)
    })
    .then((res) => {
      console.log(res.data);
      return res;
    })
  }

  // Grabs the current top 10 players and returns them as an array
  function getLeaderboards() {
    // return axios.get("https://scoutninja.herokuapp.com/get-leaderboards")
    return axios.get("http://localhost:3000/get-leaderboards")
    .then ((res) => {
      console.log(res.data);
      return res.data;
    })
  }

  // Submits a score after game completion into database; adjusts user rating based on performance
  function submitScore(player, game, score, rating) {
    // return axios.post("https://scoutninja.herokuapp.com/submit-score", {
    return axios.post("http://localhost:3000/submit-score", {
      data: {
        player_id: player,
        game_id: game,
        highscore: score,
        rating: rating,
      }
    })
    .then ((res) => {
      console.log(res.data);
      return res;
    })
  }

  // Grabs list of friends for the user -- not currently working; future implementation
  function getFriends(mail) {
    // return axios.post("https://scoutninja.herokuapp.com/get-friends", {
    return axios.post("http://localhost:3000/get-friends", {
      data: mail
    })
    .then ((res) => {
      console.log(res);
      return res;
    })
  }

  // Adds a friend to a user; entry into database
  function addFriend(userMail, friendMail) {
    // return axios.post("https://scoutninja.herokuapp.com/add-friend", {
    return axios.post("http://localhost:3000/add-friend", {
      data: {
        player_mail: userMail,
        friend_mail: friendMail,
      }
    })
    .then ((res) => {
      console.log(res);
      return res;
    })
  }

  // Gets the completion rate of a game from database and returns it -- not currently working; future implementation
  function getGameStats(gameID) {
    // return axios.post("https://scoutninja.herokuapp.com/get-game-stats", {
    return axios.post("http://localhost:3000/get-game-stats", {
      data: gameID
    })
    .then ((res) => {
      return res;
    })
  }

  // List of exports
  const value = {

    // Authentication function exports
    createDBUser,
    updateDBUser,

    // Game function exports
    getGames,
    createGame,
    deleteGame,
    getGameInfo,
    submitScore,
    getGameStats,

    // Friend function exports
    getFriends,
    addFriend,
    getLeaderboards,

    // User info exports
    getUser,
    nickname,
    setNickname,
    profilepic,
    setProfilePic,
    whichProfilePic,
    profilePicList,
    country,
    setCountry,
    email,
    setEmail,
    rating,
    setRating,
  };

  return (
    <BackendContext.Provider value={value}>{children}</BackendContext.Provider>
  );
}
