import React, { useState, useEffect } from 'react';
import './TrainPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTrain, FaCalendarAlt, FaUserFriends, FaChair, FaPrint, FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const TrainPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [trainDetails, setTrainDetails] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    if (location.state?.trainData) {
      const details = location.state.trainData;
      
      if (details.departureDate && details.returnDate) {
        const departure = new Date(details.departureDate);
        const returnDate = new Date(details.returnDate);
        
        if (returnDate <= departure) {
          setDateError('Return date must be after departure date');
        } else {
          setDateError(null);
        }
      }
      
      setTrainDetails(details);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.trainData?.message) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.trainData?.message]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return null;
    try {
      const [hours, minutes] = timeString.split(':');
      const hourNum = parseInt(hours, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (e) {
      return timeString;
    }
  };

  const displayData = trainDetails ? [
    { 
      icon: <FaTrain className="train-icon departure" />,
      label: 'Departure Station', 
      value: trainDetails.departureStation || 'Not specified',
      code: trainDetails.departureStationCode || ''
    },
    { 
      icon: <FaTrain className="train-icon arrival" />,
      label: 'Arrival Station', 
      value: trainDetails.arrivalStation || 'Not specified',
      code: trainDetails.arrivalStationCode || ''
    },
    { 
      icon: <FaCalendarAlt className="train-icon" />,
      label: 'Departure Date', 
      value: formatDate(trainDetails.departureDate) || 'Not specified'
    },
    { 
      icon: <FaCalendarAlt className="train-icon" />,
      label: 'Return Date', 
      value: trainDetails.returnDate ? formatDate(trainDetails.returnDate) : 'One-way trip'
    },
    { 
      icon: <FaUserFriends className="train-icon" />,
      label: 'Passengers', 
      value: trainDetails.passengers || 'Not specified'
    },
    { 
      icon: <FaChair className="train-icon" />,
      label: 'Class', 
      value: trainDetails.travelClass ? 
        `${trainDetails.travelClass.charAt(0).toUpperCase()}${trainDetails.travelClass.slice(1)}` : 
        'Not specified'
    },
    { 
      icon: <FaTrain className="train-icon" />,
      label: 'Train Number', 
      value: trainDetails.trainNumber || 'Not specified'
    },
    { 
      icon: <FaTrain className="train-icon" />,
      label: 'Train Name', 
      value: trainDetails.trainName || 'Not specified'
    },
    { 
      icon: <FaTrain className="train-icon" />,
      label: 'Departure Time', 
      value: formatTime(trainDetails.departureTime) || 'Not specified'
    },
    { 
      icon: <FaTrain className="train-icon" />,
      label: 'Arrival Time', 
      value: formatTime(trainDetails.arrivalTime) || 'Not specified'
    },
    { 
      icon: <FaTrain className="train-icon" />,
      label: 'Duration', 
      value: trainDetails.duration || 'Not specified'
    }
  ] : null;

  if (!trainDetails) {
    return (
      <div className="train-page-container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="error-state">
          <h1>Train Details Not Available</h1>
          <p>We couldn't retrieve your train information.</p>
          <button onClick={() => navigate(-1)} className="train-action-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="train-page-container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="train-header">
        <h1 className="train-title">Your Train Booking Details</h1>
        <p className="train-subtitle">Review your journey information</p>
      </div>

      {dateError && (
        <div className="train-error-message">
          {dateError}
        </div>
      )}

      {showSuccessMessage && (
        <div className="train-success-message">
          {location.state.trainData.message}
        </div>
      )}

      <div className="train-summary-card">
        <div className="train-route-display">
          <div className="station departure">
            <span className="station-name">{displayData[0].value}</span>
            {displayData[0].code && (
              <span className="station-code">{displayData[0].code}</span>
            )}
            {displayData[8] && (
              <span className="train-time">{displayData[8].value}</span>
            )}
          </div>
          
          <div className="train-connection">
            <div className="train-line"></div>
            <div className="train-dot"></div>
            <div className="train-line"></div>
          </div>
          
          <div className="station arrival">
            <span className="station-name">{displayData[1].value}</span>
            {displayData[1].code && (
              <span className="station-code">{displayData[1].code}</span>
            )}
            {displayData[9] && (
              <span className="train-time">{displayData[9].value}</span>
            )}
          </div>
        </div>

        <div className="train-info-box">
          <div className="train-number-name">
            <span className="train-number">{displayData[6].value}</span>
            <span className="train-name">{displayData[7].value}</span>
          </div>
          <div className="train-duration">
            <span>Journey Duration: {displayData[10].value}</span>
          </div>
        </div>

        <div className="train-details-grid">
          {displayData.slice(2, 6).map((detail, index) => (
            <div key={index} className="train-detail-item">
              <div className="train-detail-icon">{detail.icon}</div>
              <div className="train-detail-content">
                <span className="train-detail-label">{detail.label}</span>
                <span className="train-detail-value">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="train-action-buttons">
        <button className="train-print-button">
          <FaPrint /> Print Ticket
        </button>
        <button className="train-modify-button">
          <FaEdit /> Modify Booking
        </button>
      </div>

      <div className="train-pnr-button-container">
        <button 
          className="train-pnr-button"
          onClick={() => navigate('/trainpnr', { state: { trainData: trainDetails } })}
        >
          Check PNR Status
        </button>
      </div>
    </div>
  );
};

export default Ourmain(TrainPage);