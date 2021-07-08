import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useServer } from "../../contexts/BackendContext";
import name_logo from "../../assets/name_logo.png";

/**
 * Sign-up page for new users.
 * 
 * Handles account creation for both firebase authentication as well as database.
 * Redirects to login page if success; otherwise, displays error message.
 * 
 * @returns JSX elements
 */
const SignUp = () => {

  // States for email, password, and confirm password fields
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // Signup function for authentication; createDBUser to create user profile in database
  const { signup } = useAuth();
  const { createDBUser } = useServer();

  // Error and success message states
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Sign-up button display state
  const [loading, setLoading] = useState(false)

  // Keeps track of page history; allows redirect back to login page after sign-up
  const history = useHistory();

  async function handleSubmit(e) {

    // Prevents default anchor behaviour
    e.preventDefault();

    // Checks that password and confirm password fields match; display error message if not
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      // Reset confirmatory and error message; remove sign-up button
      setMessage('')
      setError('')
      setLoading(true)

      // Signs the user up into firebase for authentication
      await signup(emailRef.current.value, passwordRef.current.value);

      // Signs the user up into the database; creates profile
      await createDBUser(emailRef.current.value);

      // Success message and redirect to login if success
      setMessage('Account created! You will be redirected to the login page.');
      setTimeout(() => {
        history.push('/login')}, 
        2000)
    } catch {

      // Display error message if failed
      setError('Failed to create an account.')
    }
    
    // Brings back sign-up button
    setLoading(false)
  }

  return (
    <>
      <Card style={{marginTop: "100px"}}>
        <Card.Body>
          <img src={name_logo} style={{width: "100%", height: "auto"}} />
          <h2 className="text-center mb-4" style={{color: "black"}}>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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
            <Form.Group id="password-confirm">
              <Form.Label style={{color: "black"}}>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <br/>
            <Button style={{backgroundColor: "#FE5F55", borderColor: "#FE5F55"}} disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login" style={{color: "#FE5F55"}} >Log In</Link>
      </div>
    </>
  );
};

export default SignUp;
