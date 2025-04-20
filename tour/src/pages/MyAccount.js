import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import Ourmain from '../hoc/Ourmain.jsx';
import { backendUrl } from '../utils/config.js';
import { useCookies } from 'react-cookie';
import { useNavigate, Link, useParams } from 'react-router-dom';

function MyAccount() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = cookies.token;
        if (!token) {
          throw new Error('No authentication token found');
        }

        const meResponse = await fetch(`${backendUrl}/auth/get/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!meResponse.ok) {
          throw new Error(meResponse.status === 401 ? 'Session expired' : 'Failed to fetch user data');
        }

        const meData = await meResponse.json();
        const userId = meData._id;

        const userResponse = await fetch(`${backendUrl}/auth/get/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!userResponse.ok) {
          throw new Error('Failed to fetch detailed user data');
        }

        const userData = await userResponse.json();
        
        setUserData({
          _id: userData._id,
          name: userData.fullName || 'Guest',
          email: userData.email || 'No email provided',
          phone: userData.phone || 'Not provided',
          address: userData.address || 'Not provided',
          bookings: Array.isArray(userData.bookings) ? userData.bookings.map(booking => ({
            id: booking._id,
            tourName: booking.tourName,
            date: booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A',
            status: booking.status || 'Pending'
          })) : []
        });

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        if (err.message.includes('No authentication') || 
            err.message.includes('expired') || 
            err.message.includes('Session')) {
          removeCookie('token', { path: '/' });
          navigate('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookies.token, navigate, removeCookie, userId]);

  const handleLogout = async () => {
    try {
      
      await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookies.token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    } finally {
      removeCookie('token', { path: '/' });
      navigate('/auth/login');
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading your account...</p>
      </div>
    );
  }

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

  if (!userData) {
    return (
      <div className="no-data-screen">
        <h2>No account data available</h2>
        <button onClick={handleLogout}>Please login again</button>
      </div>
    );
  }

  return (
    <div className="my-account">
      <h1>Welcome, {userData.name}</h1>
      
      <div className="account-sections">
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
            {userData.address && (
              <div className="info-item">
                <span className="info-label">Address:</span>
                <span className="info-value">{userData.address}</span>
              </div>
            )}
          </div>
          <button className="btn-edit">Edit Profile</button>
        </section>

        <section className="account-section">
          <h2>Your Bookings</h2>
          {userData.bookings.length > 0 ? (
            <ul className="booking-list">
              {userData.bookings.map((booking) => (
                <li key={booking.id} className="booking-card">
                  <h3>{booking.tourName}</h3>
                  <div className="booking-details">
                    <span>Date: {booking.date}</span>
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

        <section className="account-section actions">
          <h2>Account Management</h2>
          <button className="btn-change-password">Change Password</button>
          <button className="btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </section>
      </div>
    </div>
  );
}

export default Ourmain(MyAccount);