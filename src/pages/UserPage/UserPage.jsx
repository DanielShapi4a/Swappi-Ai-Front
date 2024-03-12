import React, { useState } from 'react';
import DashboardNav from '../../components/DashBoard/DashboardNav';
import ProfilePage from '../ProfilePage/ProfilePage';
import OrdersPage from '../OrdersPage/OrdersPage'; // Import the OrdersPage component
import { AuthContext } from '../contexts/authContext';
import { useAuth } from '../contexts/authContext';
import Navbar from "../../components/Navigation Bar/Navbar";

const UserPage = () => {
  const [selectedOption, setSelectedOption] = useState('profile');
  const { user } = useAuth(); 

  return (
    <div className="user-page">
      <Navbar userData={user} style={{ marginBottom: "100px" }} /> 
      <div className="dashboard-container">
        <div className="dashboard-nav">
          <DashboardNav setSelectedOption={setSelectedOption} />
        </div>
        <div className="dashboard-content">
          {selectedOption === 'profile' && user && <ProfilePage user={user}/>}
          {selectedOption === 'orders' && <OrdersPage />} 
          {/* Other DashboardContent components for other options */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
