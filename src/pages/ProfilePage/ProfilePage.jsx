import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { editUserProfile } from "../../services/userData";
import Navbar from "../../components/Navigation Bar/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

// ProfilePage Component: This component renders the user's profile data and provides options to edit the profile information,
// including the name, gender, phone number, email, and password. Users can also change their avatar image. 
// The site renders dynamicly apon selected the edit option, meaning we render different componenets dipending on the users selection.


const EditableField = ({ label, value, name, type, onChange }) => (
  <div className="edit-input">
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} />
  </div>
);

const EditButtons = ({ onSave, onCancel }) => (
  <div className="edit-buttons">
    <button onClick={onSave}>Save</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

const EditForm = ({ user, onSave, onCancel, onChange, showPasswordFields, onTogglePasswordEdit }) => (
  <div className="edit-form">
    <EditableField label="Name" value={user.name} name="name" type="text" onChange={onChange} />
    <EditableField label="Gender" value={user.gender} name="gender" type="select" onChange={onChange} />
    <EditableField label="Phone Number" value={user.phoneNumber} name="phoneNumber" type="text" onChange={onChange} />
    <EditableField label="Email" value={user.email} name="email" type="email" onChange={onChange} />
    {showPasswordFields && (
      <>
        <EditableField label="Current Password" value={user.currentPassword || ''} name="currentPassword" type="password" onChange={onChange} />
        <EditableField label="New Password" value={user.newPassword || ''} name="newPassword" type="password" onChange={onChange} />
        <EditableField label="Confirm New Password" value={user.confirmNewPassword || ''} name="confirmNewPassword" type="password" onChange={onChange} />
      </>
    )}
    <div>
      <button className="password-edit-button" onClick={onTogglePasswordEdit}>{showPasswordFields ? 'Hide Password Fields' : 'Edit Password'}</button>
    </div>
    <EditButtons onSave={onSave} onCancel={onCancel} />
  </div>
);

const ProfilePage = () => {
  const navigate =  useNavigate();
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showAvatarInput, setShowAvatarInput] = useState(false); // State to manage avatar input visibility
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (name, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      let userDataToSend = { ...editedUser };
      if (editedUser.newPassword && editedUser.confirmNewPassword) {
        userDataToSend = {
          ...userDataToSend,
          currentPassword: editedUser.currentPassword,
          newPassword: editedUser.newPassword,
          confirmNewPassword: editedUser.confirmNewPassword
        };
      } else {
        // If new password and confirm password are empty, send the data with the current password
        delete userDataToSend.newPassword;
        delete userDataToSend.confirmNewPassword;
      }
      await editUserProfile(editedUser._id, userDataToSend);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
    setIsEditing(false);
    setShowPasswordFields(false);
  };
  

  const handleEdit = () => {
    setIsEditing(true);
    setShowAvatarInput(true); // Show avatar input when editing starts
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({ ...user });
    setShowAvatarInput(false); // Hide avatar input when editing is canceled
    setShowPasswordFields(false);
  };

  const handleAvatarChange = async (e) => {
    // using a FormData to manage the data we move with the file to change the avatar icon, however this isnt implemented yet.
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await editUserProfile(user._id, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUser({ ...user, avatar: response.data.avatar });
      setEditedUser({ ...editedUser, avatar: response.data.avatar });
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  const handleTogglePasswordEdit = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <div>
      <Navbar />
      {user ? <> 
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
              <EditForm
                user={editedUser}
                onSave={handleSave}
                onCancel={handleCancel}
                onChange={handleChange}
                showPasswordFields={showPasswordFields}
                onTogglePasswordEdit={handleTogglePasswordEdit}
              />
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
                {showPasswordFields ? (
                  <p>
                    <strong>Password:</strong> *********
                  </p>
                ) : (
                  <button className="edit-button" onClick={handleEdit}>Edit User</button>
                )}
                {showPasswordFields && (
                  <div>
                    <button className="password-edit-button" onClick={handleTogglePasswordEdit}>Hide Password Fields</button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div>
              Please login to view user data.
            </div>
          )}
        </div>
      </div>
      </> : navigate("/")}
      <Footer />
    </div>
  );
};

export default ProfilePage;

