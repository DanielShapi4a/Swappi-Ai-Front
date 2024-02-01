// LoginModal.js

import React from 'react';
import { Link } from 'react-router-dom';
import { StyledButton } from '../../assets/styles.js';
import SignInPage from '../../pages/SignInPage/SignInPage.jsx';

const LoginModal = ({ onClose, setUserData }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

    // Implement your login logic using the loginUser function from userData.js
    const result = await loginUser(email, password);

    // Check if login was successful
    if (result.success) {
      // Fetch user details after successful login
      const userResult = await getUser();

      if (userResult.success) {
        // Update user details in the state or Redux store
        setUserData(userResult.user);

        // Close the modal after successful login
        onClose();
      } else {
        // Handle error fetching user details
        console.error('Error fetching user details:', userResult.message);
      }
    } else {
      // Handle login error
      console.error('Login failed:', result.message);
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
        <Link to="/sign-in" style={{ marginTop: '10px', display: 'block', textAlign: 'center', color: 'blue' }}>
          Sign-In here!
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
