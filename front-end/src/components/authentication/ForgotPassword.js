import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

/**
 * Screen that allows the user to enter their account email and receive a password reset 
 * email from Firebase. Generates a confirmation message if successful, or an error message 
 * if an error has occurred.
 * 
 * @returns JSX elements
 */
const ForgotPassword = () => {
  // State for password input
  const emailRef = useRef();

  // Reset password function
  const { resetpassword } = useAuth();

  // Error message state
  const [error, setError] = useState('');

  // Success message state
  const [message, setMessage] = useState('');

  // Display reset-password button state
  const [loading, setLoading] = useState(false);

  // Handles the functionality of the submit button
  async function handleSubmit(e) {

    // Prevents default anchor functionality
    e.preventDefault();

    try {
      // Reset error and confirmation message to blank if clicked
      setMessage('')
      setError('')
      setLoading(true)

      // Submits reset-password request to firebase and displays confirmation message
      await resetpassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions.")
    } catch {
      setError('Failed to reset password.')
    }
    // Brings the reset-password button back
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{color: "black"}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
      <div className="w-100 text-center mt-3">
        <Link to="/login">Login</Link>
      </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
