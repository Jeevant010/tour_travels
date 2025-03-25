import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';

// import Ourmain from '../hoc/Ourmain';

function Signup() {
  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/composition-small-airplanes-bus-passport-map_23-2148169874.jpg?ga=GA1.1.1599877780.1738726996&semt=ais_hybrid')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <div className="signup-container">
          <h2>Signup</h2>
          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea id="address" placeholder="Enter your address" rows="3" required></textarea>
            </div>
            <button type="submit" className="signup-button">Signup</button>
          </form>
          <p className="login-redirect">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;