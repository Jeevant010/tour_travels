import React from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import { CookiesProvider, useCookies } from "react-cookie";

const beforeLogin = () => {
    return (
      <header className="header">
      <div className="logo">
        <h1>EasyTravels.com</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Redirects to Home Page */}
          </li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
          <Link to="/account">My Account</Link>
          </li>
        </ul>
      </nav>
    </header>
    );
}

const afterLogin = () => {
    return (
      <header className="header">
      <div className="logo">
        <h1>EasyTravels.com</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Redirects to Home Page */}
          </li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <Link to="/auth/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
    );
}

function Header() {
    const [cookies] = useCookies(["token"]);

return (
  <CookiesProvider>
    {
      cookies.token ? 
      afterLogin() :
      beforeLogin()
    }
  </CookiesProvider>
    
);
}
export default Header;