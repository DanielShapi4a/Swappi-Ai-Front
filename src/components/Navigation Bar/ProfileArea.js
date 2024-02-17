import React, { useState } from "react";
import { Avatar, StyledButton } from "../../assets/styles.js";
import defaultProfileImage from "../../assets/images/default-profile-image.png";
import LoginModal from "../Login Pop-UP/LoginModal.js";

const ProfileArea = () => {
  const [userData, setUserData] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUserData(userData); // Set user data received from login modal
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogout = () => {
    // Handle logout if needed
    setUserData(null); // Clear user data on logout
  };

  const openLoginModal = () => {
    setLoginModalOpen(true); // Open the login modal
  };

  return (
    <div className="profile-area" style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        src={userData ? userData.avatar || defaultProfileImage : defaultProfileImage}
        alt="User Avatar"
        size="48px"
        marginRight="10px"
      />
      <>
        {userData ? (
          <>
            <span>Welcome, {userData.name}</span>
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
