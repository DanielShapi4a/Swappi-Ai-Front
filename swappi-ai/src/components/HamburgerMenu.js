import React, { useState } from 'react';


const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="hamburger-menu">
      <img
        src='/assets/images/hamburger-icon.png'
        alt="Hamburger Menu"
        onClick={toggleMenu}
      />
      {menuOpen && (
        <div className="menu-options">
          {/* Add your menu options here */}
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
