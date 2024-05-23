import React, { useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation Bar/Navbar";
import SellForm from "../../components/SellForm/SellForm";
import { useAuth } from "../../pages/contexts/authContext.js";
import { useLocation } from "react-router-dom";
import "./SellsPage.css";

const SellsPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const ticket = location.state || {};
  return (
    <div>
      <div className="sells-page">
        <Navbar />
        <h1>Sells Page</h1>
        <div className="profile-section sells-section">
          {/* Display sells data here */}
          {/* Sell Form */}
          {user ? <SellForm data={ticket}/> : <h3>Please login to view current sells</h3>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellsPage;