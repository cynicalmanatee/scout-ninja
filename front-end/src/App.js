import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Friendlist from "./components/Friendlist/Friendlist";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Home from "./components/Home/Home";
import AboutUs from "./components/AboutUs/AboutUs";
import Navbar from "./components/Generic-Components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import { Container, Alert } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BackProvider } from "./contexts/BackendContext";
import Login from "./components/authentication/Login";
import PrivateRoute from "./components/Generic-Components/PrivateRoute";
import ForgotPassword from "./components/authentication/ForgotPassword";

/**
 * This is the main driver of our app.
 * @returns The entire APP
 */
function App() {
  return (
    <Router>
      <div
        // className="d-flex align-items-center justify-content-center"
        style={{ height: "88vh", width: "100vw", overflowY: "auto" }}
      >
        <div id="main-box">
          <AuthProvider>
            <BackProvider>
              {/* <Header/> */}
              <Switch>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/forgot-password">
                  <ForgotPassword />
                </Route>
                <PrivateRoute exact path="/">
                  <Redirect to="/home" />
                </PrivateRoute>
                <PrivateRoute path="/home" component={Home}></PrivateRoute>
                <PrivateRoute path="/profile">
                  <Profile />
                </PrivateRoute>
                <PrivateRoute
                  path="/friend"
                  component={Friendlist}
                ></PrivateRoute>
                <PrivateRoute
                  path="/leaderboard"
                  component={Leaderboard}
                ></PrivateRoute>
                <PrivateRoute
                  path="/aboutus"
                  component={AboutUs}
                ></PrivateRoute>
              </Switch>
            </BackProvider>
          </AuthProvider>
        </div>
      </div>
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    </Router>
  );
}

export default App;
