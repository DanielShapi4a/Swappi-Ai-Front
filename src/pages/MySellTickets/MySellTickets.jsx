import React,{ useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation Bar/Navbar";
import { useAuth } from "../../pages/contexts/authContext.js";
import "./MySellTickets.css";
import CurrentUserSells from "../../components/CurrentUserSells/CurrentUserSells.jsx";

const MySellTickets = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="MySellTickets">
        <Navbar />
        <h1>My Tickets for Sell Page</h1>
        <div className="sells-section">
          <h3>Current Sells</h3>
          {/* Display sells data here */}
          {/* Sell Form */}
          {user ? <CurrentUserSells /> : <h3>Please login to view current sells</h3>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MySellTickets;