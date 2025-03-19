import React, { useState } from 'react';

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    departureCity: '',
    destination: '',
    departureDate: '',
    returnDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend or API
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="flight-booking">
      <h1>Flight Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="departureCity">Departure City:</label>
          <input
            type="text"
            id="departureCity"
            name="departureCity"
            value={formData.departureCity}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="returnDate">Return Date:</label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default FlightBooking;