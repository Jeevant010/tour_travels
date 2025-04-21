
import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import Ourmain from '../hoc/Ourmain.jsx';
import { backendUrl } from '../utils/config.js';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

function MyAccount() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    bookings: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!cookies.token) {
          navigate('/auth/login');
          return;
        }

        setLoading(true);
        setError(null);
        
        // Try multiple possible endpoints
        const endpoints = [
          '/api/user/profile',  // Most common REST convention
          '/user/me',          // Alternative common pattern
          '/api/me',           // Simpler version
          '/auth/user'         // Auth service endpoint
        ];

        let response;
        let successful = false;

        for (const endpoint of endpoints) {
          try {
            response = await fetch(`${backendUrl}${endpoint}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`
              }
            });

            if (response.ok) {
              const data = await response.json();
              setUserData(data);
              successful = true;
              break;
            }
          } catch (err) {
            console.log(`Attempt failed for ${endpoint}:`, err);
            continue;
          }
        }

        if (!successful) {
          // Fallback to token data if all endpoints fail
          const tokenData = decodeToken(cookies.token);
          if (tokenData) {
            setUserData({
              name: tokenData.name || '',
              email: tokenData.email || '',
              phone: tokenData.phone || '',
              bookings: tokenData.bookings || []
            });
            setError('Using limited profile data from token. Some features may not be available.');
          } else {
            throw new Error('All endpoints failed and token could not be decoded');
          }
        }

      } catch (err) {
        console.error('Error:', err);
        setError('Could not load full profile data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookies.token, navigate]);

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      console.log('Decoded token data:', decoded);
      return decoded;
    } catch (err) {
      console.error('Token decode error:', err);
      return null;
    }
  };

  const handleLogout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    navigate('/auth/login');
  };

  if (loading) {
    return (
      <div className="my-account">
        <h1 className="account-title">My Account</h1>
        <div className="loading-message">Loading your account information...</div>
      </div>
    );
  }

  return (
    <div className="my-account">
      <h1 className="account-title">My Account</h1>
      
      {error && (
        <div className="error-message">
          {error}
          <div className="debug-info">
            <small>Please ensure you're using the correct endpoint</small>
          </div>
          <button 
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          <button 
            className="contact-support-button"
            onClick={() => navigate('/support')}
          >
            Contact Support
          </button>
        </div>
      )}

<div className="account-details">
      <div className="account-section">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> {userData.name || 'Not available'}</p>
          <p><strong>Email:</strong> {userData.email || 'Not available'}</p>
          <p><strong>Phone:</strong> {userData.phone || 'Not available'}</p>
          <button className="account-button">Edit Profile</button>
        </div>

        <div className="account-section">
          <h2>Booking History</h2>
          {userData.bookings && userData.bookings.length > 0 ? (
            <ul className="booking-list">
              {userData.bookings.map((booking, index) => (
                <li key={index} className="booking-item">
                  <h3>{booking.tourName}</h3>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found. <Link to="/tours">Explore available tours</Link></p>
          )}
        </div>

        <div className="account-section">
          <h2>Account Actions</h2>
          <button className="account-button">Change Password</button>
          <button 
            className="account-button logout-button" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(MyAccount);