// LoginModal.js
import React, { useState } from 'react';
import { StyledButton } from '../../assets/styles.js';
import './LoginModal.css'; // Import the CSS file for modal styles
import SignInPage from '../../pages/SignInPage/SignInPage.jsx';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/userData.js'; // Import loginUser function

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Invalid email format');
      return;
    } else {
      setEmailError('');
    }

    // Validate password format (add your own password validation logic if needed)
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    } else {
      setPasswordError('');
    }

    try {
      // Call the loginUser function from userData.js
      const result = await loginUser(email, password);

      console.log("Result Recieved from Back-End ",result);

      if (result.success) {
        console.log('Login successful');
        onClose();
      } else {
        // Handle login failure
        console.error('Login failed:', result.message);
        setLoginError(result.message);
        // You can update the state or display an error message to the user
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setLoginError("Unexpected error during login");
      // Handle unexpected errors during login
      // You can update the state or display an error message to the user
    }
  };

  // Close the modal when clicking outside of it
  const handleModalClick = (e) => {
    e.stopPropagation(); // Prevent the event from reaching the parent div
  };

  // Close the modal when clicking outside of it
  const handleBackgroundClick = () => {
    onClose();
  };

  return (
    <div className="login-modal" onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={handleModalClick}>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <span className="error-message">{emailError}</span>}
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <span className="error-message">{passwordError}</span>}
        <StyledButton onClick={handleLogin}>Login</StyledButton>
        {loginError && <div className='error-message'>{loginError}</div>}
        <Link to="/sign-in" style={{ marginTop: '10px', display: 'block', textAlign: 'center', color: 'black' }}>Sign-In here! </Link>
      </div>
    </div>
  );
};

export default LoginModal;
