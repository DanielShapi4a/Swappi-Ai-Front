import React, { useState } from 'react';
import HamburgerMenu from './HamburgerMenu';
import ProfileArea from './ProfileArea';
import { searchTicket } from '../../services/productData';
import '../../CSS/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userData }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if(event.key === 'Enter'){
      try{
        if(searchValue) {
          const results = await searchTicket(searchValue);
          if (results && results.length > 0) {
          navigate("/search/", {state: {results}});
          }
        }
      }catch(error){
        console.log("Error searching tickets", error);
      }
    }
  };

  return (
    <div className="navbar">
      <div className="left-section">
        <HamburgerMenu />
      </div>
      <div className={`middle-section ${searchFocused ? 'focused' : ''}`}>
        <input
          className={`search-bar ${searchFocused ? 'focused' : ''}`}
          type="text"
          placeholder="Search..."
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          value={searchValue}
        />
      </div>
      <div className="right-section">
        <ProfileArea userData={userData} />
      </div>
    </div>
  );
};

export default Navbar;
