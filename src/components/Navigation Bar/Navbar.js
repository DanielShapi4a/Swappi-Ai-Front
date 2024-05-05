import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import ProfileArea from './ProfileArea';
import '../../CSS/Navbar.css';

const Navbar = ({ userData }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Perform search action with the current search value
    console.log("Search value:", search);
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <HamburgerMenu />
      </div>
      <div className={`middle-section ${isSearchFocused ? 'focused' : ''}`}>
        <input
          className={`search-bar ${isSearchFocused ? 'focused' : ''}`}
          type="text"
          placeholder="Search.."
          value={search}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          onChange={handleSearchChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
        />
      </div>
      <div className="right-section">
        <ProfileArea userData={userData} />
      </div>
    </div>
  );
};

export default Navbar;
