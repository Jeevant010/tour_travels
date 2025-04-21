import React, { useState } from 'react';
import './Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState('flights'); // Default tab

  // Background images for each tab
  const backgroundImages = {
    flights: 'url("../assets/images/flight.jpg")',
    trains: 'url("../assets/images/train.jpg")',
    rentals: 'url("../assets/images/rentals.jpg")',
    taxi: 'url("../assets/images/taxi.jpg")',
    hotels: 'url("../assets/images/hotels.jpg")',
  };

  return (
    <div
      className="home"
      style={{
        backgroundImage: backgroundImages[activeTab], // Dynamically set background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div className="booking-tabs">
        <h2 className="booking-title">Book Your Travel</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </button>
          <button
            className={`tab-button ${activeTab === 'trains' ? 'active' : ''}`}
            onClick={() => setActiveTab('trains')}
          >
            Trains
          </button>
          <button
            className={`tab-button ${activeTab === 'rentals' ? 'active' : ''}`}
            onClick={() => setActiveTab('rentals')}
          >
            Rentals
          </button>
          <button
            className={`tab-button ${activeTab === 'taxi' ? 'active' : ''}`}
            onClick={() => setActiveTab('taxi')}
          >
            Taxi
          </button>
          <button
            className={`tab-button ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hotels
          </button>
        </div>
        <div className="tab-content-container">
          {activeTab === 'flights' && <h3>Flight Booking Form</h3>}
          {activeTab === 'trains' && <h3>Train Booking Form</h3>}
          {activeTab === 'rentals' && <h3>Rental Booking Form</h3>}
          {activeTab === 'taxi' && <h3>Taxi Booking Form</h3>}
          {activeTab === 'hotels' && <h3>Hotel Booking Form</h3>}
        </div>
      </div>
    </div>
  );
}

export default Home;