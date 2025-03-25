import React, { useState } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
import News from '../Components/News';
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
            <h3 className="flight-booking-title">Flight Booking</h3>
            <form className="flight-booking-form">
              <div className="form-group">
                <label htmlFor="departure-from">Departure From:</label>
                <input type="text" id="departure-from" placeholder="Enter departure city" />
              </div>
              <div className="form-group">
                <label htmlFor="going-to">Going To:</label>
                <input type="text" id="going-to" placeholder="Enter destination city" />
              </div>
              <div className="form-group">
                <label htmlFor="departure-date">Departure Date:</label>
                <input type="date" id="departure-date" />
              </div>
              <div className="form-group">
                <label htmlFor="return-date">Return Date:</label>
                <input type="date" id="return-date" />
              </div>
              <div className="form-group">
                <label htmlFor="travelers">Travelers:</label>
                <input type="number" id="travelers" min="1" placeholder="Number of travelers" />
              </div>
              <div className="form-group">
                <label htmlFor="class">Class:</label>
                <select id="class">
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Search Flights</button>
            </form>
          </div>
        );
      case 'trains':
        return (
          <div className="tab-content">
            <h3 className="train-booking-title">Train Booking</h3>
            <form className="train-booking-form">
              <div className="form-group">
                <label htmlFor="train-departure-from">Departure From:</label>
                <input type="text" id="train-departure-from" placeholder="Enter departure city" />
              </div>
              <div className="form-group">
                <label htmlFor="train-going-to">Going To:</label>
                <input type="text" id="train-going-to" placeholder="Enter destination city" />
              </div>
              <div className="form-group">
                <label htmlFor="train-departure-date">Departure Date:</label>
                <input type="date" id="train-departure-date" />
              </div>
              <div className="form-group">
                <label htmlFor="train-ac-type">AC Type:</label>
                <select id="train-ac-type">
                  <option value="sleeper">Sleeper</option>
                  <option value="ac1">AC 1st Class</option>
                  <option value="ac2">AC 2nd Class</option>
                  <option value="ac3">AC 3rd Class</option>
                </select>
              </div>
              <button type="submit" className="submit-button">Search Trains</button>
            </form>
          </div>
        );
      case 'hotels':
        return (
          <div className="tab-content">
            <h3 className="hotel-booking-title">Hotel Booking</h3>
            <form className="hotel-booking-form">
              <div className="form-group">
                <label htmlFor="hotel-location">Select City/Location:</label>
                <input type="text" id="hotel-location" placeholder="Enter city or location" />
              </div>
              <div className="form-group">
                <label htmlFor="hotel-checkin-date">Check-in Date:</label>
                <input type="date" id="hotel-checkin-date" />
              </div>
              <div className="form-group">
                <label htmlFor="hotel-checkout-date">Check-out Date:</label>
                <input type="date" id="hotel-checkout-date" />
              </div>
              <div className="form-group">
                <label htmlFor="hotel-rooms">No. of Rooms:</label>
                <input type="number" id="hotel-rooms" min="1" placeholder="Enter number of rooms" />
              </div>
              <div className="form-group">
                <label htmlFor="hotel-guests">Guests:</label>
                <input type="number" id="hotel-guests" min="1" placeholder="Enter number of guests" />
              </div>
              <button type="submit" className="submit-button">Search Hotels</button>
            </form>
          </div>
        );
      case 'taxi':
        return (
          <div className="tab-content">
            <h3 className="taxi-booking-title">Taxi Booking</h3>
            <form className="taxi-booking-form">
              <div className="form-group">
                <label htmlFor="pickup-location">Pick Up Location:</label>
                <input type="text" id="pickup-location" placeholder="Enter pick up location" />
              </div>
              <div className="form-group">
                <label htmlFor="drop-location">Drop Location:</label>
                <input type="text" id="drop-location" placeholder="Enter drop location" />
              </div>
              <div className="form-group">
                <label htmlFor="pickup-date">Pickup Date:</label>
                <input type="date" id="pickup-date" />
              </div>
              <div className="form-group">
                <label htmlFor="pickup-time">Pickup Time:</label>
                <input type="time" id="pickup-time" />
              </div>
              <button type="submit" className="submit-button">Search Taxis</button>
            </form>
          </div>
        );
      case 'rentals':
        return (
          <div className="tab-content">
            <h3 className="rental-booking-title">Rental Services</h3>
            <form className="rental-booking-form">
              <div className="form-group">
                <label htmlFor="rental-state">State:</label>
                <input type="text" id="rental-state" placeholder="Enter state" />
              </div>
              <div className="form-group">
                <label htmlFor="rental-city">City:</label>
                <input type="text" id="rental-city" placeholder="Enter city" />
              </div>
              <div className="form-group">
                <label htmlFor="rental-vehicle-type">Vehicle Type:</label>
                <select id="rental-vehicle-type">
                  <option value="car">Car</option>
                  <option value="bike">Bike</option>
                  <option value="van">Van</option>
                  <option value="suv">SUV</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="rental-duration">Duration (in days):</label>
                <input type="number" id="rental-duration" min="1" placeholder="Enter duration" />
              </div>
              <div className="form-group">
                <label htmlFor="rental-date">Date:</label>
                <input type="date" id="rental-date" />
              </div>
              <div className="form-group">
                <label htmlFor="rental-location">Location:</label>
                <input type="text" id="rental-location" placeholder="Enter pickup location" />
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
        {/* Booking Tabs Section */}
        <section className="booking-tabs">
          <h2 className="booking-title">Book Your Travel</h2>
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

        
    
      <News />

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
  
    
  );
}


export default Ourmain(Home);