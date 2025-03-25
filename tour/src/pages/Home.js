import React, { useState } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
<<<<<<< HEAD
import flightImage from '../assets/images/flight.jpg'; // Import the flight image

const tabs = [
  { id: "flights", label: "Flights", icon: "✈️" },
  { id: "hotels", label: "Hotels", icon: "🏨" },
  { id: "holidays", label: "Holidays", icon: "🌴" },
  { id: "bus", label: "Bus", icon: "🚌" },
  { id: "trains", label: "Trains", icon: "🚆" },
  { id: "cabs", label: "Cabs", icon: "🚖" },
];

const BookingSection = () => {
  const [activeTab, setActiveTab] = useState("flights");

  // Determine the background image based on the active tab
  const backgroundImage = activeTab === "flights" ? flightImage : "none";

  return (
    <section
      className="booking-section"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Dynamically set the background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2>Book Your Travel</h2>
      <div className="tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="icon">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "flights" && <p>Book flights to your favorite destinations.</p>}
        {activeTab === "hotels" && <p>Find and book the best hotels for your stay.</p>}
        {activeTab === "holidays" && <p>Plan your dream holidays with us.</p>}
        {activeTab === "bus" && <p>Reserve bus tickets for your journey.</p>}
        {activeTab === "trains" && <p>Book train tickets for your travel needs.</p>}
        {activeTab === "cabs" && <p>Book a cab for convenient local travel.</p>}
      </div>
    </section>
  );
};

function Home() {
=======
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

>>>>>>> d79997d4994f92696ec76412de21970aadc6eff9
  return (
    <>
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to EasyTravels.com</h1>
            <p>Discover amazing destinations and unforgettable experiences with us.</p>
            <button className="cta-button">Explore Tours</button>
          </div>
        </section>

<<<<<<< HEAD
        {/* Booking Links Section */}
        <BookingSection />
=======
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
>>>>>>> d79997d4994f92696ec76412de21970aadc6eff9

        {/* Explore Section */}
        <Explore />

        {/* Features Section */}
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