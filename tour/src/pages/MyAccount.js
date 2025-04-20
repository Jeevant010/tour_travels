import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import Ourmain from '../hoc/Ourmain.jsx';
import { backendUrl } from '../utils/config.js';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

// Decode JWT token to extract user data
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.user || decoded; // Handle both nested and flat token structures
  } catch (err) {
    console.error('Token decode error:', err);
    return null;
  }
};

function MyAccount() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    bookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          console.error("No token found. Redirecting to login.");
          navigate('/auth/login');
          return;
        }
    
        const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
        const apiUrl = isDev 
          ? 'http://localhost:8080/auth/me' // Explicitly define the local development URL
          : `${backendUrl}/auth/me`;
    
        console.log("API URL:", apiUrl);
        console.log("Token:", token);
    
        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token.trim()}`
          },
          credentials: 'include'
        });
    
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          if (response.status === 404) {
            throw new Error('The requested resource was not found. Please contact support.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Fetched user data:", data);
    
        setUserData({
          name: data.fullName || data.name || 'No name',
          email: data.email || 'No email',
          phone: data.phone || 'No phone',
          bookings: data.bookings || []
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        if (err.message.includes('401')) {
          handleLogout();
        } else if (err.message.includes('404')) {
          setError('The requested resource was not found. Please try again later or contact support.');
        } else {
          const tokenData = decodeToken(cookies.token);
          if (tokenData) {
            console.log("Decoded token data:", tokenData);
            setUserData({
              name: tokenData.fullName || tokenData.name || 'No name (from token)',
              email: tokenData.email || 'No email (from token)',
              phone: tokenData.phone || 'No phone (from token)',
              bookings: tokenData.bookings || []
            });
            setError('Using limited data from token. Some features may not work.');
          } else {
            setError(err.message || 'Failed to load profile data');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookies.token, navigate]);

  // Handle logout
  const handleLogout = () => {
    removeCookie('token', { path: '/' });
    navigate('/auth/login');
  };

  // Loading state
  if (loading) {
    return (
      <div className="my-account">
        <h1 className="account-title">My Account</h1>
        <div className="loading-message">
          <div className="spinner"></div>
          Loading your account information...
        </div>
      </div>
    );
  }

  // Error state
  if (error && !userData.email) {
    return (
      <div className="my-account">
        <h1 className="account-title">My Account</h1>
        <div className="error-message">
          <p>{error}</p>
          <div className="action-buttons">
            <button onClick={() => window.location.reload()} className="retry-button">
              Retry
            </button>
            <button onClick={handleLogout} className="logout-button">
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="my-account">
      <h1 className="account-title">My Account</h1>
      
      {error && (
        <div className="warning-message">
          <p>{error}</p>
        </div>
      )}

      <div className="account-details">
        <div className="account-section">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <button className="account-button">Edit Profile</button>
        </div>

        <div className="account-section">
          <h2>Booking History</h2>
          {userData.bookings.length > 0 ? (
            <ul className="booking-list">
              {userData.bookings.map((booking, index) => (
                <li key={index} className="booking-item">
                  <h3>{booking.tour?.name || 'Unnamed Tour'}</h3>
                  <p><strong>Date:</strong> {booking.date ? new Date(booking.date).toLocaleDateString() : 'Not specified'}</p>
                  <p><strong>Status:</strong> {booking.status || 'Pending'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-bookings">
              No bookings found. <Link to="/tours" className="explore-link">Explore tours</Link>
            </p>
          )}
        </div>

        <div className="account-section">
          <h2>Account Actions</h2>
          <button className="account-button">Change Password</button>
          <button className="account-button danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(MyAccount);