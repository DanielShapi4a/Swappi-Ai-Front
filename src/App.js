// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import TicketDetails from "./components/TicketDetails/TicketDetails.jsx";
import { AuthProvider, useAuth } from "./pages/contexts/authContext.js"; // Import useAuth hook
import UserPage from "./pages/UserPage/UserPage.jsx";
import { fetchUserData } from "./services/authService.js";

function App() {
  // const { setUser: setUserState } = useAuth();

  // useEffect(() => {
  //   console.log("starting useEffect loop:");
  //   fetchUserData(setUserState);

  //   // Clean-up function to prevent memory leaks
  //   return () => {
  //     setUserState(null); // Reset user state on unmount
  //   };
  // }, [setUserState]); // Include setUserState in dependency array to ensure effect runs when it changes

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
