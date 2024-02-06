// SignInPage.jsx
import React, { useState } from 'react';
import { StyledButton } from '../../assets/styles.js';
import { registerUser } from '../../services/userData.js';
import './SignInPage.css';

const SignInPage = ({ history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signInError, setSignInError] = useState('');

  const handleSignIn = async () => {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setSignInError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        email: email,
        name: username,
        password: password,
        phoneNumber: phoneNumber, // Include the phoneNumber field
      };

      const result = await registerUser(userData);

      // Check if sign-in was successful
      if (result.success) {
        // Redirect to the main page after successful sign-in
        history.push('/');
      } else {
        // Handle sign-in error
        setSignInError(result.message || 'Sign-in failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      setSignInError('Unexpected error during sign-in');
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
          <label>Confirm Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <label>Phone Number:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {signInError && <span className="error-message">{signInError}</span>}
          <StyledButton onClick={handleSignIn}>Sign-In</StyledButton>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
