import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '../assets/styles.js'; 
import defaultProfileImage from '../assets/images/default-profile-image.png';

const ProfileArea = ({ user }) => {
  // State to hold the user data
  const [userData, setUserData] = useState(user);

  // useEffect to update the user data when the user prop changes (i.e., when a user logs in)
  useEffect(() => {
    setUserData(user);
  }, [user]);

  return (
    <div className="profile-area">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={userData ? userData.photoURL || defaultProfileImage : defaultProfileImage} alt="User Avatar" size="48px" marginRight="10px" />
        {userData ? (
          <span>Welcome, {userData.displayName}</span>
        ) : (
          <div>
            <span>Welcome</span>
            <Button>Login Here</Button>
          </div>
        )}
        {/* You can add any other profile-related content here */}
      </div>
    </div>
  );
};

export default ProfileArea;
