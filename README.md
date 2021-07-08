# ScoutNinja

This is a group project made for BCIT's COMP2800 Projects 2 course, where we were required to make a mobile web application.
ScoutNinja is an online scavenger-hunt game that utilizes google maps and google streetview to allow players to create and play their own scavenger hunt games.

Due to commits in the original repo containing important API keys and wanting to preserve its original integrity, I have cloned the repo without the dangerous history so that I am able to display the code.

This project was made with the following group members:

- Harry He (https://github.com/cynicalmanatee)
- Sehwan Lee (https://github.com/Saskaros)
- Kenneth Ng (https://github.com/kennethclng)

## Table of Contents

>  - [Motivation](#motivation)
>  - [Current State](#current-state)
>  - [Tech/Frameworks](#tech-frameworks)
>  - [Features](#features)
>  - [How to Play](#how-to-play)
>  - [Credits](#credits)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

## Motivation

Given that our projects course theme was about maintaining friendships, we decided that a game would be the most enjoyable and entertaining way of doing so. As such, we took some inspiration from GeoGuesser and created a scavenger game with a different concept: rather than having to look for where you are on the map, you have to find specific pre-set locations using hints and blues instead. Exciting!!

## Current State

The app currently only runs properly on mobile view, with a few minor bugs here and there that we are gradually taking care of.

## Tech/Frameworks

- **React.js** for a dynamic front-end using hooks and router
  - React-Router-Dom for handling page routing
  - React-Bootstrap for certain component stylings
  - React-Google-Streetview and React-Google-Maps for our core game functionality
- **Node.js** to establish a server to handle requests
- **Express** to develop the back-end APIs
- **Axios** to handle HTTP requests between the front- and back-ends of the app
- **Prisma** to implement a robust and stable connection to the PostgreSQL server hosted on Heroku
- **Heroku** to host our web application
- **Google Firebase** to provide authentication functionality

## Features

- Dynamic authentication using Google Firebase for a unique user experience.
- Persistent data storage using PostgreSQL to handle all user, game, friend, and scoring information.
- Uniquely styled UI/UX design made mostly from scratch (and love).
- Fully functional ranking and leaderboard system to provide a competitive incentive to play.
- Customizable user profiles that are displayed to all other players.
- Bare-bones friends list (WIP).
- Enjoyable gameplay loop centered around creating unique challenges and sending them to your friends to complete, promoting friendly interaction and competition.

## How to Play

Simply visit https://scoutninja.herokuapp.com/ to try out the application.

## Credits

- Our mentor instructor [Seyed](https://github.com/seyedbcit) for all his guidance and help throughout the process.
- Our class instructors [Carly](https://github.com/orrbcit) and [Chris](https://github.com/chris-thompson) for answering any questions we had.
- Google and Stackoverflow; we couldn't have done it without y'all.
