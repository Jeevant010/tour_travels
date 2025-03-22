import React from "react";
import { Link } from 'react-router-dom';


const Ourmain = 
    (Component) => 
    ({ ...props }) => {
        return (
            <div>
                <header className="header">
      <div className="logo">
        <h1>Yatra.com</h1>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link> {/* Redirects to Home Page */}
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
    </header>
                <h1>Deepesh header bana</h1>
                <Component {...props} />
                <h1>Abhisekh footer bana</h1>
                <footer>
      <p>&copy; 2025 Tours and Travel. All rights reserved.</p>
      <nav>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </footer>
            </div>
        );
    };

export default Ourmain;