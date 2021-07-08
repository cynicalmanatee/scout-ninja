import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import name_logo from "../../assets/name_logo.png";

/**
 * Login screen for new users; default screen to appear when visiting the site.
 * 
 * Authenticates the user and redirects to home-page if available, or generates 
 * error messages if user was not found or if an error has occurred.
 * 
 * @returns JSX elements
 */
const Login = () => {
  // State for email input
  const emailRef = useRef();
  // State for password input
  const passwordRef = useRef();

  // Login function for authentication
  const { login } = useAuth();

  // Error message state
  const [error, setError] = useState('');

  // Display login-button state
  const [loading, setLoading] = useState(false);

  // Keeps track of the redirects of the user - marks that they came from login to redirect back after sign-out
  const history = useHistory();

  // Login button functionality
  async function handleSubmit(e) {

    // Prevent default anchor behaviour
    e.preventDefault();

    try {
      // Reset error message and removes login button (no double click)
      setError('')
      setLoading(true)

      // Attempts to log in using input values, and redirect to home if success
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch {

      // Set error message if failed
      setError('Incorrect email and/or password.')
    }
    // Brings login-button back
    setLoading(false)
  }

  return (
    <>
      <Card style={{marginTop: "100px"}}>
        <Card.Body>
          <img src={name_logo} style={{width: "100%", height: "auto"}} />
          <h2 className="text-center mb-4" style={{color: "black"}}>Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{color: "black"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <br/>
            <Form.Group id="password">
              <Form.Label style={{color: "black"}}>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>
            <br/>
            <Button style={{backgroundColor: "#FE5F55", borderColor: "#FE5F55"}} disabled={loading} className="w-100" type="submit">
              Login
            </Button>
          </Form>
      <div className="w-100 text-center mt-3">
        <Link style={{color: "#FE5F55"}} to="/forgot-password">Forgot Password?</Link>
      </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2" >
        Need an account? <Link style={{color: "#FE5F55"}} to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
