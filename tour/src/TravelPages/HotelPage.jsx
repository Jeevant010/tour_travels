import React, { useState, useEffect } from 'react';
import './HotelPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHotel, FaCalendarAlt, FaUserFriends, FaBed, FaPrint, FaEdit } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

const HotelPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Location state received:', location.state);

    // Extract data from the nested structure
    const hotelData = location.state?.hotelData;
    const bookingDetails = hotelData?.booking;

    if (bookingDetails) {
      console.log('Extracted booking details:', bookingDetails);

      // Validate required fields
      const requiredFields = ['Location', 'Checkin_Date', 'Checkout_Date', 'No_of_Rooms', 'Guests'];
      const missingFields = requiredFields.filter(field => !bookingDetails[field]);

      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
      } else {
        // Validate dates
        try {
          const checkin = new Date(bookingDetails.Checkin_Date);
          const checkout = new Date(bookingDetails.Checkout_Date);
          
          if (checkout <= checkin) {
            setDateError('Checkout date must be after checkin date');
          } else {
            setDateError(null);
          }
        } catch (e) {
          console.error('Date parsing error:', e);
          setDateError('Invalid date format');
        }

        setHotelDetails(bookingDetails);
      }

      // Show success message if exists
      if (hotelData.message) {
        setShowSuccessMessage(true);
        const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
        return () => clearTimeout(timer);
      }
    }

    setLoading(false);
  }, [location.state]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString(undefined, options);
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString;
    }
  };

  const calculateNights = (checkin, checkout) => {
    if (!checkin || !checkout) return 'Not specified';
    try {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date(checkin);
      const secondDate = new Date(checkout);
      
      if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
        return 'Invalid date';
      }
      
      const diffDays = Math.round(Math.abs((secondDate - firstDate) / oneDay));
      return `${diffDays} night${diffDays !== 1 ? 's' : ''}`;
    } catch (e) {
      console.error('Date calculation error:', e);
      return 'Error calculating duration';
    }
  };

  const displayData = hotelDetails ? [
    { 
      icon: <FaHotel className="hotel-icon location" />,
      label: 'Location', 
      value: hotelDetails.Location || 'Not specified'
    },
    { 
      icon: <FaCalendarAlt className="hotel-icon" />,
      label: 'Check-in Date', 
      value: formatDate(hotelDetails.Checkin_Date)
    },
    { 
      icon: <FaCalendarAlt className="hotel-icon" />,
      label: 'Check-out Date', 
      value: formatDate(hotelDetails.Checkout_Date)
    },
    { 
      icon: <FaBed className="hotel-icon" />,
      label: 'Duration', 
      value: calculateNights(hotelDetails.Checkin_Date, hotelDetails.Checkout_Date)
    },
    { 
      icon: <FaBed className="hotel-icon" />,
      label: 'Rooms', 
      value: hotelDetails.No_of_Rooms || 'Not specified'
    },
    { 
      icon: <FaUserFriends className="hotel-icon" />,
      label: 'Guests', 
      value: hotelDetails.Guests || 'Not specified'
    }
  ] : null;

  if (loading) {
    return (
      <div className="hotel-page-container">
        <div className="loading-state">
          <h1>Loading Hotel Details...</h1>
        </div>
      </div>
    );
  }

  if (!hotelDetails) {
    return (
      <div className="hotel-page-container">
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
        </Helmet>
        <div className="error-state">
          <h1>Hotel Details Not Available</h1>
          <p>We couldn't retrieve your hotel information.</p>
          <button onClick={() => navigate(-1)} className="action-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hotel-page-container">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
      </Helmet>

      <div className="hotel-header">
        <h1 className="hotel-title">Your Hotel Booking</h1>
        <p className="hotel-subtitle">Review your reservation details</p>
      </div>

      {dateError && (
        <div className="error-message">
          {dateError}
        </div>
      )}

      {showSuccessMessage && (
        <div className="success-message">
          {location.state?.hotelData?.message}
        </div>
      )}

      <div className="hotel-summary-card">
        <div className="hotel-location-display">
          <div className="hotel-name">
            <FaHotel className="hotel-icon-main" />
            <span className="location-name">{hotelDetails.Location}</span>
          </div>
        </div>

        <div className="date-range-display">
          <div className="date-box">
            <span className="date-label">Check-in</span>
            <span className="date-value">{formatDate(hotelDetails.Checkin_Date)}</span>
          </div>
          
          <div className="duration-display">
            <span className="nights-count">
              {calculateNights(hotelDetails.Checkin_Date, hotelDetails.Checkout_Date)}
            </span>
          </div>
          
          <div className="date-box">
            <span className="date-label">Check-out</span>
            <span className="date-value">{formatDate(hotelDetails.Checkout_Date)}</span>
          </div>
        </div>

        <div className="hotel-details-grid">
          {displayData?.map((detail, index) => (
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
        <button className="print-button" onClick={() => window.print()}>
          <FaPrint /> Print Reservation
        </button>
        <button 
          className="modify-button"
          onClick={() => navigate('/hotel-booking', { state: { initialData: hotelDetails } })}
        >
          <FaEdit /> Modify Booking
        </button>
      </div>
    </div>
  );
};

export default Ourmain(HotelPage);