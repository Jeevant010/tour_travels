import React from 'react';
import '../Contact.css';
function Contact() {
  return (
    <div className="contact">
      <h2>Contact a Travel Agent</h2>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Preferred Destination:</label>
          <input type="text" id="destination" placeholder="Enter your preferred destination" />
        </div>
        <div className="form-group">
          <label htmlFor="travel-dates">Travel Dates:</label>
          <input type="text" id="travel-dates" placeholder="Enter your travel dates" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Additional Details:</label>
          <textarea id="message" placeholder="Enter any additional details"></textarea>
        </div>
        <button type="submit" className="submit-button">Contact Agent</button>
      </form>
    </div>
  );
}

export default Contact;