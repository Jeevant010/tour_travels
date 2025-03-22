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
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Journey Begins Here</h1>
          <p>Explore the world with Yatra.com - Your trusted travel partner</p>
          <Link to="/explore" className="cta-button">Book Now</Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h2>Our Services</h2>
        <div className="services-grid">
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
      </section>

      {/* Featured Destinations Section */}
      <section className="featured-destinations">
        <h2>Featured Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Paris" />
            <h3>Paris, France</h3>
            <p>The city of love and lights</p>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Tokyo" />
            <h3>Tokyo, Japan</h3>
            <p>Experience the blend of tradition and modernity</p>
          </div>
          <div className="destination-card">
            <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="New York" />
            <h3>New York, USA</h3>
            <p>The city that never sleeps</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-carousel">
          <div className="testimonial-card">
            <p>"Yatra.com made my trip to Bali seamless and unforgettable!"</p>
            <h4>- John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"Amazing service and great deals on flights and hotels."</p>
            <h4>- Jane Smith</h4>
          </div>
          <div className="testimonial-card">
            <p>"Highly recommend Yatra.com for all your travel needs."</p>
            <h4>- Alice Johnson</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Yatra.com is your one-stop solution for all travel needs.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore</Link></li>
              <li><Link to="/flights">Flights</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com">Facebook</a>
              <a href="https://twitter.com">Twitter</a>
              <a href="https://instagram.com">Instagram</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Yatra.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;