import React from 'react';
import { useLocation } from 'react-router-dom';
import Ourmain from '../hoc/Ourmain'; // Import Ourmain HOC
import './Hotelpage.css';

const Hotelpage = () => {
  const location = useLocation();
  const hotelData = location.state || {}; // Retrieve the data passed via navigation

  return (
    <div className="hotel-page">
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Hotel Booking Details</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Field</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(hotelData).map(([key, value]) => (
              <tr key={key}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{key}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ourmain(Hotelpage); // Wrap the component with Ourmain HOC