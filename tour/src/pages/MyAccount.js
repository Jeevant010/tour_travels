import React from 'react';
import './MyAccount.css';

function MyAccount() {
  return (
    <div className="my-account">
      <h1 className="account-title">My Account</h1>
      <div className="account-details">
        <div className="account-section">
          <h2>Personal Information</h2>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +123 456 7890</p>
        </div>
        <div className="account-section">
          <h2>Booking History</h2>
          <ul>
            <li>Flight to New York - March 10, 2025</li>
            <li>Hotel in Paris - February 20, 2025</li>
            <li>Train to London - January 15, 2025</li>
          </ul>
        </div>
        <div className="account-section">
          <h2>Settings</h2>
          <button className="account-button">Edit Profile</button>
          <button className="account-button">Change Password</button>
          <button className="account-button">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;