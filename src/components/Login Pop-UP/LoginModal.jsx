import React, { useState } from "react";
import { StyledButton } from "../../assets/styles.js";
import "./LoginModal.css"; // Import the CSS file for modal styles
import { Link } from "react-router-dom";
import { loginUser } from "../../services/userData.js"; // Import loginUser function
<<<<<<< HEAD:src/components/Login Pop-UP/LoginModal.js
=======
import { useAuth } from "../../pages/contexts/authContext.js";
>>>>>>> e3dffd06cd5055e1668673bf9ae1a9e13bdab31d:src/components/Login Pop-UP/LoginModal.jsx

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(null);
<<<<<<< HEAD:src/components/Login Pop-UP/LoginModal.js

=======
  const {setUser} = useAuth();
  console.log("@@@@@@@@@@");
  console.log(setUser);
>>>>>>> e3dffd06cd5055e1668673bf9ae1a9e13bdab31d:src/components/Login Pop-UP/LoginModal.jsx
  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError(null);

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    try {
      const result = await loginUser(email, password, setUser); 
      console.log(result);
      if (result.success) {
<<<<<<< HEAD:src/components/Login Pop-UP/LoginModal.js
        onClose(result.user); // Pass user data to the callback function
=======
        const userData = result.user; 
        onClose(userData); 
>>>>>>> e3dffd06cd5055e1668673bf9ae1a9e13bdab31d:src/components/Login Pop-UP/LoginModal.jsx
      } else {
        setLoginError(result.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setLoginError("Unexpected error during login");
    }
  };

  return (
    <div className="login-modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {emailError && <span className="error-message">{emailError}</span>}
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {passwordError && <span className="error-message">{passwordError}</span>}
        <StyledButton onClick={handleLogin}>Login</StyledButton>
        {loginError && <div className="error-message">{loginError}</div>}
        <Link to="/sign-in" style={{ marginTop: "10px", display: "block", textAlign: "center", color: "black" }}>
          Sign-In here!
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
