

import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import Ourmain from '../hoc/Ourmain.jsx';
import { backendUrl } from '../utils/config.js';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

function MyAccount() {
  const [userData, setUserData] = useState(null); // Start with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = cookies.token;
        
        // 1. Validate token exists
        if (!token) {
          throw new Error('No authentication token found');
        }
  
        // 2. Make API request
        const response = await fetch(`${backendUrl}/api/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
  
        // 3. Handle 404 specifically
        if (response.status === 404) {
          throw new Error('Endpoint not found. Contact support.');
        }
  
        // 4. Handle all other errors
        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }
  
        // 5. Process successful response
        const data = await response.json();
        setUserData({
          name: data.fullName || data.name || 'Guest',
          email: data.email || 'No email provided',
          phone: data.phone || 'Not provided',
          bookings: data.bookings || []
        });
  
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        
        // 6. Handle specific error cases
        if (err.message.includes('No authentication') || 
            err.message.includes('expired')) {
          removeCookie('token', { path: '/' });
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [cookies.token, navigate, removeCookie]); // Correct dependencies

  const handleLogout = () => {
    // Clear token from cookies
    removeCookie('token', { path: '/' });
    
    // Optional: Call backend logout
    fetch(`${backendUrl}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    }).finally(() => {
      navigate('/auth/login');
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-screen">
        <h2>Something went wrong</h2>
        <p className="error-message">{error}</p>
        <div className="action-buttons">
          <button onClick={() => window.location.reload()}>Retry</button>
          <button onClick={handleLogout}>Back to Login</button>
        </div>
      </div>
    );
  }

  // No data state (prevents white screen)
  if (!userData) {
    return (
      <div className="no-data-screen">
        <h2>No account data available</h2>
        <button onClick={handleLogout}>Please login again</button>
      </div>
    );
  }

  // Main render
  // return (
  //   <div className="account-container">
  //     <h1>Welcome, {userData.name}</h1>
      
  //     <section className="account-section">
  //       <h2>Personal Information</h2>
  //       <p><strong>Email:</strong> {userData.email}</p>
  //       <p><strong>Phone:</strong> {userData.phone}</p>
  //     </section>

  //     {/* Rest of your account UI */}
  //   </div>
  // );

  return (
    <div className="my-account">
      <h1>Welcome, {userData.name}</h1>
      
      <div className="account-sections">
        {/* Personal Info Section */}
        <section className="account-section">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{userData.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
          </div>
          <button className="btn-edit">Edit Profile</button>
        </section>

        {/* Bookings Section */}
        <section className="account-section">
          <h2>Your Bookings</h2>
          {userData.bookings.length > 0 ? (
            <ul className="booking-list">
              {userData.bookings.map((booking, index) => (
                <li key={index} className="booking-card">
                  <h3>{booking.tour?.name || 'Unnamed Experience'}</h3>
                  <div className="booking-details">
                    <span>Date: {new Date(booking.date).toLocaleDateString()}</span>
                    <span className={`status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-bookings">
              <p>You haven't made any bookings yet.</p>
              <Link to="/tours" className="btn-explore">
                Explore Available Tours
              </Link>
            </div>
          )}
        </section>

        {/* Account Actions */}
        <section className="account-section actions">
          <h2>Account Management</h2>
          <button className="btn-change-password">Change Password</button>
          <button 
            className="btn-logout"
            onClick={handleLogout}
          >
            Sign Out
          </button>
        </section>
      </div>
    </div>
  );
}

export default Ourmain(MyAccount);