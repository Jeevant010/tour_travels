import React, { useState } from "react";
import Ourmain from "../hoc/Ourmain";
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const airports = [
    { code: "DEL", name: "Indira Gandhi International Airport", lat: 28.5562, lon: 77.1000, connections: ["BOM", "BLR", "CCU", "MAA", "HYD", "JAI", "LKO", "AMD", "PNQ", "SXR", "GAU"] },
    { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", lat: 19.0887, lon: 72.8679, connections: ["DEL", "BLR", "HYD", "MAA", "GOI", "PNQ", "AMD", "NAG"] },
    { code: "BLR", name: "Kempegowda International Airport", lat: 13.1986, lon: 77.7066, connections: ["DEL", "BOM", "MAA", "HYD", "COK", "TRV", "IXE", "GOI"] },
    { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", lat: 22.6547, lon: 88.4467, connections: ["DEL", "HYD", "GAU", "IXB", "BBI", "GAY"] },
    { code: "MAA", name: "Chennai International Airport", lat: 12.9941, lon: 80.1707, connections: ["DEL", "BOM", "BLR", "HYD", "IXM", "TRV"] },
    { code: "HYD", name: "Rajiv Gandhi International Airport", lat: 17.2403, lon: 78.4294, connections: ["DEL", "BOM", "BLR", "CCU", "MAA", "VTZ"] },
    { code: "AMD", name: "Sardar Vallabhbhai Patel International Airport", lat: 23.0732, lon: 72.6316, connections: ["DEL", "BOM", "PNQ", "RAJ", "STV"] },
    { code: "COK", name: "Cochin International Airport", lat: 10.1520, lon: 76.4019, connections: ["BLR", "TRV", "MAA", "IXE"] },
    { code: "IXE", name: "Mangaluru International Airport", lat: 12.9613, lon: 74.8890, connections: ["BLR", "COK"] },
    { code: "GOI", name: "Goa International Airport", lat: 15.3808, lon: 73.8314, connections: ["BOM", "BLR"] },
    { code: "PNQ", name: "Pune International Airport", lat: 18.5822, lon: 73.9197, connections: ["BOM", "DEL", "AMD"] },
    { code: "JAI", name: "Jaipur International Airport", lat: 26.8242, lon: 75.8122, connections: ["DEL", "LKO"] },
    { code: "LKO", name: "Lucknow International Airport", lat: 26.7606, lon: 80.8893, connections: ["DEL", "JAI"] },
    { code: "IXC", name: "Chandigarh International Airport", lat: 30.6735, lon: 76.7885, connections: ["DEL", "SXR"] },
    { code: "TRV", name: "Thiruvananthapuram International Airport", lat: 8.4821, lon: 76.9201, connections: ["COK", "BLR", "MAA"] },
    { code: "SXR", name: "Srinagar International Airport", lat: 33.9871, lon: 74.7742, connections: ["DEL", "IXC"] },
    { code: "IXM", name: "Madurai International Airport", lat: 9.8345, lon: 78.0934, connections: ["MAA"] },
    { code: "BDQ", name: "Vadodara Airport", lat: 22.3362, lon: 73.2263, connections: ["AMD", "STV"] },
    { code: "STV", name: "Surat International Airport", lat: 21.1141, lon: 72.7418, connections: ["AMD", "BDQ"] },
    { code: "BHO", name: "Bhopal Raja Bhoj Airport", lat: 23.2875, lon: 77.3374, connections: ["DEL", "IDR"] },
    { code: "IDR", name: "Indore Devi Ahilyabai Holkar Airport", lat: 22.7216, lon: 75.8011, connections: ["BHO", "DEL", "BOM"] },
    { code: "NAG", name: "Nagpur Dr. Babasaheb Ambedkar International Airport", lat: 21.0922, lon: 79.0472, connections: ["BOM", "DEL"] },
    { code: "GAY", name: "Gaya International Airport", lat: 24.7443, lon: 84.9512, connections: ["CCU"] },
    { code: "VTZ", name: "Visakhapatnam International Airport", lat: 17.7215, lon: 83.2245, connections: ["HYD"] },
    { code: "DIB", name: "Dibrugarh Airport", lat: 27.4839, lon: 95.0169, connections: ["GAU"] },
    { code: "GAU", name: "Guwahati Lokpriya Gopinath Bordoloi International Airport", lat: 26.1061, lon: 91.5859, connections: ["DEL", "CCU", "DIB"] },
    { code: "MYQ", name: "Mysuru Airport", lat: 12.2300, lon: 76.6558, connections: ["BLR"] },
    { code: "RAJ", name: "Rajkot Airport", lat: 22.3092, lon: 70.7795, connections: ["AMD"] },
    { code: "IXB", name: "Bagdogra International Airport", lat: 26.6812, lon: 88.3286, connections: ["CCU"] },
    { code: "IXA", name: "Agartala Maharaja Bir Bikram Airport", lat: 23.8860, lon: 91.2404, connections: ["GAU"] },
    { code: "IMF", name: "Imphal Tulihal Airport", lat: 24.7600, lon: 93.8960, connections: ["GAU"] },
    { code: "SHL", name: "Shillong Umroi Airport", lat: 25.7036, lon: 91.9787, connections: ["GAU"] },
    { code: "BBI", name: "Bhubaneswar Biju Patnaik International Airport", lat: 20.2444, lon: 85.8178, connections: ["CCU"] },
    { code: "IXR", name: "Ranchi Birsa Munda Airport", lat: 23.3145, lon: 85.3219, connections: ["DEL"] },
    { code: "UDR", name: "Udaipur Maharana Pratap Airport", lat: 24.6177, lon: 73.8961, connections: ["DEL"] },
    { code: "IXU", name: "Aurangabad Chikkalthana Airport", lat: 19.8627, lon: 75.3984, connections: ["BOM"] },
    { code: "IXJ", name: "Jammu Satwari Airport", lat: 32.6891, lon: 74.8374, connections: ["DEL"] }
  ];
  

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

function hasConnection(fromCode, toCode) {
  if (fromCode === toCode) return false;
  const airport = airports.find(a => a.code === fromCode);
  return airport?.connections.includes(toCode);
}

function FlightOpt() {
  const location = useLocation();
  const navigate = useNavigate();
  const flightData = location.state?.flightData || {};
  const [highlightedRoute, setHighlightedRoute] = useState(null);
  const [showOptimized, setShowOptimized] = useState(false);

  const extractCityName = (cityString) => {
    if (!cityString) return '';
    return cityString.split('(')[0].trim();
  };

  function findOptimizedRoutes(originCity, destinationCity) {
    const originAirport = airports.find(a => 
      a.name.toLowerCase() === originCity.toLowerCase() ||
      a.code.toLowerCase() === originCity.toLowerCase()
    );
    
    const destAirport = airports.find(a => 
      a.name.toLowerCase() === destinationCity.toLowerCase() ||
      a.code.toLowerCase() === destinationCity.toLowerCase()
    );
    
    if (!originAirport || !destAirport) {
      console.error('Could not find airports:', { originCity, destinationCity });
      return null;
    }

    const directDistance = calculateDistance(
      originAirport.lat, originAirport.lon,
      destAirport.lat, destAirport.lon
    );

    const hasDirectConnection = hasConnection(originAirport.code, destAirport.code);

    const possibleConnections = airports.filter(a => 
      a.code !== originAirport.code && 
      a.code !== destAirport.code &&
      hasConnection(originAirport.code, a.code) && 
      hasConnection(a.code, destAirport.code)
    );

    const oneStopRoutes = possibleConnections.map(connection => {
      const firstLeg = calculateDistance(
        originAirport.lat, originAirport.lon,
        connection.lat, connection.lon
      );
      const secondLeg = calculateDistance(
        connection.lat, connection.lon,
        destAirport.lat, destAirport.lon
      );
      return {
        via: connection.name,
        viaCode: connection.code,
        totalDistance: firstLeg + secondLeg,
        firstLegDistance: firstLeg,
        secondLegDistance: secondLeg,
        savings: directDistance - (firstLeg + secondLeg),
        originCode: originAirport.code,
        destCode: destAirport.code
      };
    });

    oneStopRoutes.sort((a, b) => a.totalDistance - b.totalDistance);

    return {
      directDistance,
      hasDirectConnection,
      oneStopRoutes: oneStopRoutes.slice(0, 3),
      origin: originAirport,
      destination: destAirport
    };
  }

  const optimizationData = flightData.Departure_From && flightData.Going_to ? 
    findOptimizedRoutes(
      extractCityName(flightData.Departure_From),
      extractCityName(flightData.Going_to)
    ) : null;

  const handleOptimizeClick = () => {
    if (!optimizationData) return;
    
    setShowOptimized(true);
    
    if (optimizationData.hasDirectConnection) {
      setHighlightedRoute({
        from: optimizationData.origin.code,
        to: optimizationData.destination.code
      });
    } else if (optimizationData.oneStopRoutes.length > 0) {
      setHighlightedRoute({
        from: optimizationData.origin.code,
        to: optimizationData.oneStopRoutes[0].viaCode,
        from2: optimizationData.oneStopRoutes[0].viaCode,
        to2: optimizationData.destination.code
      });
    }
  };

  if (Object.keys(flightData).length === 0) {
    return (
      <div className="flight-page" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Helmet><title>No Flight Data</title></Helmet>
        <h1>No Flight Data Available</h1>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="flight-page">
      <Helmet><title>Optimized Flight Options</title></Helmet>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Optimized Flight Options</h1>
        
        <h2>Your Flight Details</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', marginBottom: '40px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Field</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(flightData).map(([key, value]) => (
              <tr key={key}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {key.replace(/_/g, ' ')}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {typeof value === 'object' ? 
                    JSON.stringify(value, null, 2) : 
                    String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {optimizationData && (
          <div style={{ marginTop: '40px' }}>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3>{optimizationData.hasDirectConnection ? 'Direct Flight' : 'No Direct Flight Available'}</h3>
              <p>
                <strong>{optimizationData.origin.name} ({optimizationData.origin.code})</strong> to{' '}
                <strong>{optimizationData.destination.name} ({optimizationData.destination.code})</strong>
              </p>
              <p>Distance: {optimizationData.directDistance} km</p>
              {!optimizationData.hasDirectConnection && (
                <p style={{ color: '#f44336' }}>No direct connection available</p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Route Optimization</h2>
              <button 
                onClick={handleOptimizeClick}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                Show Optimized Route
              </button>
            </div>

            {optimizationData.oneStopRoutes.length > 0 && (
              <>
                <h3>Connecting Flight Options</h3>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  {optimizationData.oneStopRoutes.map((route, index) => (
                    <div key={index} style={{
                      backgroundColor: '#e9f7ef',
                      padding: '15px',
                      borderRadius: '8px',
                      flex: '1',
                      minWidth: '300px'
                    }}>
                      <h4>Option {index + 1}: Via {route.via}</h4>
                      <p>
                        <strong>First Leg:</strong> {optimizationData.origin.name} → {route.via}{' '}
                        ({route.firstLegDistance} km)
                      </p>
                      <p>
                        <strong>Second Leg:</strong> {route.via} → {optimizationData.destination.name}{' '}
                        ({route.secondLegDistance} km)
                      </p>
                      <p>
                        <strong>Total Distance:</strong> {route.totalDistance} km{' '}
                        {route.savings > 0 ? (
                          <span style={{ color: 'green' }}>
                            (Save {route.savings} km compared to direct)
                          </span>
                        ) : (
                          <span style={{ color: 'red' }}>
                            ({Math.abs(route.savings)} km longer than direct)
                          </span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        <h2>Flight Connection Matrix</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          Showing only available direct flight routes between major hubs
          {showOptimized && highlightedRoute && (
            <span style={{ color: '#4caf50', fontWeight: 'bold', marginLeft: '10px' }}>
              Optimized route highlighted
            </span>
          )}
        </p>
        
        <div style={{ overflowX: 'auto', marginTop: '30px' }}>
          <table style={{ 
            width: 'max-content', 
            borderCollapse: 'collapse',
            margin: '0 auto'
          }}>
            <thead>
              <tr>
                <th style={{ 
                  border: '1px solid #ddd', 
                  padding: '12px',
                  position: 'sticky',
                  left: 0,
                  backgroundColor: 'white'
                }}>From \ To</th>
                {airports.map(airport => (
                  <th key={airport.code} style={{ 
                    border: '1px solid #ddd', 
                    padding: '12px',
                    minWidth: '60px'
                  }}>
                    {airport.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {airports.map(fromAirport => (
                <tr key={fromAirport.code}>
                  <td style={{ 
                    border: '1px solid #ddd', 
                    padding: '12px',
                    fontWeight: 'bold',
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'white'
                  }}>
                    {fromAirport.code}
                  </td>
                  {airports.map(toAirport => {
                    const hasDirectFlight = hasConnection(fromAirport.code, toAirport.code);
                    const isHighlighted = showOptimized && highlightedRoute && (
                      (fromAirport.code === highlightedRoute.from && toAirport.code === highlightedRoute.to) ||
                      (fromAirport.code === highlightedRoute.from2 && toAirport.code === highlightedRoute.to2)
                    );
                    
                    return (
                      <td 
                        key={`${fromAirport.code}-${toAirport.code}`}
                        style={{ 
                          border: '1px solid #ddd', 
                          padding: '12px',
                          textAlign: 'center',
                          backgroundColor: isHighlighted ? '#ffeb3b' : 
                                         hasDirectFlight ? '#e8f5e9' : 'transparent',
                          fontWeight: isHighlighted ? 'bold' : 'normal',
                          position: 'relative'
                        }}
                      >
                        {hasDirectFlight ? (
                          <>
                            {calculateDistance(
                              fromAirport.lat, fromAirport.lon,
                              toAirport.lat, toAirport.lon
                            )}
                            {isHighlighted && (
                              <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                width: '16px',
                                height: '16px',
                                backgroundColor: '#ff5722',
                                borderRadius: '50%'
                              }}></div>
                            )}
                          </>
                        ) : (
                          <span style={{ color: '#bbb' }}>—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>Airport Codes Legend</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            {airports.map(airport => (
              <div key={airport.code} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '8px',
                  fontWeight: 'bold'
                }}>
                  {airport.code}
                </div>
                <span>{airport.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ourmain(FlightOpt);