import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import TicketDetails from "./components/TicketDetails/TicketDetails.jsx";
import { AuthProvider } from "./pages/contexts/authContext.js";
import UserPage from "./pages/UserPage/UserPage.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/ticket/:id" element={<TicketDetails />} />
            <Route path="/sign-in/" element={<SignInPage />} />
            <Route path="/user/" element={<UserPage />} />
            {/* Add more routes for other pages as needed */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
