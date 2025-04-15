import React, { useState } from 'react';
import '../Contact.css';
import Ourmain from '../hoc/Ourmain';

function Contact() {
  const [formData, setFormData] = useState({
    My_Name: '',  
    email: '',
    phone: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:8080/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send your message.');
      }

      setSuccessMessage('Your message has been sent successfully!');
      setFormData({ My_Name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage(error.message || 'Failed to send your message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Reach out to us for any inquiries or assistance.</p>
      </div>
      <div className="contact-content">
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="My_Name">Your Name:</label>  {/* Changed id to My_Name */}
              <input
                type="text"
                id="My_Name"
                placeholder="Enter your name"
                value={formData.My_Name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message:</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </button>
          </form>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className="contact-info-section">
          <h2>Contact Information</h2>
          <p>If you prefer, you can also reach us directly:</p>
          <ul className="contact-info-list">
            <li><strong>Email:</strong> EasyTravel@gmail.com</li>
            <li><strong>Phone:</strong> +91 1234567891</li>
            <li><strong>Address:</strong> Kamrej, Surat, India</li>
          </ul>
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday - Sunday: Closed</p>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(Contact);