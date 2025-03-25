import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
return (
    <header className="header">
      <div className="logo">
        <h1>EasyTravels.com</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
);
}
export default Header;