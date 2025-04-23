import React, { useState, useEffect } from 'react';
import './FlightPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlane, FaCalendarAlt, FaUserFriends, FaChair, FaPrint, FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const FlightPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [flightDetails, setFlightDetails] = useState(null);
  const [dateError, setDateError] = useState(null);

  // Extract and validate flight details
  useEffect(() => {
    if (location.state?.flightData?.flight) {
      const details = location.state.flightData.flight;
      
      // Validate return date is after departure date if both exist
      if (details.Departure_Date && details.Return_Date) {
        const departure = new Date(details.Departure_Date);
        const returnDate = new Date(details.Return_Date);
        
        if (returnDate <= departure) {
          setDateError('Return date must be after departure date');
        } else {
          setDateError(null);
        }
      }
      
      setFlightDetails(details);
    }
  }, [location.state]);

  // Show success message for 5 seconds
  useEffect(() => {
    if (location.state?.flightData?.message) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.flightData?.message]);

  // Format date with weekday
  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  const displayData = flightDetails ? [
    { 
      icon: <FaPlane className="flight-icon departure" />,
      label: 'Departure City', 
      value: flightDetails.Departure_From?.split('(')[0]?.trim() || 'Not specified',
      code: flightDetails.Departure_From?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaPlane className="flight-icon arrival" />,
      label: 'Destination City', 
      value: flightDetails.Going_to?.split('(')[0]?.trim() || 'Not specified',
      code: flightDetails.Going_to?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaCalendarAlt className="flight-icon" />,
      label: 'Departure Date', 
      value: formatDate(flightDetails.Departure_Date) || 'Not specified'
    },
    { 
      icon: <FaCalendarAlt className="flight-icon" />,
      label: 'Return Date', 
      value: flightDetails.Return_Date ? formatDate(flightDetails.Return_Date) : 'One-way trip'
    },
    { 
      icon: <FaUserFriends className="flight-icon" />,
      label: 'Passengers', 
      value: flightDetails.Travelers || 'Not specified'
    },
    { 
      icon: <FaChair className="flight-icon" />,
      label: 'Travel Class', 
      value: flightDetails.Class ? 
        `${flightDetails.Class.charAt(0).toUpperCase()}${flightDetails.Class.slice(1)}` : 
        'Not specified'
    }
  ] : null;

  if (!flightDetails) {
    return (
      <div className="flight-page-container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="error-state">
          <h1>Flight Details Not Available</h1>
          <p>We couldn't retrieve your flight information.</p>
          <button onClick={() => navigate(-1)} className="action-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-page-container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="flight-header">
        <h1 className="flight-title">Your Flight Itinerary</h1>
        <p className="flight-subtitle">Review your booking details</p>
      </div>

      {dateError && (
        <div className="error-message">
          {dateError}
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          {location.state.flightData.message}
        </div>
      )}

      <div className="flight-summary-card">
        <div className="route-display">
          <div className="city departure">
            <span className="city-name">{displayData[0].value}</span>
            {displayData[0].code && (
              <span className="airport-code">{displayData[0].code}</span>
            )}
          </div>
          
          <div className="flight-connection">
            <div className="flight-line"></div>
            <div className="flight-dot"></div>
            <div className="flight-line"></div>
          </div>
          
          <div className="city arrival">
            <span className="city-name">{displayData[1].value}</span>
            {displayData[1].code && (
              <span className="airport-code">{displayData[1].code}</span>
            )}
          </div>
        </div>

        <div className="flight-details-grid">
          {displayData.map((detail, index) => (
            <div key={index} className="detail-item">
              <div className="detail-icon">{detail.icon}</div>
              <div className="detail-content">
                <span className="detail-label">{detail.label}</span>
                <span className="detail-value">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="print-button">
          <FaPrint /> Print Itinerary
        </button>
        <button className="modify-button">
          <FaEdit /> Modify Booking
        </button>
      </div>
      <br />
      <br />
      <div className="train-pnr-button-container">
              <h2 
          className="train-pnr-button"
          onClick={() => window.location.href = '/Optflight'}
        >
          Check the Most Optimized Flight
        </h2>

        {/* With this */}
        <button 
          className="train-pnr-button"
          onClick={() => navigate('/Optflight', { state: { flightData: flightDetails } })}
        >
          Check the Most Optimized Flight
        </button>
        </div>
    </div>
  );
};

export default Ourmain(FlightPage);