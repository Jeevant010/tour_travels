import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Ourmain from '../hoc/Ourmain.jsx';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverhelper.js';
import { useCookies } from 'react-cookie';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookie, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await makeUnauthenticatedPOSTRequest('/auth/login', data);
      if (response && !response.error) {
        console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie('token', token, { path: '/', expires: date });
        alert('Login successful!');
        navigate('/dashboard');
      } else {
        alert(response.error || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome Back to Your Amazing Tour!</h1>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>Login</h2>
          <p>Enter your credentials to access your account.</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <p className="signup-redirect">
            Don't have an account? <Link to="/auth/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(Login);