import React, { useState, useRef, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import Explore from '../Components/Explore';
import Ourmain from '../hoc/Ourmain';
import { FaPlane, FaTrain, FaHotel, FaTaxi, FaCar, FaUserTie, FaDollarSign, FaHeadset } from 'react-icons/fa';

// Updated city data with IATA codes
const cityData = [
  { name: "Mumbai", code: "BOM" },
  { name: "Delhi", code: "DEL" },
  { name: "Bangalore", code: "BLR" },
  { name: "Hyderabad", code: "HYD" },
  { name: "Chennai", code: "MAA" },
  { name: "Kolkata", code: "CCU" },
  { name: "Ahmedabad", code: "AMD" },
  { name: "Pune", code: "PNQ" },
  { name: "Jaipur", code: "JAI" },
  { name: "Lucknow", code: "LKO" }
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
  
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0, width: 0 });
  const inputRefs = useRef({});

  const [flightForm, setFlightForm] = useState({
    departureFrom: '',
    departureFromName: '',
    goingTo: '',
    goingToName: '',
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
        data = cityData;
        break;
      case 'location':
      case 'pickupLocation':
      case 'dropLocation':
      case 'city':
      case 'state':
        data = cityData.map(city => city.name);
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
      if (field === 'departureFrom' || field === 'goingTo') {
        return data.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.code.toLowerCase().includes(value.toLowerCase())
        );
      }
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
    
    setShowSuggestions(value.length > 0 && suggestions.length > 0);
  };

  const handleSuggestionClick = (value) => {
    switch(activeTab) {
      case 'flights':
        if (currentField === 'departureFrom') {
          setFlightForm({
            ...flightForm, 
            departureFrom: value.code,
            departureFromName: value.name
          });
        } else if (currentField === 'goingTo') {
          setFlightForm({
            ...flightForm, 
            goingTo: value.code,
            goingToName: value.name
          });
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
      setActiveSuggestion(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        if (currentField === 'departureFrom' || currentField === 'goingTo') {
          handleSuggestionClick(suggestions[activeSuggestion]);
        } else {
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
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

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const { departureFrom, goingTo, departureDate } = flightForm;

      // Validate inputs
      if (!departureFrom || !goingTo) {
        throw new Error('Please select departure and destination airports');
      }

      const response = await axios.get('https://api.flightapi.io/onewaytrip', {
        params: {
          access_key: '67fe5cd215d21dafe1c87018',
          dep_iata: departureFrom,
          arr_iata: goingTo,
          flight_date: departureDate,
          limit: 10
        }
      });

      if (response.data.error) {
        throw new Error(response.data.error.message);
      }

      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('No flights found for your search criteria');
      }

      // Process flight data
      const processedFlights = response.data.data.map(flight => ({
        id: flight.flight.number,
        airline: flight.airline.name,
        flightNumber: flight.flight.number,
        departure: {
          airport: flight.departure.airport,
          scheduled: flight.departure.scheduled,
          terminal: flight.departure.terminal,
          gate: flight.departure.gate
        },
        arrival: {
          airport: flight.arrival.airport,
          scheduled: flight.arrival.scheduled,
          terminal: flight.arrival.terminal,
          gate: flight.arrival.gate
        },
        status: flight.flight_status
      }));

      setResults({ type: 'flights', data: processedFlights });
    } catch (err) {
      setError(err.message || 'An error occurred while searching for flights');
    } finally {
      setLoading(false);
    }
  };

  // Other form handlers remain the same
  const handleTrainSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Replace with actual API call
      const response = await fetch('https://api.example.com/trains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trainForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to search for trains');
      }
      
      const data = await response.json();
      setResults({ type: 'trains', data });
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
      const response = await fetch('https://api.example.com/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to search for hotels');
      }
      
      const data = await response.json();
      setResults({ type: 'hotels', data });
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
      const response = await fetch('https://api.example.com/taxis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taxiForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to search for taxis');
      }
      
      const data = await response.json();
      setResults({ type: 'taxis', data });
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
      const response = await fetch('https://api.example.com/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rentalForm)
      });
      
      if (!response.ok) {
        throw new Error('Failed to search for rentals');
      }
      
      const data = await response.json();
      setResults({ type: 'rentals', data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const renderTabContent = () => {
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    switch (activeTab) {
      case 'flights':
        return (
          <div className="tab-content">
            <h3>Flight Booking</h3>
            <form onSubmit={handleFlightSubmit}>
              <div className="form-row">
                <div className="form-group relative" style={{width: '48%'}}>
                  <label>Departure From:</label>
                  <input
                    ref={el => inputRefs.current.departureFrom = el}
                    type="text"
                    placeholder="City or Airport Code"
                    value={flightForm.departureFromName ? 
                      `${flightForm.departureFromName} (${flightForm.departureFrom})` : 
                      flightForm.departureFrom}
                    onChange={(e) => handleInputChange(e, 'departureFrom', 'flights')}
                    onFocus={(e) => handleInputChange(e, 'departureFrom', 'flights')}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
        
                <div className="form-group relative" style={{width: '48%', float: 'right'}}>
                  <label>Going To:</label>
                  <input
                    ref={el => inputRefs.current.goingTo = el}
                    type="text"
                    placeholder="City or Airport Code"
                    value={flightForm.goingToName ? 
                      `${flightForm.goingToName} (${flightForm.goingTo})` : 
                      flightForm.goingTo}
                    onChange={(e) => handleInputChange(e, 'goingTo', 'flights')}
                    onFocus={(e) => handleInputChange(e, 'goingTo', 'flights')}
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
                    onChange={handleChange('flights', 'departureDate')}
                    required
                  />
                </div>
                
                <div className="form-group" style={{width: '48%', float: 'right'}}>
                  <label>Return:</label>
                  <input
                    type="date"
                    value={flightForm.returnDate}
                    onChange={handleChange('flights', 'returnDate')}
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
                    onChange={handleChange('flights', 'travelers')}
                    required
                  />
                </div>
                
                <div className="form-group" style={{width: '48%', float: 'right'}}>
                  <label>Class:</label>
                  <select
                    value={flightForm.class}
                    onChange={handleChange('flights', 'class')}
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="submit-button">Search Flights</button>
            </form>

            {results && results.type === 'flights' && (
              <div className="flight-results">
                <h3>Available Flights</h3>
                {results.data.length > 0 ? (
                  <div className="flight-list">
                    {results.data.map(flight => (
                      <div key={flight.id} className="flight-card">
                        <div className="flight-header">
                          <span className="airline">{flight.airline}</span>
                          <span className="flight-number">{flight.flightNumber}</span>
                          <span className={`status ${flight.status.toLowerCase()}`}>
                            {flight.status}
                          </span>
                        </div>
                        <div className="flight-details">
                          <div className="departure">
                            <span className="time">
                              {new Date(flight.departure.scheduled).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            <span className="airport">{flight.departure.airport}</span>
                            {flight.departure.terminal && <span className="terminal">Terminal: {flight.departure.terminal}</span>}
                            {flight.departure.gate && <span className="gate">Gate: {flight.departure.gate}</span>}
                          </div>
                          <div className="arrival">
                            <span className="time">
                              {new Date(flight.arrival.scheduled).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                            <span className="airport">{flight.arrival.airport}</span>
                            {flight.arrival.terminal && <span className="terminal">Terminal: {flight.arrival.terminal}</span>}
                            {flight.arrival.gate && <span className="gate">Gate: {flight.arrival.gate}</span>}
                          </div>
                        </div>
                        <button className="book-button">View Details</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No flights found for your search criteria.</p>
                )}
              </div>
            )}
          </div>
        );

      // Other tab contents remain the same...
      case 'trains':
        return (
          <div className="tab-content">
            <h3>Train Booking</h3>
            <form onSubmit={handleTrainSubmit}>
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

            <div className="train-pnr-button-container">
              <button
                className="train-pnr-button"
                onClick={() => window.location.href = '/trainPnr'}
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
            <form onSubmit={handleHotelSubmit}>
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
            <form onSubmit={handleTaxiSubmit}>
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
            <form onSubmit={handleRentalSubmit}>
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
                position: 'absolute',
                top: `${suggestionPosition.top}px`,
                left: `${suggestionPosition.left}px`,
                width: `${suggestionPosition.width}px`
              }}
            >
              <div className="suggestions-scroller">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={currentField === 'departureFrom' || currentField === 'goingTo' ? suggestion.code : suggestion}
                    className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {currentField === 'departureFrom' || currentField === 'goingTo' ? 
                      `${suggestion.name} (${suggestion.code})` : suggestion}
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