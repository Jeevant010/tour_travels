import React, { useState, useEffect } from 'react';
import './TaxiPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaTaxi, FaCalendarAlt, FaPrint, FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const TaxiPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [taxiDetails, setTaxiDetails] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    if (location.state?.taxiData?.taxi) {
      const details = location.state.taxiData.taxi;

      if (details.PickUp_Date) {
        const currentDate = new Date();
        const pickupDate = new Date(details.PickUp_Date);

        if (pickupDate <= currentDate) {
          setDateError('Pickup date must be greater than the current date');
        } else if (pickupDate.toDateString() === currentDate.toDateString() && details.pickupTime) {
          const [pickupHours, pickupMinutes] = details.pickupTime.split(':').map(Number);
          const currentHours = currentDate.getHours();
          const currentMinutes = currentDate.getMinutes();

          if (pickupHours < currentHours || (pickupHours === currentHours && pickupMinutes <= currentMinutes)) {
            setDateError('Pickup time must be greater than the current time');
          } else {
            setDateError(null);
          }
        } else {
          setDateError(null);
        }
      }

      setTaxiDetails(details);
    }
  }, [location.state]);

  useEffect(() => {
    if (location.state?.taxiData?.message) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.taxiData?.message]);

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

  const displayData = taxiDetails ? [
    { 
      icon: <FaTaxi className="taxi-icon" />,
      label: 'Pickup Location', 
      value: taxiDetails.PickUp_Location?.split('(')[0]?.trim() || 'Not specified',
      code: taxiDetails.PickUp_Location?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaTaxi className="taxi-icon" />,
      label: 'Drop-off Location', 
      value: taxiDetails.Drop_Location?.split('(')[0]?.trim() || 'Not specified',
      code:taxiDetails.Drop_Location?.match(/\(([^)]+)\)/)?.[1] || ''
    },
    { 
      icon: <FaCalendarAlt className="taxi-icon" />,
      label: 'Pickup Date', 
      value: formatDate(taxiDetails.PickUp_Date) || 'Not specified'
    },
    { 
      icon: <FaCalendarAlt className="taxi-icon" />,
      label: 'Pickup Time', 
      value: formatTime(taxiDetails.PickUp_Time) || 'Not specified'
    },
    
  ] : null;

  if (!taxiDetails) {
    return (
      <div className="taxi-page-container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="error-state">
          <h1>Taxi Details Not Available</h1>
          <p>We couldn't retrieve your taxi information.</p>
          <button onClick={() => navigate(-1)} className="taxi-action-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="taxi-page-container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="taxi-header">
        <h1 className="taxi-title">Your Taxi Booking Details</h1>
        <p className="taxi-subtitle">Review your journey information</p>
      </div>

      {dateError && (
        <div className="taxi-error-message">
          {dateError}
        </div>
      )}

      {showSuccessMessage && (
        <div className="taxi-success-message">
          {location.state.taxiData.message}
        </div>
      )}

      <div className="taxi-summary-card">
        <div className="taxi-details-grid">
          {displayData.map((detail, index) => (
            <div key={index} className="taxi-detail-item">
              <div className="taxi-detail-icon">{detail.icon}</div>
              <div className="taxi-detail-content">
                <span className="taxi-detail-label">{detail.label}</span>
                <span className="taxi-detail-value">{detail.value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="taxi-action-buttons">
        <button className="taxi-print-button">
          <FaPrint /> Print Booking
        </button>
        <button 
        className="taxi-modify-button"
        onClick={() => navigate('/', { state: { activeTab: 'taxi' } })}>
          <FaEdit /> Modify Booking
        </button>
      </div>
    </div>
  );
};

export default Ourmain(TaxiPage);