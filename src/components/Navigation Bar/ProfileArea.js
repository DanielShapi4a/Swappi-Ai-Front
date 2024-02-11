import React, { useState, useEffect } from 'react';
import { Avatar, StyledButton } from '../../assets/styles.js';
import defaultProfileImage from '../../assets/images/default-profile-image.png';
import LoginModal from '../Login Pop-UP/LoginModal.js';
import { getUserById } from '../../services/userData.js'; // Import getUserById function

const ProfileArea = ({ userData }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user data only once when the component mounts
    // No need to fetch user data again as it is received as props
  }, []);

  const handleLoginSuccess = (userData, accessToken, refreshToken) => {
    // Handle login success if needed
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogout = () => {
    // Handle logout if needed
  };

  const openLoginModal = () => {
    setLoginModalOpen(true); // Open the login modal
  };

  return (
    <div className="profile-area" style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar src={userData ? userData.avatar || defaultProfileImage : defaultProfileImage} alt="User Avatar" size="48px" marginRight="10px" />
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
      {/* You can add any other profile-related content here */}
    </div>
  );
};

export default ProfileArea;
