// DashboardContent.js
import React from "react";
import "./DashboardContent.css";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import OrdersPage from "../../pages/OrdersPage/OrdersPage";
import SellsPage from "../../pages/SellsPage/SellsPage";

const DashboardContent = ({ selectedOption }) => {
  switch (selectedOption) {
    case "profile":
      return <ProfilePage />;
    case "orders":
      return <OrdersPage />;
    case "sells":
      return <SellsPage />;
    default:
      return null;
  }
};

export default DashboardContent;
