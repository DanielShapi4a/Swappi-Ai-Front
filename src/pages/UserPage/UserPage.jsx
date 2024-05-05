import React, { useState } from "react";
import ProfilePage from "../ProfilePage/ProfilePage";
import OrdersPage from "../OrdersPage/OrdersPage"; // Import the OrdersPage component
import { useAuth } from "../contexts/authContext";
import Navbar from "../../components/Navigation Bar/Navbar";
import Footer from "../../components/Footer";

const UserPage = () => {
  const [selectedOption] = useState("profile");
  const { user } = useAuth();

  return (
    <div className="user-page">
      <Navbar userData={user} style={{ marginBottom: "100px" }} />
        <div className="dashboard-nav">
        <div className="dashboard-content">
          {selectedOption === "profile" && user && <ProfilePage user={user} />}
          {selectedOption === "orders" && <OrdersPage />}
          {/* Other DashboardContent components for other options */}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserPage;
