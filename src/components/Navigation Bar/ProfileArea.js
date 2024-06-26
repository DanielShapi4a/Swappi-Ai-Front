import React, { useState } from "react";
import { Avatar, StyledButton } from "../../assets/styles.js";
import defaultProfileImage from "../../assets/images/default-profile-image.png";
import LoginModal from "../Login Pop-UP/LoginModal.jsx";
import { useAuth } from "../../pages/contexts/authContext.js";
import axios from "axios";
import { API_URL } from "../../services/constants.js";

const ProfileArea = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user, setUser } = useAuth();

  const handleLoginSuccess = (userData) => {
    if (userData._id) {
      setUser(userData);
    }
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openLoginModal = () => {
    setLoginModalOpen(true); // Open the login modal
  };

  return (
    <div className="profile-area" style={{ display: "flex", alignItems: "center" }}>
      <Avatar src={user ? user.avatar || defaultProfileImage : defaultProfileImage} alt="User Avatar" size="48px" />
      <>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <StyledButton onClick={handleLogout}>Logout</StyledButton>
          </>
        ) : (
          <>
            <span>Welcome</span>
            <StyledButton onClick={openLoginModal}>Login Here</StyledButton>
            {isLoginModalOpen && <LoginModal onClose={handleLoginSuccess} />}
          </>
        )}
      </>
    </div>
  );
};

export default ProfileArea;
