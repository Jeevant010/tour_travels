import React from 'react';
import './Rentalpage.css';
import Ourmain from '../hoc/Ourmain'; // Import Ourmain HOC
import { useLocation } from 'react-router-dom'; // Import useLocation to retrieve passed data

const Rentalpage = () => {
  const location = useLocation();
  const rentalData = location.state || {}; // Retrieve the data passed via navigation

  return (
    <div className="rental-page">
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Rental Booking Details</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Field</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rentalData).map(([key, value]) => (
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

export default Ourmain(Rentalpage); // Wrap the component with Ourmain