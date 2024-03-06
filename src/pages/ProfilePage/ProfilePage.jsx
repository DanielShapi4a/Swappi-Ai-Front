import React from 'react';

const ProfilePage = ({ user }) => {
  console.log("UserData is:", user);
  const copyToClipboard = (text) => {
    window.navigator.clipboard?.writeText(text);
    const tipText = 'Text copied';
    alert(tipText); 
  };

  const formatPhone = (value) => {
    return String(value).replace(/(\d{3})(\d{3})(\d{4})/, '+1($1)$2-$3');
  };

  const handleChangePasswordClick = () => {
    
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button className="change-password-button" onClick={handleChangePasswordClick}>
          Change Password
        </button>
      </div>
      <div className="profile-info">
        <div className="profile-section">
          <h2>Basic Info</h2>
          <div className="title-text">{user.name}</div>
          <div className="subtitle-text with-clipboard-copy">
            <span>ID: {user.id}</span>
            <button
              className="copy-clipboard-button"
              onClick={() => copyToClipboard(user.id)}
            >
              Copy
            </button>
          </div>
          <div className="image-wrapper">
            <img src={user.image} alt="User" className="form-photo" />
          </div>
        </div>
        <div className="profile-section">
          <h2>Contact Information</h2>
          <div className="title-text">{formatPhone(user.phone)}</div>
          <div className="subtitle-text with-clipboard-copy">
            {user.email}
            <button
              className="copy-clipboard-button"
              onClick={() => copyToClipboard(user.email)}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="profile-section">
          <h2>Address</h2>
          <div className="title-text">
            {user.address}, {user.city}, {user.state}, {user.country}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
