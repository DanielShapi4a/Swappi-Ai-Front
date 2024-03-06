// DashboardNav.js
import React from 'react';
import './DashboardNav.css';

const DashboardNav = ({ setSelectedOption }) => {
  return (
    <div className="dashboard-navigation">
      <a onClick={() => setSelectedOption('profile')}>
        Profile
      </a>
      <a onClick={() => setSelectedOption('orders')}>
        Orders
      </a>
      <a onClick={() => setSelectedOption('sells')}>
        Sells
      </a>
    </div>
  );
};

export default DashboardNav;
