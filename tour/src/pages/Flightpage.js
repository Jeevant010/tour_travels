import React from 'react';

const Flightpage = () => {
  const flights = [
    { id: 1, airline: 'Air India', departure: 'Delhi', arrival: 'Mumbai', time: '10:00 AM' },
    { id: 2, airline: 'IndiGo', departure: 'Bangalore', arrival: 'Chennai', time: '12:30 PM' },
    { id: 3, airline: 'SpiceJet', departure: 'Kolkata', arrival: 'Hyderabad', time: '3:45 PM' },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Flight Details</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Airline</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Departure</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Time</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.airline}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.departure}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.arrival}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{flight.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Flightpage;