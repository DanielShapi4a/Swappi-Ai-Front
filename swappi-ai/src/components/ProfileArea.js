import React from 'react';
import { Button, Avatar } from '../assets/styles.js'; 

const ProfileArea = ({ user }) => {
  return (
    <div className="profile-area">
      {user ? (
        <div>
          <Avatar src={user.photoURL} alt="User Avatar" size="48px" marginRight="10px" />
          <span>Welcome, {user.displayName}</span>
          {/* You can add any other profile-related content here */}
        </div>
      ) : (
        <div>
          <Button>Login Here</Button>
        </div>
      )}
    </div>
  );
};

export default ProfileArea;
