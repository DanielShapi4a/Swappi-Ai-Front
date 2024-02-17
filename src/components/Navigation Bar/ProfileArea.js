import React, { useEffect, useState } from "react";
import { Avatar, StyledButton } from "../../assets/styles.js";
import defaultProfileImage from "../../assets/images/default-profile-image.png";
import LoginModal from "../Login Pop-UP/LoginModal.js";
import { useAuth } from "../../pages/contexts/authContext.js";

const ProfileArea = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const { user, setUser } = useAuth();

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogout = () => {
    // Handle logout if needed
    setUser(null);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true); // Open the login modal
  };

  return (
    <div className="profile-area" style={{ display: "flex", alignItems: "center" }}>
      <Avatar
        src={user ? user.avatar || defaultProfileImage : defaultProfileImage}
        alt="User Avatar"
        size="48px"
        marginRight="10px"
      />
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
