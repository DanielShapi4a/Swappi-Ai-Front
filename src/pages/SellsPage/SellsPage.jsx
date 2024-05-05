import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navigation Bar/Navbar";
import "./SellsPage.css";

const SellsPage = () => {
  return (
    <div>
      <div className="sells-page">
        <Navbar/>
        <h1>Sells Page</h1>
        <div className="profile-section sells-section">
          {/* Current sells display */}
          <h3>Current Sells</h3>
          {/* Display sells data here */}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SellsPage;
