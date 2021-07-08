const express = require("express");
const path = require("path");
const app = express();
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const bodyParser = require("body-parser");

// Establishes connection with prisma client; allows access to PostgreSQL database
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// Allows express to use the 'build' folder in the back-end
// app.use(express.static(path.join(__dirname, "build")));

/************************************************/
/******       User-related functions       ******/
/************************************************/

// Creates a user in the database
async function createUser(user) {
  const post = await prisma.player.create({
    data: {
      email: user.mail,
      nickname: "Not currently set",
      country: "Not currently set",
    },
  });
  return post;
}

// Grabs user information from the database
async function getUser(data) {
  const post = await prisma.player.findFirst({
    where: { email: data },
  });
  return post;
}

// Grabs all games created by a user in descending ID order
async function getGames(data) {
  const post = await prisma.game.findMany({
    where: { player_id: data },
    orderBy: {
      id: "desc",
    },
  });
  return post;
}

// Delets a game from the database
async function deleteGame(data) {
  // Function to deletes the game entry
  const post = prisma.game.delete({
    where: { id: data },
  });

  // Function to delete the hint entry
  const hint = prisma.clueshint.deleteMany({
    where: { game_id: data },
  });

  // Ensures that one runs before the other; maintain database integrity
  const transaction = await prisma.$transaction([hint, post]);

  return transaction;
}

// Updates user information
async function updateUser(mail, nick, coun, pp) {
  const post = await prisma.player.update({
    where: {
      email: mail,
    },
    data: {
      nickname: nick,
      country: coun,
      profile_pic: pp,
    },
  });
  return post;
}

/************************************************/
/******       Game-related functions       ******/
/************************************************/

// Creates a game entry and its related clues/hints in the database
async function createGame(data) {
  let email = data.mail;

  // Creates the game entry
  const post = await prisma.game.create({
    data: {
      game_name: data.game_name,
      player: { connect: { email: email } },
      boundary: data.bound,
      time_limit: data.time,
      start_coord_long: data.start_long,
      start_coord_lat: data.start_lat,
      link: "placeholder",
    },
    include: {
      player: true, // Include all posts in the returned object
    },
  });

  // Grabs the game that was just inputted into the database
  let lastGame = await prisma.game
    .findFirst({
      orderBy: {
        id: "desc",
      },
    })
    .then((res) => {
      return res;
    });

  // The list of clues and hints to store
  let hintList = [];

  // Pushes all relevant clue and hint into into the array
  const hints = data.clueshints.forEach((item) => {
    return hintList.push({
      game_id: lastGame.id,
      order_num: item.order_num,
      clue: item.clue,
      hint: item.hint,
      coord_lat: item.coord.lat,
      coord_long: item.coord.lng,
    });
  });

  // Creates hint entries using the aforementioned list
  const createHints = await prisma.clueshint.createMany({
    data: hintList,
    skipDuplicates: true, // Skip 'Bobo'
  });

  return createHints;
}

// Gets all information related to a game including clues/hints
async function getGameInfo(data) {
  // Grabs the game based on id
  const game = await prisma.game
    .findUnique({
      where: {
        id: data,
      },
    })
    .then((res) => {
      return res;
    });

  // Grabs all clues related to the game
  const clue = await prisma.clueshint
    .findMany({
      where: {
        game_id: data,
      },
    })
    .then((res) => {
      return res;
    });

  // If the response is null (no game found), return null
  var response = null;

  // If response is not null (game found), return game info and clues
  if (game !== null) {
    response = {
      game: game,
      clues: clue,
    };
  }
  return response;
}

// Grabs the top 10 users with the highest ratings in descending order
async function getLeaderboards() {
  const list = await prisma.player.findMany({
    orderBy: {
      rating: "desc",
    },
    take: 10,
  });
  return list;
}

// Submits the score and changes the rating after a player has finished a game
async function submitScore(data) {
  // Calculates the rating change for the player based on their score
  let ratingChange = Math.floor(
    data.rating + ((data.highscore - 10000) / 10000) * 50
  );

  // Insert score into database if not exists; update if does exists
  const submitscore = prisma.highscore.upsert({
    where: {
      player_id_game_id: {
        player_id: data.player_id,
        game_id: data.game_id,
      },
    },
    update: {
      highscore: data.highscore,
    },
    create: {
      player_id: data.player_id,
      game_id: data.game_id,
      highscore: data.highscore,
    },
  });

  // Changes the rating of the player based on above calculation
  const changerate = prisma.player.update({
    where: {
      email: data.player_id,
    },
    data: {
      rating: ratingChange,
    },
  });

  // submits the score, then changes the rating - maintains database integrity
  const transaction = await prisma.$transaction([submitscore, changerate]);

  return transaction;
}

// Grabs all friends from the database -- not working; future implementation
async function getFriends(mail) {
  var friendlist = [];

  let friends = await prisma.friend.findMany({
    where: {
      primary_user_id: mail,
    },
  });

  await Promise.all(
    friends.map(async (item) => {
      let x = await prisma.player.findUnique({
        where: {
          email: item.friend_user_id,
        },
      });
      friendlist.push(x);
    })
  );

  console.log(await friendlist.toString());
  return friendlist;
}

// Adds a user-friend relationship to the friend table in the database
async function addFriend(data) {
  // Finds the unique user entry
  const add = await prisma.player
    .findUnique({
      where: {
        email: data.friend_mail,
      },
    })
    .then(async (res) => {
      // If no friend found, return the error
      if (res == null) {
        return res;
      } else {
        // Create a friend entry
        await prisma.friend
          .create({
            data: {
              primary_user_id: data.player_mail,
              friend_user_id: data.friend_mail,
            },
          })
          .then((res) => {
            return res;
          });
      }
    });
}

// Grabs the completion rate of a given game -- not working; future implementation
async function getGameStats(data) {
  var completed = 0;
  var total = 0;
  console.log("id: " + data);
  const info = await prisma.highscore.findMany({
    where: {
      game_id: data,
    },
  });

  if (info == null) {
    console.log("no games found for: " + data);
    return { data: 0 };
  } else {
    for (let i = 0; i < info.length; i++) {
      if (info[i].highscore > 0) {
        completed++;
      }
      total++;
    }
    var response = Math.floor((completed / total) * 100);
    console.log("response: " + response);
    return { data: response };
  }

  // Previous code -- leaving for documentation and future reference

  // .then((res) => {
  //   if (res == null) {
  //     console.log("no games found for: " + data)
  //     return {complete: 0};
  //   } else {
  //     console.log("resposne for " + data + ":" + JSON.stringify(res));
  //     res.forEach((game) => {
  //       console.log("game for " + data + ": " + game.highscore)
  //       if (game.highscore > 0) {
  //         completed++;
  //       }
  //       total++;
  //     })
  //     console.log("here is the output value if games were found for " + data)
  //     var response = Math.floor((completed / total) * 100);
  //     console.log(response);
  //     return response;
  //   }
  // })
}

/************************************************************/
/******       Express request/response functions       ******/
/************************************************************/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })

app.post("/get-user", async (req, res) => {
  let sendthis = await getUser(req.body.data);
  res.send(sendthis);
});

app.post("/create-user", async (req, res) => {
  let sendthis = await createUser(req.body.data);
  res.send(sendthis);
});

app.post("/update-user", async (req, res) => {
  let sendthis = await updateUser(
    req.body.data.email,
    req.body.data.nickname,
    req.body.data.country,
    req.body.data.profile_pic
  );
  res.send(sendthis);
});

app.post("/get-games", async (req, res) => {
  let sendthis = await getGames(req.body.data);
  res.send(sendthis);
});

app.post("/delete-game", async (req, res) => {
  let sendthis = await deleteGame(req.body.data);
  res.send(sendthis);
});

app.post("/create-game", async (req, res) => {
  let sendthis = await createGame(req.body.data);
  res.send(sendthis);
});

app.post("/get-game-info", async (req, res) => {
  let sendthis = await getGameInfo(req.body.data);
  res.send(sendthis);
});

app.get("/get-leaderboards", async (req, res) => {
  let sendthis = await getLeaderboards();
  res.send(sendthis);
});

app.post("/submit-score", async (req, res) => {
  let sendthis = await submitScore(req.body.data);
  res.send(sendthis);
});

app.post("/add-friend", async (req, res) => {
  console.log("Adding friend!");
  let sendthis = await addFriend(req.body.data);
  console.log(sendthis);
  res.send("Friend added!");
});

// Not currently working; future implementation
app.post("/get-friends", async (req, res) => {
  console.log("Grabbing friends!");
  let sendthis = await getFriends(req.body.data);
  console.log("Friends Received!");
  console.log(sendthis);
  res.send(sendthis);
});

// Not currently working; future implementation
app.post("/get-game-stats", async (req, res) => {
  console.log("Getting game stats!");
  let sendthis = await getGameStats(req.body.data);
  console.log("Stats received!");
  console.log("stat response: " + sendthis);
  res.send(sendthis);
});

const PORT = process.env.PORT || 8080;

// Listen for requests on the designated port
app.listen(PORT, console.log(`Server started on port ${PORT}`));
