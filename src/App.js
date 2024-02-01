import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import TicketDetails from './components/TicketDetails/TicketDetails.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/ticket/:id" element={<TicketDetails />} />
          <Route path="/sign-in/" element={<SignInPage />} />
          {/* Add more routes for other pages as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
