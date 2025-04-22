import React from 'react';
import './HotelPage.css';
import Ourmain from '../hoc/Ourmain';
import { useLocation } from 'react-router-dom';

const HotelPage = () => {
  const location = useLocation();
  const hotelData = location.state || {};

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
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ourmain(HotelPage);