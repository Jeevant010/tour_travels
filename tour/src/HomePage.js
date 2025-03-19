// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-logo">Yatra.com</div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/flights">Flights</Link></li>
          <li><Link to="/hotels">Hotels</Link></li>
          <li><Link to="/trains">Trains</Link></li>
          <li><Link to="/taxis">Taxis</Link></li>
          <li><Link to="/rentals">Rentals</Link></li>
          <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="header">
        <h1>Welcome to Yatra.com</h1>
        <p>Your one-stop solution for all travel needs</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for destinations, hotels, flights..." />
          <button>Search</button>
        </div>
      </header>

      {/* Services Section */}
      <div className="services">
        <div className="service-card" onClick={() => alert('Explore clicked!')}>
          <h2>Explore</h2>
          <p>Discover new destinations and plan your trip</p>
        </div>

        <div className="service-card" onClick={() => alert('Flight Booking clicked!')}>
          <h2>Flight Booking</h2>
          <p>Book your flight to any destination</p>
        </div>

        <div className="service-card" onClick={() => alert('Hotel Booking clicked!')}>
          <h2>Hotel Booking</h2>
          <p>Find the best hotels for your stay</p>
        </div>

        <div className="service-card" onClick={() => alert('Train Booking clicked!')}>
          <h2>Train Booking</h2>
          <p>Book train tickets for your journey</p>
        </div>

        <div className="service-card" onClick={() => alert('Taxi Booking clicked!')}>
          <h2>Taxi Booking</h2>
          <p>Book a taxi for local travel</p>
        </div>

        <div className="service-card" onClick={() => alert('Rent Service clicked!')}>
          <h2>Rent Service</h2>
          <p>Rent cars, bikes, and more for your trip</p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2023 Yatra.com. All rights reserved.</p>
        <ul className="footer-links">
          <li><Link to="/privacy">Privacy Policy</Link></li>
          <li><Link to="/terms">Terms of Service</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;