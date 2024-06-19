import React, { useState } from "react";
import { StyledButton } from "../../assets/styles.js";
import { registerUser } from "../../services/userData.js";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

// The code in SignInPage.jsx defines a React component for a sign-in page.
// Users can input their email, username, password, confirm password, and phone number.
// It includes error handling for password mismatch and unexpected errors during sign-in.
// Upon successful sign-in, users are redirected to the home page.

const SignInPage = ({ setUserData }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signInError, setSignInError] = useState("");

  const handleSignIn = async () => {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setSignInError("Passwords do not match");
      return;
    }

    try {
      const userData = {
        email: email,
        name: username,
        password: password,
        phoneNumber: phoneNumber,
      };

      const result = await registerUser(userData);
      // Check if sign-in was successful
      if (result.status === 201) {
        setTimeout(() => {
          navigate("/");
          setSignInError("");
        }, 2000);
      } else {
        // Handle sign-in error
        setSignInError(result.message || "Sign-in failed");
      }
    } catch (error) {
      setSignInError("Unexpected error during sign-in. Please try again");
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
