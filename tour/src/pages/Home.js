import React, { useState } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
import travelImage from '../assets/images/travel.jpg'; // Import the image
import Ourmain from '../hoc/Ourmain';
// Import Font Awesome icons (if using Font Awesome)
import { FaPlane, FaTrain, FaHotel, FaTaxi, FaCar } from 'react-icons/fa';

function Home() {
  const [activeTab, setActiveTab] = useState('flights');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'flights':
        return (
          <div className="tab-content">
            <h3>Flight Booking</h3>
            <p>Book flights to your favorite destinations.</p>
          </div>
        );
      case 'trains':
        return (
          <div className="tab-content">
            <h3>Train Booking</h3>
            <p>Reserve train tickets for your journey.</p>
          </div>
        );
      case 'hotels':
        return (
          <div className="tab-content">
            <h3>Hotel Booking</h3>
            <p>Find and book the best hotels for your stay.</p>
          </div>
        );
      case 'taxi':
        return (
          <div className="tab-content">
            <h3>Taxi Booking</h3>
            <p>Book a taxi for convenient local travel.</p>
          </div>
        );
      case 'rentals':
        return (
          <div className="tab-content">
            <h3>Rental Services</h3>
            <p>Rent vehicles for your travel needs.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="home">
        {/* Hero Section */}
        <section
          className="hero"
          style={{
            backgroundImage: `url(${travelImage})`, // Use the imported image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="hero-content">
            <h1>Welcome to EasyTravels.com</h1>
            <p>Discover amazing destinations and unforgettable experiences with us.</p>
            <button className="cta-button">Explore Tours</button>
          </div>
        </section>

        {/* Booking Tabs Section */}
        <section className="booking-tabs">
          <h2>Book Your Travel</h2>
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'flights' ? 'active' : ''}`}
              onClick={() => setActiveTab('flights')}
            >
              <FaPlane className="tab-icon" /> Flights
            </button>
            <button
              className={`tab-button ${activeTab === 'trains' ? 'active' : ''}`}
              onClick={() => setActiveTab('trains')}
            >
              <FaTrain className="tab-icon" /> Trains
            </button>
            <button
              className={`tab-button ${activeTab === 'hotels' ? 'active' : ''}`}
              onClick={() => setActiveTab('hotels')}
            >
              <FaHotel className="tab-icon" /> Hotels
            </button>
            <button
              className={`tab-button ${activeTab === 'taxi' ? 'active' : ''}`}
              onClick={() => setActiveTab('taxi')}
            >
              <FaTaxi className="tab-icon" /> Taxi
            </button>
            <button
              className={`tab-button ${activeTab === 'rentals' ? 'active' : ''}`}
              onClick={() => setActiveTab('rentals')}
            >
              <FaCar className="tab-icon" /> Rentals
            </button>
          </div>
          <div className="tab-content-container">{renderTabContent()}</div>
        </section>

        <Explore />

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Expert Guides</h3>
              <p>Our experienced guides ensure you have the best travel experience.</p>
            </div>
            <div className="feature-item">
              <h3>Affordable Packages</h3>
              <p>We offer competitive pricing without compromising on quality.</p>
            </div>
            <div className="feature-item">
              <h3>24/7 Support</h3>
              <p>Our team is here to assist you anytime, anywhere.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Ourmain(Home);