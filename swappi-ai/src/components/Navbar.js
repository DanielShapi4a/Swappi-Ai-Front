import React from 'react';
import HamburgerMenu from './HamburgerMenu';
import SearchBar from './SearchBar';
import ProfileArea from './ProfileArea';
import '../CSS/Navbar.css'

const Navbar = () => {
  return (
    <div className="navbar" >
      <div className="left-section">
        <HamburgerMenu />
      </div>
      <div className="middle-section">
        <SearchBar />
      </div>
      <div className="right-section">
        <ProfileArea />
      </div>
    </div>
  );
};

export default Navbar;
