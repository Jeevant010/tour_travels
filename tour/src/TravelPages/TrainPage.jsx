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
      
      // If the data is nested under a 'train' property
      const trainData = details.train || details;
      
      if (trainData.Departure_Date && trainData.Return_Date) {
        const departure = new Date(trainData.Departure_Date);
        const returnDate = new Date(trainData.Return_Date);
        
        if (returnDate <= departure) {
          setDateError('Return date must be after departure date');
        } else {
          setDateError(null);
        }
      }
      setTrainDetails(trainData);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.message || location.state?.trainData?.message) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (e) {
      return dateString;
    }
  };

  const displayData = trainDetails ? [
    { 
      icon: <FaTrain className="train-icon departure" />,
      label: 'Departure Station', 
      value: trainDetails.Departure_Form || trainDetails.fromStation || 'Not specified',
      code: (trainDetails.Departure_Form || trainDetails.fromStation)?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaTrain className="train-icon arrival" />,
      label: 'Destination Station', 
      value: trainDetails.Going_to || trainDetails.toStation || 'Not specified',
      code: (trainDetails.Going_to || trainDetails.toStation)?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaCalendarAlt className="train-icon" />,
      label: 'Journey Date', 
      value: formatDate(trainDetails.Departure_Date || trainDetails.journeyDate) || 'Not specified'
    },
    { 
      icon: <FaChair className="train-icon" />,
      label: 'Class', 
      value: trainDetails.AC_Type && trainDetails.class 
        ? `${trainDetails.AC_Type.charAt(0).toUpperCase()}${trainDetails.AC_Type.slice(1)} - ${trainDetails.class.charAt(0).toUpperCase()}${trainDetails.class.slice(1)}`
        : trainDetails.AC_Type 
          ? `${trainDetails.AC_Type.charAt(0).toUpperCase()}${trainDetails.AC_Type.slice(1)}`
          : 'Not specified'
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
          <button onClick={() => navigate(-1)} className="action-button">
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
        <h1 className="train-title">Your Train Journey Details</h1>
        <p className="train-subtitle">Review your booking information</p>
      </div>

      {dateError && (
        <div className="error-message">
          {dateError}
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          {location.state.message || location.state.trainData?.message}
        </div>
      )}

      <div className="train-summary-card">
        <div className="route-display">
          <div className="station departure">
            <span className="station-name">{displayData[0].value}</span>
            {displayData[0].code && (
              <span className="station-code">{displayData[0].code}</span>
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
          </div>
        </div>

        <div className="train-details-grid">
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
          <FaPrint /> Print Details
        </button>
        <button className="modify-button">
          <FaEdit /> Modify Booking
        </button>
      </div>
    </div>
  );
};

export default Ourmain(TrainPage);