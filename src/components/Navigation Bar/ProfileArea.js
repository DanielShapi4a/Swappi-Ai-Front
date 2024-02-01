import React, { useState, useEffect } from 'react';
import { Avatar, StyledButton } from '../../assets/styles.js';
import defaultProfileImage from '../../assets/images/default-profile-image.png';
import { getUser } from '../../services/userData.js';

const ProfileArea = ({ setUserData }) => {
  const [userData, setUserDataLocal] = useState(null);

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const userResult = await getUser();

    if (userResult.success) {
      // Update user details in the state or Redux store
      setUserDataLocal(userResult.user);
      setUserData(userResult.user);
    } else {
      // Handle error fetching user details
      console.error('Error fetching user details:', userResult.message);
    }
  };

  const handleLogout = () => {
    // Clear user data when logging out
    setUserDataLocal(null);
    setUserData(null); // Assuming setUserData is a function to update the user data in your state or Redux store
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
            <StyledButton>Login Here</StyledButton>
          </>
        )}
      </>
      {/* You can add any other profile-related content here */}
    </div>
  );
};

export default ProfileArea;
