import React, { useState, useRef , useEffect } from 'react';
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

const handleFormSubmit = async (e, formType, formData) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          
          try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // In a real app, you would use actual API calls:
            // const response = await fetch(`https://api.example.com/${formType}`, {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(formData)
            // });
            
            // if (!response.ok) throw new Error('Request failed');
            
            // const data = await response.json();
            setResults({ type: formType, data: formData });
          } catch (err) {
            setError(err.message || 'An error occurred');
          } finally {
            setLoading(false);
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
        <form onSubmit={(e) => handleFormSubmit(e, 'flights', flightForm)}>
          <div className="form-row">
            <div className="form-group relative" style={{width: '48%'}}>
              <label>Departure From:</label>
              <input
                ref={el => inputRefs.current.departureFrom = el}
                type="text"
                placeholder="City"
                value={flightForm.departureFrom}
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
        placeholder="City"
        value={flightForm.goingTo}
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
</div>
);

case 'trains':
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
        position: 'absolute',
        top: `${suggestionPosition.top}px`,
        left: `${suggestionPosition.left}px`,
        width: `${suggestionPosition.width}px`
      }}
    >
      <div className="suggestions-scroller">
        {suggestions.map((suggestion, index) => (
          <div
            key={suggestion}
            className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
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