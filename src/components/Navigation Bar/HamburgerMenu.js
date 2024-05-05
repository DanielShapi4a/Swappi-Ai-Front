import React, { useState } from 'react';
import '../../CSS/HamburgerMenu.css'; // Import CSS for styling
import HamburgerIcon from '../../assets/images/hamburger-icon.png';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
      <div className="menu-button" onClick={toggleMenu}>
        <img
          src={HamburgerIcon}
          alt="Hamburger Menu"
        />
      </div>
      <div className={`menu-options ${menuOpen ? 'show' : ''}`} style={{zIndex:'999'}}>
        {/* Add your menu options here */}
        <ul>
          <Link className="menu-item" to={"/user/"}>Profile</Link>
          <Link className="menu-item" to={"/orders/"}>Orders</Link>
          <Link className="menu-item" to={"/sells/"}>Sells</Link>

        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
