import React, { useState } from 'react';
import './Flight.css';

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    departureCity: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    flightType: 'one-way', // New field
    passengers: 1, // New field
  });

  const [errors, setErrors] = useState({}); // For validation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.departureCity) newErrors.departureCity = 'Departure city is required';
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (formData.flightType === 'round-trip' && !formData.returnDate) {
      newErrors.returnDate = 'Return date is required for round-trip';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the form data to a backend or API
      console.log('Form Data Submitted:', formData);
      alert('Flight search successful! Check the console for details.');
    } else {
      console.log('Form has errors:', errors);
    }
  };

  const handleClear = () => {
    setFormData({
      departureCity: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      flightType: 'one-way',
      passengers: 1,
    });
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Flight Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="flightType">Flight Type:</label>
          <select
            id="flightType"
            name="flightType"
            value={formData.flightType}
            onChange={handleChange}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="departureCity">Departure City:</label>
          <input
            type="text"
            id="departureCity"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            required
          />
          {errors.departureCity && <span className="error">{errors.departureCity}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
          {errors.destination && <span className="error">{errors.destination}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
          {errors.departureDate && <span className="error">{errors.departureDate}</span>}
        </div>

        {formData.flightType === 'round-trip' && (
          <div className="form-group">
            <label htmlFor="returnDate">Return Date:</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
            />
            {errors.returnDate && <span className="error">{errors.returnDate}</span>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="passengers">Passengers:</label>
          <input
            type="number"
            id="passengers"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            min="1"
            max="10"
          />
        </div>

        <div className="button-group">
          <button type="submit">Search Flights</button>
          <button type="button" onClick={handleClear} className="clear-button">
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightBooking;