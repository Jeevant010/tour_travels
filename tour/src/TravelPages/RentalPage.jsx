import React, { useState, useEffect } from 'react';
import './RentalPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCar, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCity } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const RentalPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [rentalDetails, setrentalDetails] = useState(null);
    const [dateError, setDateError] = useState(null);
  useEffect(() => {
    if (location.state?.rentalData?.rentals) {
      const details = location.state.rentalData.rentals;
      setrentalDetails(details);
    }
    
  }, [location.state]);


  useEffect(() => {
  console.log('Location State:', location.state);
  if (location.state?.rentalData?.rentals) {
    setrentalDetails(location.state.rentalData.rentals);
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
  const displayData = rentalDetails ? [
    {
      icon: <FaMapMarkerAlt className="rental-icon" />,
      label: 'State',
      value: rentalDetails.State?.split('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.State?.match(/\(([^)]+)\)/)?.[1] || 'Not specified',
    },
    {
      icon: <FaCity className="rental-icon" />,
      label: 'City',
      value: rentalDetails.City?.split('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.City?.match(/\(([^)]+)\)/)?.[1] || 'Not specified',
    },
    {
      icon: <FaCar className="rental-icon" />,
      label: 'Vehicle Type',
      value: rentalDetails.Vehicle_Type?.split('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.Vehicle_Type?.match(/\(([^)]+)\)/)?.[1] || 'Not specified',
    },
    {
      icon: <FaClock className="rental-icon" />,
      label: 'Duration (in days)',
      value: rentalDetails.Duration?.split('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.Duration?.match(/\(([^)]+)\)/)?.[1] || 'Not specified', 
    },
    {
      icon: <FaCalendarAlt className="rental-icon" />,
      label: 'Rental Date',
      value: formatDate(rentalDetails.Date)?.splti('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.Date?.match(/\(([^)]+)\)/)?.[1] || 'Not specified',
    },
    {
      icon: <FaMapMarkerAlt className="rental-icon" />,
      label: 'Location',
      value: rentalDetails.Location?.split('(')[0]?.rental() || 'Not specified',
      code: rentalDetails.Location?.match(/\(([^)]+)\)/)?.[1] || 'Not specified',
    },
  ] : null;

  if (!rentalDetails) {
    return (
      <div className="rental-page-container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="error-state">
          <h1>Rental Details Not Available</h1>
          <p>We couldn't retrieve your rental information.</p>
          <button onClick={() => navigate(-1)} className="rental-action-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rental-page-container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="rental-header">
        <h1 className="rental-title">Your Rental Details</h1>
        <p className="rental-subtitle">Review your rental information</p>
      </div>

      <div className="rental-summary-card">
        <div className="rental-details-grid">
          {displayData.map((detail, index) => (
            <div key={index} className="rental-detail-item">
              <div className="rental-detail-icon">{detail.icon}</div>
              <div className="rental-detail-content">
                <span className="rental-detail-label">{detail.label}</span>
                <span className="rental-detail-value">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rental-action-buttons">
        <button
          className="rental-modify-button"
          onClick={() => navigate('/', { state: { activeTab: 'rental' } })}
        >
                    Modify Booking
        </button>
      </div>
    </div>
  );
};

export default Ourmain(RentalPage);