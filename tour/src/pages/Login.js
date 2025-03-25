import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import Ourmain from '../hoc/Ourmain.jsx';

function Login() {
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
        <div className="login-container">
          <h2>Login</h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-redirect">
            Don't have an account? <Link to="/auth/signup" className="signup-link">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Ourmain(Login);