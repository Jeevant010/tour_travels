import React, { useState } from 'react';
import './Home.css';
import Header from '../Components/Header';
import Explore from '../Components/Explore';
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
  return (
    <>
      <Header />
      <div className="home">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Yatra.com</h1>
            <p>Discover amazing destinations and unforgettable experiences with us.</p>
            <button className="cta-button">Explore Tours</button>
          </div>
        </section>

        {/* Booking Links Section */}
        <BookingSection />

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

export default Home;