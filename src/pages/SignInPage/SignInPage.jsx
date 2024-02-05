// SignInPage.js
import React, { useState } from 'react';
import { StyledButton } from '../../assets/styles.js';
import { registerUser } from '../../services/userData.js';
import './SignInPage.css';

const SignInPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Implement your sign-in logic using the registerUser function from userData.js
    const result = await registerUser({ email, username, password });

    // Check if sign-in was successful
    if (result.success) {
      // Redirect to the main page after successful sign-in
      history.push('/');
    } else {
      // Handle sign-in error
      console.error('Sign-in failed:', result.message);
    }
  };

  return (
    <div>
      <div className="sign-in-page">
        <div className="sign-in-form">
          <h2>Sign-In Page</h2>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <StyledButton onClick={handleSignIn}>Sign-In</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
