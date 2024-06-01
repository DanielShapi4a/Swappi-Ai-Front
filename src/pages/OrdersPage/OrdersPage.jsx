import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation Bar/Navbar";
import { useAuth } from "../../pages/contexts/authContext.js";
import "./OrdersPage.css";
import CurrentUserOrders from "../../components/CurrentUserOrders/CurrentUserOrders.jsx";
// representing the sells page encapsulating the SellForm component.

const OrdersPage = () => {
  const {user} = useAuth();
  return (
    <div>
      <div className="orders-page">
        <Navbar />
        <h1>My Ordered Tickets</h1>
        <div className="orders-section">
          {/* Display orders data here */}
          {/* Sell Form */}
          {user ? <CurrentUserOrders /> : <h3>Please login to view current orders</h3>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrdersPage;