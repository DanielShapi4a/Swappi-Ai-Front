import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { editUserProfile } from "../../services/userData";
import Navbar from "../../components/Navigation Bar/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../contexts/authContext";

const EditableField = ({ label, value, name, type, onChange }) => (
  <div className="edit-input">
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} />
  </div>
);

const EditButtons = ({ onSave, onCancel }) => (
  <div className="edit-buttons">
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

const EditForm = ({ user, onSave, onCancel, onChange }) => (
  <div className="edit-form">
    <EditableField label="Name" value={user.name} name="name" type="text" onChange={onChange} />
    <EditableField label="Gender" value={user.gender} name="gender" type="select" onChange={onChange} />
    <EditableField label="Phone Number" value={user.phoneNumber} name="phoneNumber" type="text" onChange={onChange} />
    <EditableField label="Email" value={user.email} name="email" type="email" onChange={onChange} />
    <EditableField label="Password" value={user.password} name="password" type="password" onChange={onChange} />
    <EditButtons onSave={onSave} onCancel={onCancel} />
  </div>
);

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showAvatarInput, setShowAvatarInput] = useState(false); // State to manage avatar input visibility

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await editUserProfile(editedUser._id, editedUser);
      console.log("User profile updated successfully:", response);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowAvatarInput(true); // Show avatar input when editing starts
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
    setShowAvatarInput(false); // Hide avatar input when editing is canceled
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
  
    try {
      const response = await editUserProfile(user._id, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      console.log("Avatar updated successfully:", response);
      setUser({ ...user, avatar: response.data.avatar });
      setEditedUser({ ...editedUser, avatar: response.data.avatar });
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          {user && editedUser && (
            <div className="avatar-section">
              {/* Avatar display and change option */}
              <img src={editedUser.avatar} alt="Avatar" className="avatar-image" />
              {showAvatarInput && ( // Show avatar input only when showAvatarInput state is true
                <div>
                  <label className="change-avatar-btn" htmlFor="avatarInput">Change Avatar</label>
                  <input type="file" id="avatarInput" style={{ display: "none" }} onChange={handleAvatarChange} />
                </div>
              )}
            </div>
          )}
          <h2>Welcome, {user ? (editedUser ? editedUser.name : "Guest") : "Guest"}</h2>
        </div>
        <div className="profile-section user-data-section">
          <h3>User Data</h3>
          {user && editedUser ? (
            isEditing ? (
              <EditForm user={editedUser} onSave={handleSave} onCancel={handleCancel} onChange={handleChange} />
            ) : (
              <div className="data-item">
                <p>
                  <strong>Name:</strong> {editedUser.name}
                </p>
                <p>
                  <strong>Gender:</strong> {editedUser.gender}
                </p>
                <p>
                  <strong>Phone Number:</strong> {editedUser.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {editedUser.email}
                </p>
                <p>
                  <strong>Password:</strong> *********
                </p>
                <button className="edit-button" onClick={handleEdit}>Edit User</button>
              </div>
            )
          ) : (
            <div>
              Please login to view user data.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
