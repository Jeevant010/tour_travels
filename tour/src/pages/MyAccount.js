import React, { useEffect, useState } from 'react';
import './MyAccount.css';
import Ourmain from '../hoc/Ourmain.jsx';
import { backendUrl } from '../utils/config.js';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

function MyAccount() {
  const [userData, setUserData] = useState({
    name: 'John Doe', // Default values for testing
    email: 'john@example.com',
    phone: '1234567890',
    bookings: [
      {
        tourName: 'Paris Adventure',
        date: '2023-12-15T00:00:00.000Z',
        status: 'confirmed'
      }
    ]
  });
  const [loading, setLoading] = useState(false); // Set to false for testing
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

        let response = await fetch(`${backendUrl}/api/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.token}`
          }
        });

        if (response.status === 404) {
          console.warn('Endpoint /api/users/me not found. Trying alternative endpoint...');
          response = await fetch(`${backendUrl}/user/profile`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${cookies.token}`
            }
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err.message);
        setError('Failed to load account information. Showing demo data instead.');

        // Use default demo data if API fails
        setUserData({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          bookings: [
            {
              tourName: 'Paris Adventure',
              date: '2023-12-15T00:00:00.000Z',
              status: 'confirmed'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [cookies.token, navigate]);

  const handleLogout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    navigate('/auth/login');
  };

  // Remove loading state for now since we're using demo data
  if (false) {
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
          {error} <button onClick={() => window.location.reload()}>Retry</button>
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
                  <h3>{booking.tourName}</h3>
                  <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings yet. <Link to="/tours">Explore tours</Link></p>
          )}
        </div>

        <div className="account-section">
          <h2>Account Actions</h2>
          <button className="account-button">Change Password</button>
          <button className="account-button logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(MyAccount);