import React, { useState } from 'react';
import './Hotels.css';

const Hotels = () => {
  const [formData, setFormData] = useState({
    location: '',
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    roomType: 'single',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.checkInDate) newErrors.checkInDate = 'Check-in date is required';
    if (!formData.checkOutDate) newErrors.checkOutDate = 'Check-out date is required';
    if (formData.guests < 1) newErrors.guests = 'Number of guests must be at least 1';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      alert('Hotel search successful! Check the console for details.');
    } else {
      console.log('Form has errors:', errors);
    }
  };

  const handleClear = () => {
    setFormData({
      location: '',
      checkInDate: '',
      checkOutDate: '',
      guests: 1,
      roomType: 'single',
    });
    setErrors({});
  };

  return (
    <div className="hotel-booking-container">
      <h1>Hotel Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter city or hotel name"
          />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
          />
          {errors.checkInDate && <span className="error">{errors.checkInDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="checkOutDate">Check-out Date:</label>
          <input
            type="date"
            id="checkOutDate"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
          />
          {errors.checkOutDate && <span className="error">{errors.checkOutDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests:</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
          />
          {errors.guests && <span className="error">{errors.guests}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="roomType">Room Type:</label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
          >
            <option value="single">Single Room</option>
            <option value="double">Double Room</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div className="button-group">
          <button type="submit">Search Hotels</button>
          <button type="button" onClick={handleClear} className="clear-button">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Hotels;