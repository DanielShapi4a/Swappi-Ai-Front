import React, { useState } from 'react';
import DashboardNav from '../../components/DashBoard/DashboardNav';
import ProfilePage from '../ProfilePage/ProfilePage';
import { AuthContext } from '../contexts/authContext';
import { useAuth } from '../contexts/authContext';

const UserPage = () => {
  const [selectedOption, setSelectedOption] = useState('profile');
  const { user } = useAuth(); 

  return (
    <div className="user-page">
      <div className="dashboard-container">
        <div className="dashboard-nav">
          <DashboardNav setSelectedOption={setSelectedOption} />
        </div>
        <div className="dashboard-content">
            Hi
          {selectedOption === 'profile' && user && <ProfilePage user={user} HI />}




          
          {/* Other DashboardContent components for other options */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
