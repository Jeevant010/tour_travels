import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom'; 
import './Home.css';
import Explore from '../Components/Explore';
import Ourmain from '../hoc/Ourmain';
import { FaPlane, FaTrain, FaHotel, FaTaxi, FaCar, FaUserTie, FaDollarSign, FaHeadset } from 'react-icons/fa';
import {indianAirports, indianRailwayStations, indianStates, cityData, hotelData, vehicleTypes } from '../pages/homeTop';
import { backendUrl1 } from '../utils/config'; 
import { Link } from 'react-router-dom';



function Home() {
  const [activeTab, setActiveTab] = useState('flight');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRefs = useRef({});
  const navigate = useNavigate();

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
        if (activeTab === 'flight') {
          data = indianAirports; 
        } else if (activeTab === 'train') {
          data = indianRailwayStations; 
        }
      case 'goingTo':
        if (activeTab === 'flight') {
          data = indianAirports;
        } else if (activeTab === 'train') {
          data = indianRailwayStations; 
        }
        break;
      case 'railways':
        data = indianRailwayStations;
        break;
      case 'airports':
        data = indianAirports;
        break;
      case 'location':
      case 'pickupLocation':
      case 'dropLocation':
      case 'city':
        data = cityData;
        break;
      case 'state':
        data = indianStates;
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
      return data.filter(item => {
        
        const itemName = typeof item === 'object' ? item.name : item;
        return itemName.toLowerCase().includes(value.toLowerCase());
      });
    }
    return data;
  };

  const handleInputChange = (e, field, formType) => {
    const value = e.target.value;
    handleChange(formType, field)(e);
    
    setCurrentField(field);
    const suggestions = getSuggestions(field, value);
    setSuggestions(suggestions);
    
    if (inputRefs.current[field]) {
      const rect = inputRefs.current[field].getBoundingClientRect();
      setSuggestionPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    
    setShowSuggestions(value.length > 0 || suggestions.length > 0);
  };


  const handleSuggestionClick = (value) => {
    const selectedValue = typeof value === 'object' ? value.name : value; // Ensure correct value is selected
    switch(activeTab) {
      case 'flight':
        if (currentField === 'departureFrom') {
          setFlightForm({...flightForm, departureFrom: selectedValue});
        } else if (currentField === 'goingTo') {
          setFlightForm({...flightForm, goingTo: selectedValue});
        }
        break;
      case 'train':
        if (currentField === 'departureFrom') {
          setTrainForm({...trainForm, departureFrom: selectedValue});
        } else if (currentField === 'goingTo') {
          setTrainForm({...trainForm, goingTo: selectedValue});
        }
        break;
      case 'hotel':
        setHotelForm({...hotelForm, location: selectedValue}); // Fix for hotels
        break;
      case 'taxi':
        if (currentField === 'pickupLocation') {
          setTaxiForm({...taxiForm, pickupLocation: selectedValue});
        } else if (currentField === 'dropLocation') {
          setTaxiForm({...taxiForm, dropLocation: selectedValue});
        }
        break;
      case 'rental':
        if (currentField === 'city') {
          setRentalForm({...rentalForm, city: selectedValue});
        } else if (currentField === 'state') {
          setRentalForm({...rentalForm, state: selectedValue});
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
    setActiveSuggestion(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setActiveSuggestion(prev => prev > 0 ? prev - 1 : prev);
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
        case 'flight':
            setFlightForm({...flightForm, [field]: value});
            break;
        case 'train':
            setTrainForm({...trainForm, [field]: value});
            break;
        case 'hotel':
            setHotelForm({...hotelForm, [field]: value});
            break;
        case 'taxi':
            setTaxiForm({...taxiForm, [field]: value});
            break;
        case 'rental':
            setRentalForm({...rentalForm, [field]: value});
            break;
        default:
            break;
    }
};

 

useEffect(() => {
const handleClickOutside = (e) => {
if (!e.target.closest('.suggestions-container') && 
!e.target.closest('.form-group input')) {
setShowSuggestions(false);
}
};

document.addEventListener('mousedown', handleClickOutside);
return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

const handleFormSubmit = async (e, formType, formData) => {
  e.preventDefault();
  setIsLoading(true);
  setSuccessMessage('');
  setErrorMessage('');

  // 1. Form Data Mapping
  const formMappers = {
    hotel: (data) => ({
      Location: data.location,
      Checkin_Date: data.checkinDate,
      Checkout_Date: data.checkoutDate,
      No_of_Rooms: data.rooms,
      Guests: data.guests,
    }),
    taxi: (data) => ({
      PickUp_Location: data.pickupLocation,
      Drop_Location: data.dropLocation,
      PickUp_Date: data.pickupDate,
      PickUp_Time: data.pickupTime,
    }),
    flight: (data) => ({
      Departure_From: data.departureFrom.split('(')[0].trim(),
      Going_to: data.goingTo.split('(')[0].trim(),
      Departure_Date: data.departureDate,
      Return_Date: data.returnDate || null,
      Travelers: parseInt(data.travelers, 10),
      Class: data.class.toLowerCase(),
    }),
    train: (data) => ({
      Departure_Form: data.departureFrom.split('(')[0].trim(),
      Going_to: data.goingTo.split('(')[0].trim(),
      Departure_Date: data.departureDate,
      AC_Type: data.acType,
    }),
    rental: (data) => ({
      State: data.state,
      City: data.city,
      Vehicle_Type: data.vehicleType,
      Duration: data.duration,
      Date: data.date,
      Location: data.location,
    }),
  };

  // 2. Data Processing
  const processFormData = (data) => {
    const mapper = formMappers[formType];
    if (!mapper) throw new Error(`Unsupported form type: ${formType}`);
    
    const mappedData = mapper(data);
    return Object.fromEntries(
      Object.entries(mappedData).map(([key, value]) => 
        [key, typeof value === 'string' ? value.trim() : value]
      )
    );
  };

  // 3. Validation
  const validateForm = (data) => {
    // Date validation for relevant forms
    if (['flight', 'hotel', 'taxi', 'rental'].includes(formType) && data.returnDate) {
      if (new Date(data.returnDate) < new Date(data.departureDate)) {
        throw new Error('Return date cannot be earlier than departure date.');
      }
    }

    // Required fields validation
    const missingFields = Object.entries(data)
      .filter(([_, value]) => value === '' || value === null || value === undefined)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.error('Missing fields:', missingFields);
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  };

  // 4. API Submission
  const submitFormData = async (data) => {
    const endpoint = `${backendUrl1 || 'http://localhost:8080'}/${formType}`;
    console.log('Submitting to:', endpoint, 'Payload:', data);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || 
        `Server responded with ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  };

  // 5. Navigation
  const navigateToResults = (data) => {
    const routeConfig = {
      flight: { path: '/flight', stateKey: 'flightData' },
      train: { path: '/train', stateKey: 'trainData' },
      hotel: { path: '/hotel', stateKey: 'hotelData' },
      taxi: { path: '/taxi', stateKey: 'taxiData' },
      rental: { path: '/rental', stateKey: 'rentalData' },
    };

    const config = routeConfig[formType];
    if (config) {
      navigate(config.path, { state: { [config.stateKey]: data } });
    }
  };

  // Main execution flow
  try {
    // Process and validate
    const processedData = processFormData(formData);
    validateForm(processedData);

    // Submit and handle response
    const responseData = await submitFormData(processedData);
    setResults(responseData);
    setSuccessMessage(
      `Your "${formType}" booking request has been submitted successfully!`
    );

    // Navigate to results
    navigateToResults(responseData);
  } catch (error) {
    console.error(`${formType} form error:`, error);
    setErrorMessage(error.message || `Failed to process ${formType} form.`);
  } finally {
    setIsLoading(false);
  }
};

const renderTabContent = () => {
  switch (activeTab) {
    case 'flight':
      return (
        <div className="tab-content">
          <h3>Flight Booking</h3>
          <form onSubmit={(e) => handleFormSubmit(e, 'flight', flightForm)}>
            <div className="form-row">
              <div className="form-group relative" style={{width: '48%'}}>
                <label>Departure From:</label>
                <input
                  ref={el => inputRefs.current.departureFrom = el}
                  type="text"
                  placeholder="City"
                  value={flightForm.departureFrom}
                  onChange={(e) => handleInputChange(e, 'departureFrom', 'flight')}
                  onFocus={(e) => handleInputChange(e, 'departureFrom', 'flight')}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
      
              <div className="form-group relative" style={{width: '48%', float: 'right'}}>
                <label>Going To:</label>
                <input
                  ref={el => inputRefs.current.goingTo = el}
                  type="text"
                  placeholder="City"
                  value={flightForm.goingTo}
                  onChange={(e) => handleInputChange(e, 'goingTo', 'flight')}
                  onFocus={(e) => handleInputChange(e, 'goingTo', 'flight')}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{width: '48%'}}>
                <label>Departure:</label>
                <input
                  type="date"
                  value={flightForm.departureDate}
                  onChange={handleChange('flight', 'departureDate')}
                  required
                />
              </div>
              
              <div className="form-group" style={{width: '48%', float: 'right'}}>
                <label>Return:</label>
                <input
                  type="date"
                  value={flightForm.returnDate}
                  onChange={handleChange('flight', 'returnDate')}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{width: '48%'}}>
                <label>Travelers:</label>
                <input
                  type="number"
                  min="1"
                  placeholder="1"
                  value={flightForm.travelers}
                  onChange={handleChange('flight', 'travelers')}
                  required
                />
              </div>
              
              <div className="form-group" style={{width: '48%', float: 'right'}}>
                <label>Class:</label>
                <select
                  value={flightForm.class}
                  onChange={handleChange('flight', 'class')}
                >
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="first">First Class</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Flights'}
              
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      );

    case 'train':
      return (
        <div className="tab-content">
          <h3>Train Booking</h3>
          <form onSubmit={(e) => handleFormSubmit(e, 'train', trainForm)}>
            <div className="form-row">
              <div className="form-group relative">
                <label>Departure From:</label>
                <input
                  ref={(el) => (inputRefs.current.departureFrom = el)}
                  type="text"
                  placeholder="Enter departure city"
                  value={trainForm.departureFrom}
                  onChange={(e) => handleInputChange(e, 'departureFrom', 'train')}
                  onFocus={(e) => handleInputChange(e, 'departureFrom', 'train')}
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
                  onChange={(e) => handleInputChange(e, 'goingTo', 'train')}
                  onFocus={(e) => handleInputChange(e, 'goingTo', 'train')}
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
                  onChange={handleChange('train', 'departureDate')}
                  required
                />
              </div>

              <div className="form-group">
                <label>AC Type:</label>
                <select
                  value={trainForm.acType}
                  onChange={handleChange('train', 'acType')}
                >
                  <option value="sleeper">Sleeper</option>
                  <option value="ac1">AC 1st Class</option>
                  <option value="ac2">AC 2nd Class</option>
                  <option value="ac3">AC 3rd Class</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Trains'}
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}


            <div className="train-pnr-button-container">
              <button
                className="train-pnr-button"
                onClick={() => window.location.href = '/trainPnr'}
              >
                Check Train PNR Status
              </button>
            </div>
          </form>
        </div>
      );

    case 'hotel':
      return (
        <div className="tab-content">
          <h3>Hotel Booking</h3>
          <form onSubmit={(e) => handleFormSubmit(e, 'hotel', hotelForm)}>
            <div className="form-row">
              <div className="form-group relative">
                <label>Select City/Location:</label>
                <input
                  ref={el => inputRefs.current.location = el}
                  type="text"
                  placeholder="Enter city or location"
                  value={hotelForm.location}
                  onChange={(e) => handleInputChange(e, 'location', 'hotel')}
                  onFocus={(e) => handleInputChange(e, 'location', 'hotel')}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Check-in Date:</label>
                <input
                  type="date"
                  value={hotelForm.checkinDate}
                  onChange={handleChange('hotel', 'checkinDate')}
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
                  onChange={handleChange('hotel', 'checkoutDate')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>No. of Rooms:</label>
                <input
                  type="number"
                  min="1"
                  value={hotelForm.rooms}
                  onChange={handleChange('hotel', 'rooms')}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Guests:</label>
                <input
                  type="number"
                  min="1"
                  value={hotelForm.guests}
                  onChange={handleChange('hotel', 'guests')}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Hotels'}
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Taxis'}
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      );

    case 'rental':
      return (
        <div className="tab-content">
          <h3>Rental Services</h3>
          <form onSubmit={(e) => handleFormSubmit(e, 'rental', rentalForm)}>
            <div className="form-row">
              <div className="form-group relative">
                <label>State:</label>
                <input
                  ref={el => inputRefs.current.state = el}
                  type="text"
                  placeholder="Enter state"
                  value={rentalForm.state}
                  onChange={(e) => handleInputChange(e, 'state', 'rental')}
                  onFocus={(e) => handleInputChange(e, 'state', 'rental')}
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
                  onChange={(e) => handleInputChange(e, 'city', 'rental')}
                  onFocus={(e) => handleInputChange(e, 'city', 'rental')}
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
                  onChange={handleChange('rental', 'vehicleType')}
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
                  onChange={handleChange('rental', 'duration')}
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
                  onChange={handleChange('rental', 'date')}
                  required
                />
              </div>
              
              <div className="form-group relative">
                <label>Location:</label>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  onChange={(e) => handleInputChange(e, 'location', 'rental')}
                  required
                />
              </div>
            </div>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search Rentals'}
            </button>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
  {['flight', 'train', 'hotel', 'taxi', 'rental'].map((tab) => (
    <button
      key={tab}
      className={`tab-button ${activeTab === tab ? 'active' : ''}`}
      onClick={() => {
        setActiveTab(tab);
        setResults(null);
        setShowSuggestions(false);
      }}
    >
      {tab === 'flight' && <FaPlane className="tab-icon" />}
      {tab === 'train' && <FaTrain className="tab-icon" />}
      {tab === 'hotel' && <FaHotel className="tab-icon" />}
      {tab === 'taxi' && <FaTaxi className="tab-icon" />}
      {tab === 'rental' && <FaCar className="tab-icon" />}
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
                position: 'absolute',
                top: `${suggestionPosition.top}px`,
                left: `${suggestionPosition.left}px`,
                width: `${suggestionPosition.width}px`
              }}
            >
              <div className="suggestions-scroller">
              {suggestions.map((suggestion, index) => (
                <div
                  key={typeof suggestion === 'object' ? suggestion.code : suggestion}
                  className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {typeof suggestion === 'object' ? suggestion.name : suggestion} {/* Display correct value */}
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Explore />
      <section className="features">
        <h2>Why Choose Us?</h2>
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