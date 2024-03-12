import React, { useState } from 'react';
import './ProfilePage.css'; // Import CSS file for ProfilePage styling

// EditableField component for input fields
const EditableField = ({ label, value, name, type, onChange }) => (
  <div className="edit-input">
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

// EditButtons component for save and cancel buttons
const EditButtons = ({ onSave, onCancel }) => (
  <div className="edit-buttons">
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

// EditForm component for the entire edit form
const EditForm = ({ user, onSave, onCancel, onChange }) => (
  <div className="edit-form">
    <EditableField label="Gender" value={user.gender} name="gender" type="select" onChange={onChange} />
    <EditableField label="Phone Number" value={user.phoneNumber} name="phoneNumber" type="text" onChange={onChange} />
    <EditableField label="Email" value={user.email} name="email" type="email" onChange={onChange} />
    <EditableField label="Password" value={user.password} name="password" type="password" onChange={onChange} />
    <EditButtons onSave={onSave} onCancel={onCancel} />
  </div>
);

const ProfilePage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save action, e.g., update user data in the database
    console.log("Edited user data:", editedUser);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-section">
          {/* Avatar display and change option */}
          <img src={editedUser.avatar} alt="Avatar" className="avatar-image" />
          <button className="change-avatar-btn">Change Avatar</button>
        </div>
        <h2>Welcome, {editedUser.name}</h2>
      </div>
      <div className="profile-section user-data-section">
        <h3>User Data</h3>
        {isEditing ? (
          <EditForm user={editedUser} onSave={handleSave} onCancel={handleCancel} onChange={handleChange} />
        ) : (
          <div className="data-item">
            <p><strong>Gender:</strong> {editedUser.gender}</p>
            <p><strong>Phone Number:</strong> {editedUser.phoneNumber}</p>
            <p><strong>Email:</strong> {editedUser.email}</p>
            <p><strong>Password:</strong> *********</p>
            <button onClick={handleEdit}>Edit User</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
