import React from 'react';
import logo from '../images/mesto.png';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
    </header>
  );
}
  
export default Header;