import React, { useContext, useState, useEffect } from "react";
import { auth } from "../Firebase";

// Creates a persistent storage of information and functions
const AuthContext = React.createContext();

// Returns all exported functions and values defined below
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * The element that provides functionality and values to all children elements.
 * Used to wrap all elements that require authentication functions or values. 
 * 
 * @params children elements to provide functionality to
 * @return JSX element
 */
export function AuthProvider({ children }) {

  // Current user state
  const [currentUser, setCurrentUser] = useState();

  // For determining render/removal of buttons
  const [loading, setLoading] = useState(true);

  // Facilitates account creation with firebase
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  // Faciliates login with firebase
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  // Facilitates logout with firebase
  function logout() {
      return auth.signOut();
  }

  // Faciliiates resetting password with firebase
  function resetpassword(email) {
      return auth.sendPasswordResetEmail(email);
  }

  // Sets current user when logged in, and removes current user when logged out
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Values and functions to export
  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetpassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
