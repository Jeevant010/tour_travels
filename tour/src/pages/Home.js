import React, { useState, useEffect } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
import Ourmain from '../hoc/Ourmain';
import { FaPlane, FaTrain, FaHotel, FaTaxi, FaCar, FaUserTie, FaDollarSign, FaHeadset } from 'react-icons/fa';

const cityData = [
  "New York", "London", "Paris", "Tokyo", "Dubai", 
  "Sydney", "Los Angeles", "Chicago", "Toronto", "Singapore",
  "Berlin", "Mumbai", "Hong Kong", "San Francisco", "Seoul"
];

const hotelData = [
  "Grand Hyatt", "Marriott", "Hilton", "InterContinental",
  "Four Seasons", "Ritz-Carlton", "Sheraton", "Westin"
];

const vehicleTypes = ["Car", "Bike", "Van", "SUV"];

function Home() {
  const [activeTab, setActiveTab] = useState('flights');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  
  // Autocomplete state
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentField, setCurrentField] = useState('');

  // Form states
  const [flightForm, setFlightForm] = useState({
    departureFrom: '',
    goingTo: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    class: 'economy'
  });

  const [trainForm, setTrainForm] = useState({
    departureFrom: '',
    goingTo: '',
    departureDate: '',
    acType: 'sleeper'
  });

  const [hotelForm, setHotelForm] = useState({
    location: '',
    checkinDate: '',
    checkoutDate: '',
    rooms: 1,
    guests: 1
  });

  const [taxiForm, setTaxiForm] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    pickupTime: ''
  });

  const [rentalForm, setRentalForm] = useState({
    state: '',
    city: '',
    vehicleType: 'Car',
    duration: 1,
    date: '',
    location: ''
  });

  const getSuggestions = (field, value) => {
    let data = [];
    switch(field) {
      case 'departureFrom':
      case 'goingTo':
      case 'location':
      case 'pickupLocation':
      case 'dropLocation':
      case 'city':
      case 'state':
        data = cityData;
        break;
      case 'hotel':
        data = hotelData;
        break;
      case 'vehicleType':
        data = vehicleTypes;
        break;
      default:
        data = [];
    }
    
    if (value.length > 0) {
      return data.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
    }
    return data;
  };

  const handleInputChange = (e, field, formType) => {
    const value = e.target.value;
    handleChange(formType, field)(e);
    
    setCurrentField(field);
    const suggestions = getSuggestions(field);
    
    if (value.length > 0) {
        const filtered = suggestions.filter(
            item => item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
    } else {
        setSuggestions(suggestions);
        setShowSuggestions(true);
    }
};

  const handleSuggestionClick = (value) => {
    switch(activeTab) {
        case 'flights':
            if (currentField === 'departureFrom') {
                setFlightForm({...flightForm, departureFrom: value});
            } else if (currentField === 'goingTo') {
                setFlightForm({...flightForm, goingTo: value});
            }
            break;
        case 'trains':
            if (currentField === 'departureFrom') {
                setTrainForm({...trainForm, departureFrom: value});
            } else if (currentField === 'goingTo') {
                setTrainForm({...trainForm, goingTo: value});
            }
            break;
        case 'hotels':
            setHotelForm({...hotelForm, location: value});
            break;
        case 'taxi':
            if (currentField === 'pickupLocation') {
                setTaxiForm({...taxiForm, pickupLocation: value});
            } else if (currentField === 'dropLocation') {
                setTaxiForm({...taxiForm, dropLocation: value});
            }
            break;
        case 'rentals':
            if (currentField === 'city') {
                setRentalForm({...rentalForm, city: value});
            } else if (currentField === 'state') {
                setRentalForm({...rentalForm, state: value});
            } else if (currentField === 'location') {
                setRentalForm({...rentalForm, location: value});
            }
            break;
        default:
            break;
    }
    setShowSuggestions(false);
};

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeSuggestion < suggestions.length - 1) {
            setActiveSuggestion(activeSuggestion + 1);
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeSuggestion > 0) {
            setActiveSuggestion(activeSuggestion - 1);
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSuggestionClick(suggestions[activeSuggestion]);
        }
    }
  };

  const handleChange = (formType, field) => (e) => {
    const value = e.target.value;
    
    switch(formType) {
        case 'flights':
            setFlightForm({...flightForm, [field]: value});
            break;
        case 'trains':
            setTrainForm({...trainForm, [field]: value});
            break;
        case 'hotels':
            setHotelForm({...hotelForm, [field]: value});
            break;
        case 'taxi':
            setTaxiForm({...taxiForm, [field]: value});
            break;
        case 'rentals':
            setRentalForm({...rentalForm, [field]: value});
            break;
        default:
            break;
    }
};

const handleFlightSubmit = async (e) => { e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    // Replace with actual API call
    const response = await fetch('https://api.example.com/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightForm)
    });
    
    if (!response.ok) {
      throw new Error('Wait your request has been sent to the server!');
    }
    
    const data = await response.json();
    setResults({ type: 'flights', data });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  } 
}; 

const handleTrainSubmit = async (e) => { e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    // Replace with actual API call
    const response = await fetch('https://api.example.com/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightForm)
    });
    
    if (!response.ok) {
      throw new Error('Wait your request has been sent to the server!');
    }
    
    const data = await response.json();
    setResults({ type: 'flights', data });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  } 
}; 
const handleHotelSubmit = async (e) => { 
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
    // Replace with actual API call
    const response = await fetch('https://api.example.com/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightForm)
    });
    
    if (!response.ok) {
      throw new Error('Wait your request has been sent to the server!');
    }
    
    const data = await response.json();
    setResults({ type: 'flights', data });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  } 
}; 
const handleTaxiSubmit = async (e) => { 
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
  // Replace with actual API call
  const response = await fetch('https://api.example.com/flights', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightForm)
  });
  
  if (!response.ok) {
      throw new Error('Wait your request has been sent to the server!');
  }
  
  const data = await response.json();
  setResults({ type: 'flights', data });
  } catch (err) {
  setError(err.message);
  } finally {
  setLoading(false);
  }
}; 
const handleRentalSubmit = async (e) => { 
  e.preventDefault();
  setLoading(true);
  setError(null);
  
  try {
  // Replace with actual API call
  const response = await fetch('https://api.example.com/flights', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(flightForm)
  });
  
  if (!response.ok) {
      throw new Error('Wait your request has been sent to the server!');
  }
  
  const data = await response.json();
  setResults({ type: 'flights', data });
  } catch (err) {
  setError(err.message);
  } finally {
  setLoading(false);
  }
}; 

const renderTabContent = () => {
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  switch (activeTab) {
      case 'flights':
          return (
              <div className="tab-content">
                  <h3 className="flight-booking-title">Flight Booking</h3>
                  <form className="flight-booking-form" onSubmit={handleFlightSubmit}>
                      <div className="form-group relative">
                          <label htmlFor="departure-from">Departure From:</label>
                          <input
                              type="text"
                              id="departure-from"
                              placeholder="Enter departure city"
                              value={flightForm.departureFrom}
                              onChange={(e) => handleInputChange(e, 'departureFrom', 'flights')}
                              onFocus={() => {
                                  setCurrentField('departureFrom');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group relative">
                          <label htmlFor="going-to">Going To:</label>
                          <input
                              type="text"
                              id="going-to"
                              placeholder="Enter destination city"
                              value={flightForm.goingTo}
                              onChange={(e) => handleInputChange(e, 'goingTo', 'flights')}
                              onFocus={() => {
                                  setCurrentField('goingTo');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="departure-date">Departure Date:</label>
                          <input
                          type="date"
                          id="departure-date"
                          value={flightForm.departureDate}
                          onChange={handleChange('flights', 'departureDate')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="return-date">Return Date:</label>
                          <input
                          type="date"
                          id="return-date"
                          value={flightForm.returnDate}
                          onChange={handleChange('flights', 'returnDate')}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="travelers">Travelers:</label>
                          <input
                          type="number"
                          id="travelers"
                          min="1"
                          placeholder="Number of travelers"
                          value={flightForm.travelers}
                          onChange={handleChange('flights', 'travelers')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="class">Class:</label>
                          <select
                          id="class"
                          value={flightForm.class}
                          onChange={handleChange('flights', 'class')}
                          >
                          <option value="economy">Economy</option>
                          <option value="business">Business</option>
                          <option value="first">First Class</option>
                          </select>
                      </div>
                      <button type="submit" className="submit-button">Search Flights</button>
                  </form>
                  {showSuggestions && suggestions.length > 0 && (
                      <div className="suggestions-container">
                          {suggestions.map((suggestion, index) => (
                              <div
                                  key={suggestion}
                                  className={`suggestion ${index === activeSuggestion ? 'active' : ''}`}
                                  onClick={() => handleSuggestionClick(suggestion)}
                              >
                                  {suggestion}
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          );
      case 'trains':
          return (
              <div className="tab-content">
                  <h3 className="train-booking-title">Train Booking</h3>
                  <form className="train-booking-form" onSubmit={handleTrainSubmit}>
                      <div className="form-group relative">
                          <label htmlFor="train-departure-from">Departure From:</label>
                          <input
                              type="text"
                              id="train-departure-from"
                              placeholder="Enter departure city"
                              value={trainForm.departureFrom}
                              onChange={(e) => handleInputChange(e, 'departureFrom', 'trains')}
                              onFocus={() => {
                                  setCurrentField('departureFrom');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group relative">
                          <label htmlFor="train-going-to">Going To:</label>
                          <input
                              type="text"
                              id="train-going-to"
                              placeholder="Enter destination city"
                              value={trainForm.goingTo}
                              onChange={(e) => handleInputChange(e, 'goingTo', 'trains')}
                              onFocus={() => {
                                  setCurrentField('goingTo');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="train-departure-date">Departure Date:</label>
                          <input
                          type="date"
                          id="train-departure-date"
                          value={trainForm.departureDate}
                          onChange={handleChange('trains', 'departureDate')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="train-ac-type">AC Type:</label>
                          <select
                          id="train-ac-type"
                          value={trainForm.acType}
                          onChange={handleChange('trains', 'acType')}
                          >
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
                  <form className="hotel-booking-form" onSubmit={handleHotelSubmit}>
                      <div className="form-group relative">
                          <label htmlFor="hotel-location">Select City/Location:</label>
                          <input
                              type="text"
                              id="hotel-location"
                              placeholder="Enter city or location"
                              value={hotelForm.location}
                              onChange={(e) => handleInputChange(e, 'location', 'hotels')}
                              onFocus={() => {
                                  setCurrentField('location');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      
                      <div className="form-group">
                          <label htmlFor="hotel-checkin-date">Check-in Date:</label>
                          <input
                          type="date"
                          id="hotel-checkin-date"
                          value={hotelForm.checkinDate}
                          onChange={handleChange('hotels', 'checkinDate')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="hotel-checkout-date">Check-out Date:</label>
                          <input
                          type="date"
                          id="hotel-checkout-date"
                          value={hotelForm.checkoutDate}
                          onChange={handleChange('hotels', 'checkoutDate')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="hotel-rooms">No. of Rooms:</label>
                          <input
                          type="number"
                          id="hotel-rooms"
                          min="1"
                          placeholder="Enter number of rooms"
                          value={hotelForm.rooms}
                          onChange={handleChange('hotels', 'rooms')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="hotel-guests">Guests:</label>
                          <input
                          type="number"
                          id="hotel-guests"
                          min="1"
                          placeholder="Enter number of guests"
                          value={hotelForm.guests}
                          onChange={handleChange('hotels', 'guests')}
                          required
                          />
                      </div>
                      <button type="submit" className="submit-button">Search Hotels</button>
                  </form>
              </div>
          );
      case 'taxi':
          return (
              <div className="tab-content">
                  <h3 className="taxi-booking-title">Taxi Booking</h3>
                  <form className="taxi-booking-form" onSubmit={handleTaxiSubmit}>
                      <div className="form-group relative">
                          <label htmlFor="pickup-location">Pick Up Location:</label>
                          <input
                              type="text"
                              id="pickup-location"
                              placeholder="Enter pick up location"
                              value={taxiForm.pickupLocation}
                              onChange={(e) => handleInputChange(e, 'pickupLocation', 'taxi')}
                              onFocus={() => {
                                  setCurrentField('pickupLocation');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group relative">
                          <label htmlFor="drop-location">Drop Location:</label>
                          <input
                              type="text"
                              id="drop-location"
                              placeholder="Enter drop location"
                              value={taxiForm.dropLocation}
                              onChange={(e) => handleInputChange(e, 'dropLocation', 'taxi')}
                              onFocus={() => {
                                  setCurrentField('dropLocation');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="pickup-date">Pickup Date:</label>
                          <input
                          type="date"
                          id="pickup-date"
                          value={taxiForm.pickupDate}
                          onChange={handleChange('taxi', 'pickupDate')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="pickup-time">Pickup Time:</label>
                          <input
                          type="time"
                          id="pickup-time"
                          value={taxiForm.pickupTime}
                          onChange={handleChange('taxi', 'pickupTime')}
                          required
                          />
                      </div>
                      <button type="submit" className="submit-button">Search Taxis</button>
                  </form>
              </div>
          );
      case 'rentals':
          return (
              <div className="tab-content">
                  <h3 className="rental-booking-title">Rental Services</h3>
                  <form className="rental-booking-form" onSubmit={handleRentalSubmit}>
                      <div className="form-group relative">
                          <label htmlFor="rental-state">State:</label>
                          <input
                              type="text"
                              id="rental-state"
                              placeholder="Enter state"
                              value={rentalForm.state}
                              onChange={(e) => handleInputChange(e, 'state', 'rentals')}
                              onFocus={() => {
                                  setCurrentField('state');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                          />
                      </div>
                      <div className="form-group relative">
                          <label htmlFor="rental-city">City:</label>
                          <input
                              type="text"
                              id="rental-city"
                              placeholder="Enter city"
                              value={rentalForm.city}
                              onChange={(e) => handleInputChange(e, 'city', 'rentals')}
                              onFocus={() => {
                                  setCurrentField('city');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="rental-vehicle-type">Vehicle Type:</label>
                          <select
                          id="rental-vehicle-type"
                          value={rentalForm.vehicleType}
                          onChange={handleChange('rentals', 'vehicleType')}
                          >
                          <option value="car">Car</option>
                          <option value="bike">Bike</option>
                          <option value="van">Van</option>
                          <option value="suv">SUV</option>
                          </select>
                      </div>
                      <div className="form-group">
                          <label htmlFor="rental-duration">Duration (in days):</label>
                          <input
                          type="number"
                          id="rental-duration"
                          min="1"
                          placeholder="Enter duration"
                          value={rentalForm.duration}
                          onChange={handleChange('rentals', 'duration')}
                          required
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="rental-date">Date:</label>
                          <input
                          type="date"
                          id="rental-date"
                          value={rentalForm.date}
                          onChange={handleChange('rentals', 'date')}
                          required
                          />
                      </div>
                      <div className="form-group relative">
                          <label htmlFor="rental-location">Location:</label>
                          <input
                              type="text"
                              id="rental-location"
                              placeholder="Enter pickup location"
                              value={rentalForm.location}
                              onChange={(e) => handleInputChange(e, 'location', 'rentals')}
                              onFocus={() => {
                                  setCurrentField('location');
                                  setSuggestions(cityData);
                                  setShowSuggestions(true);
                              }}
                              onKeyDown={handleKeyDown}
                              required
                          />
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
        <h2 className="booking-title">Book Your Travel</h2>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('flights');
              setResults(null);
            }}
          >
            <FaPlane className="tab-icon" /> Flights
          </button>
          <button
            className={`tab-button ${activeTab === 'trains' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('trains');
              setResults(null);
            }}
          >
            <FaTrain className="tab-icon" /> Trains
          </button>
          <button
            className={`tab-button ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('hotels');
              setResults(null);
            }}
          >
            <FaHotel className="tab-icon" /> Hotels
          </button>
          <button
            className={`tab-button ${activeTab === 'taxi' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('taxi');
              setResults(null);
            }}
          >
            <FaTaxi className="tab-icon" /> Taxi
          </button>
          <button
            className={`tab-button ${activeTab === 'rentals' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('rentals');
              setResults(null);
            }}
          >
            <FaCar className="tab-icon" /> Rentals
          </button>
        </div>
        <div className="tab-content-container">
          {renderTabContent()}
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-container">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`suggestion ${index === activeSuggestion ? 'active' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Explore />

      <section className="features">
        <h2 className="features-title">Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature-item">
            <FaUserTie className="feature-icon" />
            <h3>Expert Guides</h3>
            <p>Our experienced guides ensure you have the best travel experience.</p>
          </div>
          <div className="feature-item">
            <FaDollarSign className="feature-icon" />
            <h3>Affordable Packages</h3>
            <p>We offer competitive pricing without compromising on quality.</p>
          </div>
          <div className="feature-item">
            <FaHeadset className="feature-icon" />
            <h3>24/7 Support</h3>
            <p>Our team is here to assist you anytime, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ourmain(Home);