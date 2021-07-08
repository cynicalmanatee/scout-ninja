# COMP-2800-Team-BBY-30-ScoutNinja

Hello fellow developer! Lets get you set up and ready to go.

For this Application, you will need discord, VS Code, Node.js, Selenium IDE, git and gitHub.

# installing Discord

- you can use discord through your browser or download the client via "https://discord.com/download",
- join the team's server "https://discord.gg/eHVZrE8V"
- within the chat server, the channels are used for different functions:
  - text channels:
    - general: used for everyday messages, chit chat etc.
    - meeting-minutes: place exclusively for posting meeting minutes for daily scrum meetings and client meetings. no other content allowed
    - links-resources: place to post any deliverable documentations, links to helpful technologies, tutorials, articles etc.
    - song-request: while in a voice channel, we have a groovy-bot that can play music to the voice channel for everyone in it. use -p <song name> to request songs
    - assets: this channel is used to pass assets around (pictures, videos, music etc) needed for the project or media surrounding the project
    - decision: channel used to post anything specific to team decisions regarding the project's direction
    - any other text channels are used as small group discussions
  - voice channels:
    - general: used as the meeting location for daily work sessions.
    - any other voice channels are used for small goup/partner coding sessions

# installing Visual Studio Code

For this project, we will be using VS code and their extensions catelog.

- go to "https://code.visualstudio.com/download" and install the latest version of VS Code.

for your VS Code, please have the following extensions installed and ready to use: - ES7 React/Redux/GraphQL/React-Native snippets - For quick React component creation - Visual Studio IntelliCode - For coding aid in general - Prettier + - For code organization and readability - Live Share - For partner coding sessions.

# installing Git:

- go to "https://git-scm.com/downloads" and download the latest release for git.
- go through the installation process using the recommended settings from git.
  - for this application, we like to use VS Code, so unless you prefer another IDE, choose VS code for your git message prompts.
- after installation, check your git version with <git --version>, to make sure it has installed properly
- run the following:
  - \$ git config --global user.name <your name here>
  - \$ git config --global user.email <your email address, same as github>

# installing Node.js

- go to "https://nodejs.org/en/download/" and install the latest Long Term Support (LTS) version.
  - 14.17.0 as of writing this document
- after installation: test your Node.js with:
  - <\$ node -v> to check your node version
  - <\$ npm install -g npm> to install the latest version of Node package manager
  - <\$ npm -v> to check the install version

# installing PostgreSql:

- go to "https://www.postgresql.org/download/" and install the latest version of PostgreSql
- during installation, when prompted for a password, pick something you can remember (this does not affect or interact with the app), use default settings for the rest of the installation process
- say the word "penis" really quietly

To access the working sql database:

- in command prompt, navigate to PostgreSQL installation folder
- navigate into the bin folder
- use the command <\$ psql -h ec2-3-233-7-12.compute-1.amazonaws.com -p 5432 -d d99tfbmjughjt2 -U elilcdmeapxezk -W>
- password is: d8bfe6f31c593607d9d356520e85eedf1ea835c46d051d9fd9252bdb4bec6ba3

# gitHub setup:

- set up an account on git hub with your email address
- inform Oscar with your account name, so to be invited on to the project as a collaborator.
- in command prompt, navigate to a directory that you want to use for the porject.
- use the command <\$ git clone https://github.com/oscarlaaaa/COMP-2800-Team-BBY-30-ScoutNinja> when prompted, login to gitHub via a browser.
- <$ cd COMP-2800-Team-BBY-30-ScoutNinja> to navigate into the directory, and <$ code .> to open your current directory in VS Code.

# starting the application on your local machine:

- in VS Code, open the project folder.
- under terminal, open two command prompts (side by side for ease of use).
- in the first cmd, <\$cd front-end>:
  - run <\$ npm install> to install all the dependencies needed by the front end application
  - run <\$ npm start> after installation to start the front end application on "localhost:3000"
- in the second cmd, <\$cd back-end>:
  - run <\$ npm install> to install all the dependencies needed by the back end application
  - run <$ npx prisma introspect> followed by <$ npx prisma generate> to set up Prisma
  - run <\$ node server.js> after setup to start the backend application on "localhost:8080"

# developement technologies

in our application, we use the following modules within node:

- React
- Prisma
- Axios
- Firebase
- PostgreSQL

- React is the front end framework used by the app. it uses JSX and creates a dynamically rendered application that mimics a multipage application but only contains 1 page.
  - some key packages to familiarize yourself with include:
    - react-router-dom
    - react-google-maps
    - react-google-streetview
    - react-async-loader
- Prisma serves as a connection between the back end server and the cloud database.
- Axios serves as the connection between the front end and back end server. it is similar to Ajax
- Firebase handles the authentication for our application.
- PostgreSQL is the database for the application

# unit testing

For unit testing, we use Selenium IDE as a webapp.

- go to "https://www.selenium.dev/selenium-ide/" and install the latest version of Selenium IDE

Selenium IDE uses recorded scripts to test the functionality of our webapp. you can find the current unit test plan at "https://docs.google.com/spreadsheets/d/1ptCz4w-hdPZAkn-680WFC8PsRmOQ0DBa9hZqk4_gSUM/edit?usp=sharing"

File Structure:

```
front-end/src

front-end
 ┣ public
 ┃ ┣ favicon.ico
 ┃ ┣ index.html
 ┃ ┣ logo192.png
 ┃ ┣ logo512.png
 ┃ ┣ manifest.json
 ┃ ┗ robots.txt
 ┣ src
 ┃ ┣ assets
 ┃ ┃ ┣ bell.png
 ┃ ┃ ┣ crown.png
 ┃ ┃ ┣ friends.png
 ┃ ┃ ┣ home.png
 ┃ ┃ ┣ logo_image.png
 ┃ ┃ ┣ name_logo.png
 ┃ ┃ ┣ photo-1566031994720-cd39b144bc34.jpg
 ┃ ┃ ┣ settings.png
 ┃ ┃ ┗ user.png
 ┃ ┣ components
 ┃ ┃ ┣ about-us
 ┃ ┃ ┃ ┣ img
 ┃ ┃ ┃ ┃ ┣ Harry Avatar.png
 ┃ ┃ ┃ ┃ ┣ Kenneth Avatar.png
 ┃ ┃ ┃ ┃ ┣ Oscar Avatar.png
 ┃ ┃ ┃ ┃ ┗ Se Hwan Avatar.png
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┗ AboutUs.css
 ┃ ┃ ┃ ┗ AboutUs.js
 ┃ ┃ ┣ authentication
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┗ LoginProfile.css
 ┃ ┃ ┃ ┣ ForgotPassword.js
 ┃ ┃ ┃ ┣ Login.js
 ┃ ┃ ┃ ┣ LoginButton.js
 ┃ ┃ ┃ ┣ LoginProfile.js
 ┃ ┃ ┃ ┣ LogoutButton.js
 ┃ ┃ ┃ ┣ SignUp.js
 ┃ ┃ ┃ ┗ WelcomeMessage.js
 ┃ ┃ ┣ create-game
 ┃ ┃ ┃ ┣ Circle.js
 ┃ ┃ ┃ ┗ MapRender.js
 ┃ ┃ ┣ friendlist
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┣ Friendlist.css
 ┃ ┃ ┃ ┃ ┗ FriendlistProfile.css
 ┃ ┃ ┃ ┣ Friendlist.js
 ┃ ┃ ┃ ┣ FriendlistBody.js
 ┃ ┃ ┃ ┣ FriendlistForm.js
 ┃ ┃ ┃ ┗ FriendProfile.js
 ┃ ┃ ┣ generic-component
 ┃ ┃ ┃ ┣ assets
 ┃ ┃ ┃ ┃ ┣ bell.png
 ┃ ┃ ┃ ┃ ┣ crown.png
 ┃ ┃ ┃ ┃ ┣ facebook.png
 ┃ ┃ ┃ ┃ ┣ friends.png
 ┃ ┃ ┃ ┃ ┣ group.png
 ┃ ┃ ┃ ┃ ┣ Harry Head.png
 ┃ ┃ ┃ ┃ ┣ home.png
 ┃ ┃ ┃ ┃ ┣ Kenneth Head.png
 ┃ ┃ ┃ ┃ ┣ left-arrow.png
 ┃ ┃ ┃ ┃ ┣ Logo.png
 ┃ ┃ ┃ ┃ ┣ logo_image.png
 ┃ ┃ ┃ ┃ ┣ Oscar Head.png
 ┃ ┃ ┃ ┃ ┣ settings.png
 ┃ ┃ ┃ ┃ ┣ twitter.png
 ┃ ┃ ┃ ┃ ┣ user.png
 ┃ ┃ ┃ ┃ ┗ winner.png
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┣ Button.css
 ┃ ┃ ┃ ┃ ┣ Navbar.css
 ┃ ┃ ┃ ┃ ┣ SlideShow.css
 ┃ ┃ ┃ ┃ ┣ Title.css
 ┃ ┃ ┃ ┃ ┗ Upload.css
 ┃ ┃ ┃ ┣ BackButton.js
 ┃ ┃ ┃ ┣ Button.js
 ┃ ┃ ┃ ┣ EasterEgg.js
 ┃ ┃ ┃ ┣ Header.js
 ┃ ┃ ┃ ┣ HistoryTab.js
 ┃ ┃ ┃ ┣ Navbar.js
 ┃ ┃ ┃ ┣ PlaceholderImage.js
 ┃ ┃ ┃ ┣ PrivateRoute.js
 ┃ ┃ ┃ ┣ Rating.js
 ┃ ┃ ┃ ┣ SlideShow.js
 ┃ ┃ ┃ ┣ StatsTab.js
 ┃ ┃ ┃ ┣ Title.js
 ┃ ┃ ┃ ┗ Upload.js
 ┃ ┃ ┣ home
 ┃ ┃ ┃ ┣ assets
 ┃ ┃ ┃ ┃ ┣ creategame0.png
 ┃ ┃ ┃ ┃ ┣ creategame1.png
 ┃ ┃ ┃ ┃ ┣ creategame2.png
 ┃ ┃ ┃ ┃ ┣ creategame3.png
 ┃ ┃ ┃ ┃ ┣ creategame4.png
 ┃ ┃ ┃ ┃ ┣ creategame5.png
 ┃ ┃ ┃ ┃ ┣ creategame6.png
 ┃ ┃ ┃ ┃ ┣ creategame7.png
 ┃ ┃ ┃ ┃ ┣ creategame8.png
 ┃ ┃ ┃ ┃ ┣ creategame9.png
 ┃ ┃ ┃ ┃ ┣ playgame0.png
 ┃ ┃ ┃ ┃ ┣ playgame01.png
 ┃ ┃ ┃ ┃ ┣ playgame02.png
 ┃ ┃ ┃ ┃ ┣ playgame03.png
 ┃ ┃ ┃ ┃ ┣ playgame04.png
 ┃ ┃ ┃ ┃ ┣ playgame05.png
 ┃ ┃ ┃ ┃ ┣ playgame06.png
 ┃ ┃ ┃ ┃ ┣ playgame07.png
 ┃ ┃ ┃ ┃ ┣ playgame08.png
 ┃ ┃ ┃ ┃ ┗ playgame09.png
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┣ ChoosePlay.css
 ┃ ┃ ┃ ┃ ┣ Home.css
 ┃ ┃ ┃ ┃ ┗ JoinGame.css
 ┃ ┃ ┃ ┣ ChoosePlay.js
 ┃ ┃ ┃ ┣ CreateGame.js
 ┃ ┃ ┃ ┣ GameName.js
 ┃ ┃ ┃ ┣ HintClue.js
 ┃ ┃ ┃ ┣ Home.js
 ┃ ┃ ┃ ┣ JoinGame.js
 ┃ ┃ ┃ ┣ Play.js
 ┃ ┃ ┃ ┗ Summary.js
 ┃ ┃ ┣ leaderboard
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┣ Leaderboard.css
 ┃ ┃ ┃ ┃ ┗ TopPlayer.css
 ┃ ┃ ┃ ┣ DistanceCalculator.js
 ┃ ┃ ┃ ┣ EloCalculator.js
 ┃ ┃ ┃ ┣ GoogleStreetview.js
 ┃ ┃ ┃ ┣ Leaderboard.js
 ┃ ┃ ┃ ┣ Scoring.js
 ┃ ┃ ┃ ┗ TopPlayer.js
 ┃ ┃ ┣ main
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┗ StartButton.css
 ┃ ┃ ┃ ┗ StartButton.js
 ┃ ┃ ┣ map
 ┃ ┃ ┃ ┣ FlatMap.js
 ┃ ┃ ┃ ┣ MapCircle.js
 ┃ ┃ ┃ ┣ MapMarker.js
 ┃ ┃ ┃ ┗ Streetview.js
 ┃ ┃ ┣ play-game
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┗ View.css
 ┃ ┃ ┃ ┣ CountdownTimer.js
 ┃ ┃ ┃ ┣ GoogleStreetview.js
 ┃ ┃ ┃ ┗ View.js
 ┃ ┃ ┣ profile
 ┃ ┃ ┃ ┣ assets
 ┃ ┃ ┃ ┃ ┣ Harry Head.png
 ┃ ┃ ┃ ┃ ┣ Kenneth Head.png
 ┃ ┃ ┃ ┃ ┗ Oscar Head.png
 ┃ ┃ ┃ ┣ styles
 ┃ ┃ ┃ ┃ ┣ Body.css
 ┃ ┃ ┃ ┃ ┣ CurrentUserInfo.css
 ┃ ┃ ┃ ┃ ┣ Profile.css
 ┃ ┃ ┃ ┃ ┣ ProfileForm.css
 ┃ ┃ ┃ ┃ ┗ UserInfo.css
 ┃ ┃ ┃ ┣ Body.js
 ┃ ┃ ┃ ┣ GameList.js
 ┃ ┃ ┃ ┣ HistoryTab.js
 ┃ ┃ ┃ ┣ Profile.js
 ┃ ┃ ┃ ┣ ProfileForm.js
 ┃ ┃ ┃ ┣ StatsTab.js
 ┃ ┃ ┃ ┗ UserInfo.js
 ┃ ┃ ┗ reportWebVitals.js
 ┃ ┣ contexts
 ┃ ┃ ┣ AuthContext.js
 ┃ ┃ ┗ BackendContext.js
 ┃ ┣ App.css
 ┃ ┣ App.js
 ┃ ┣ Firebase.js
 ┃ ┣ index.css
 ┃ ┣ index.js
 ┃ ┗ setupTests.js
 ┣ .env
 ┣ .gitignore
 ┣ package-lock.json
 ┣ package.json
 ┣ README.md
 ┗ Tree.md

 back-end
 ┣ prisma
 ┃ ┗ schema.prisma
 ┣ .env
 ┣ .gitignore
 ┣ CreateDBandTables.sql
 ┣ package-lock.json
 ┣ package.json
 ┗ server.js
```
