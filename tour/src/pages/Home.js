import React, { useState } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
import Ourmain from '../hoc/Ourmain';
import { FaPlane, FaTrain, FaHotel, FaTaxi, FaCar, FaUserTie, FaDollarSign, FaHeadset } from 'react-icons/fa';

const cityData = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai",
  "Kolkata", "Ahmedabad", "Pune", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
  "Patna", "Vadodara", "Ludhiana", "Agra", "Varanasi"
];

const hotelData = [
  "Grand Hyatt", "Marriott", "Hilton", "InterContinental",
  "Four Seasons", "Ritz-Carlton", "Sheraton", "Westin"
];

const vehicleTypes = ["Car", "Bike", "Van", "SUV"];

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
    <div className="tab-content">
      <h3>Train Booking</h3>
      <form onSubmit={(e) => handleFormSubmit(e, 'trains', trainForm)}>
        <div className="form-row">
          <div className="form-group relative">
            <label>Departure From:</label>
            <input
              ref={(el) => (inputRefs.current.departureFrom = el)}
              type="text"
              placeholder="Enter departure city"
              value={trainForm.departureFrom}
              onChange={(e) => handleInputChange(e, 'departureFrom', 'trains')}
              onFocus={(e) => handleInputChange(e, 'departureFrom', 'trains')}
              onKeyDown={handleKeyDown}
              required
            />
          </div>

          <div className="form-group relative">
            <label>Going To:</label>
            <input
              ref={(el) => (inputRefs.current.goingTo = el)}
              type="text"
              placeholder="Enter destination city"
              value={trainForm.goingTo}
              onChange={(e) => handleInputChange(e, 'goingTo', 'trains')}
              onFocus={(e) => handleInputChange(e, 'goingTo', 'trains')}
              onKeyDown={handleKeyDown}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Departure Date:</label>
            <input
              type="date"
              value={trainForm.departureDate}
              onChange={handleChange('trains', 'departureDate')}
              required
            />
          </div>

          <div className="form-group">
            <label>AC Type:</label>
            <select
              value={trainForm.acType}
              onChange={handleChange('trains', 'acType')}
            >
              <option value="sleeper">Sleeper</option>
              <option value="ac1">AC 1st Class</option>
              <option value="ac2">AC 2nd Class</option>
              <option value="ac3">AC 3rd Class</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Search Trains
        </button>
      </form>

      {/* Train PNR Button */}
      <div className="train-pnr-button-container">
        <button
          className="train-pnr-button"
          onClick={() => window.location.href = '/trainPnr'} // Redirect to TrainPnr page
        >
          Check Train PNR Status
        </button>
      </div>
    </div>
  );

case 'hotels':
return (
  <div className="tab-content">
    <h3>Hotel Booking</h3>
    <form onSubmit={(e) => handleFormSubmit(e, 'hotels', hotelForm)}>
    <div className="form-row">
      <div className="form-group relative">
        <label>Select City/Location:</label>
        <input
          ref={el => inputRefs.current.location = el}
          type="text"
          placeholder="Enter city or location"
          value={hotelForm.location}
          onChange={(e) => handleInputChange(e, 'location', 'hotels')}
          onFocus={(e) => handleInputChange(e, 'location', 'hotels')}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Check-in Date:</label>
        <input
          type="date"
          value={hotelForm.checkinDate}
          onChange={handleChange('hotels', 'checkinDate')}
          required
        />
      </div>
      </div>

      <div className="form-row">
      <div className="form-group">
        <label>Check-out Date:</label>
        <input
          type="date"
          value={hotelForm.checkoutDate}
          onChange={handleChange('hotels', 'checkoutDate')}
          required
        />
      </div>
      
      <div className="form-group">
        <label>No. of Rooms:</label>
        <input
          type="number"
          min="1"
          value={hotelForm.rooms}
          onChange={handleChange('hotels', 'rooms')}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Guests:</label>
        <input
          type="number"
          min="1"
          value={hotelForm.guests}
          onChange={handleChange('hotels', 'guests')}
          required
        />
      </div>
      </div>
      <button type="submit" className="submit-button">Search Hotels</button>
    </form>
  </div>
);

case 'taxi':
return (
  <div className="tab-content">
    <h3>Taxi Booking</h3>
    <form onSubmit={(e) => handleFormSubmit(e, 'taxi', taxiForm)}>
    <div className="form-row">
      <div className="form-group relative">
        <label>Pick Up Location:</label>
        <input
          ref={el => inputRefs.current.pickupLocation = el}
          type="text"
          placeholder="Enter pick up location"
          value={taxiForm.pickupLocation}
          onChange={(e) => handleInputChange(e, 'pickupLocation', 'taxi')}
          onFocus={(e) => handleInputChange(e, 'pickupLocation', 'taxi')}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      
      <div className="form-group relative">
        <label>Drop Location:</label>
        <input
          ref={el => inputRefs.current.dropLocation = el}
          type="text"
          placeholder="Enter drop location"
          value={taxiForm.dropLocation}
          onChange={(e) => handleInputChange(e, 'dropLocation', 'taxi')}
          onFocus={(e) => handleInputChange(e, 'dropLocation', 'taxi')}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      </div>
      
      <div className="form-row">
      <div className="form-group">
        <label>Pickup Date:</label>
        <input
          type="date"
          value={taxiForm.pickupDate}
          onChange={handleChange('taxi', 'pickupDate')}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Pickup Time:</label>
        <input
          type="time"
          value={taxiForm.pickupTime}
          onChange={handleChange('taxi', 'pickupTime')}
          required
        />
      </div>
      </div>
      <button type="submit" className="submit-button">Search Taxis</button>
    </form>
  </div>
);

case 'rentals':
return (
  <div className="tab-content">
    <h3>Rental Services</h3>
    <form onSubmit={(e) => handleFormSubmit(e, 'rentals', rentalForm)}>
    <div className="form-row">
      <div className="form-group relative">
        <label>State:</label>
        <input
          ref={el => inputRefs.current.state = el}
          type="text"
          placeholder="Enter state"
          value={rentalForm.state}
          onChange={(e) => handleInputChange(e, 'state', 'rentals')}
          onFocus={(e) => handleInputChange(e, 'state', 'rentals')}
          onKeyDown={handleKeyDown}
        />
      </div>
      
      <div className="form-group relative">
        <label>City:</label>
        <input
          ref={el => inputRefs.current.city = el}
          type="text"
          placeholder="Enter city"
          value={rentalForm.city}
          onChange={(e) => handleInputChange(e, 'city', 'rentals')}
          onFocus={(e) => handleInputChange(e, 'city', 'rentals')}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      </div>

      <div className="form-row">
      <div className="form-group">
        <label>Vehicle Type:</label>
        <select
          value={rentalForm.vehicleType}
          onChange={handleChange('rentals', 'vehicleType')}
        >
          {vehicleTypes.map(type => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="form-group">
        <label>Duration (in days):</label>
        <input
          type="number"
          min="1"
          value={rentalForm.duration}
          onChange={handleChange('rentals', 'duration')}
          required
        />
      </div>
      </div>
      
      <div className="form-row">
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={rentalForm.date}
          onChange={handleChange('rentals', 'date')}
          required
        />
      </div>
      
      <div className="form-group relative">
        <label>Location:</label>
        <input
          ref={el => inputRefs.current.location = el}
          type="text"
          placeholder="Enter pickup location"
          value={rentalForm.location}
          onChange={(e) => handleInputChange(e, 'location', 'rentals')}
          onFocus={(e) => handleInputChange(e, 'location', 'rentals')}
          onKeyDown={handleKeyDown}
          required
        />
      </div>
      </div>
      <button type="submit" className="submit-button">Search Rentals</button>
    </form>
  </div>
);

default:
return null;
}
};

 

return (
<div className="home">
<section className="booking-tabs">
<h2>Book Your Travel</h2>
<div className="tabs">
  {['flights', 'trains', 'hotels', 'taxi', 'rentals'].map((tab) => (
    <button
      key={tab}
      className={`tab-button ${activeTab === tab ? 'active' : ''}`}
      onClick={() => {
        setActiveTab(tab);
        setResults(null);
        setShowSuggestions(false);
      }}
    >
      {tab === 'flights' && <FaPlane className="tab-icon" />}
      {tab === 'trains' && <FaTrain className="tab-icon" />}
      {tab === 'hotels' && <FaHotel className="tab-icon" />}
      {tab === 'taxi' && <FaTaxi className="tab-icon" />}
      {tab === 'rentals' && <FaCar className="tab-icon" />}
      {tab.charAt(0).toUpperCase() + tab.slice(1)}
    </button>
  ))}
</div>

<div className="tab-content-container">
  {renderTabContent()}
  
  {showSuggestions && suggestions.length > 0 && (
    <div 
      className="suggestions-container"
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