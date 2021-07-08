import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <Button size="lg" className="log" onClick={() => loginWithRedirect()}
            variant="secondary">Log In</Button>
        )
    )
}

export default LoginButton
