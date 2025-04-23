import React from "react";
import Ourmain from "../hoc/Ourmain";
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Airport data with coordinates
const airports = [
    { code: "DEL", name: "Delhi", lat: 28.5562, lon: 77.1000, connections: ["BOM", "BLR", "CCU", "MAA", "HYD", "JAI", "LKO", "AMD", "PNQ", "SXR", "GAU", "BBI", "IXC"] },
    { code: "BOM", name: "Mumbai", lat: 19.0887, lon: 72.8679, connections: ["DEL", "BLR", "HYD", "MAA", "GOI", "PNQ", "AMD", "NAG", "IXU", "BDQ", "IDR"] },
    { code: "BLR", name: "Bengaluru", lat: 13.1986, lon: 77.7066, connections: ["DEL", "BOM", "MAA", "HYD", "COK", "TRV", "IXE", "GOI", "PNQ", "VGA"] },
    { code: "CCU", name: "Kolkata", lat: 22.6547, lon: 88.4467, connections: ["DEL", "HYD", "GAU", "IXB", "BBI", "GAY", "IXA", "IMF", "SHL"] },
    { code: "MAA", name: "Chennai", lat: 12.9941, lon: 80.1707, connections: ["DEL", "BOM", "BLR", "HYD", "IXM", "TRV", "COK"] },
    { code: "HYD", name: "Hyderabad", lat: 17.2403, lon: 78.4294, connections: ["DEL", "BOM", "BLR", "CCU", "MAA", "VTZ", "NAG", "BHO"] },
    { code: "AMD", name: "Ahmedabad", lat: 23.0732, lon: 72.6316, connections: ["DEL", "BOM", "PNQ", "RAJ", "STV", "IDR"] },
    { code: "COK", name: "Kochi", lat: 10.1520, lon: 76.4019, connections: ["BLR", "TRV", "MAA", "IXE"] },
    { code: "IXE", name: "Mangaluru", lat: 12.9613, lon: 74.8890, connections: ["BLR", "COK", "TRV"] },
    { code: "GOI", name: "Dabolim", lat: 15.3808, lon: 73.8314, connections: ["BOM", "BLR", "PNQ"] },
    { code: "PNQ", name: "Pune", lat: 18.5822, lon: 73.9197, connections: ["BOM", "DEL", "BLR", "GOI", "AMD"] },
    { code: "JAI", name: "Jaipur", lat: 26.8242, lon: 75.8122, connections: ["DEL", "LKO", "IXC"] },
    { code: "LKO", name: "Lucknow", lat: 26.7606, lon: 80.8893, connections: ["DEL", "JAI", "BBI"] },
    { code: "IXC", name: "Chandigarh", lat: 30.6735, lon: 76.7885, connections: ["DEL", "JAI", "SXR"] },
    { code: "TRV", name: "Thiruvananthapuram", lat: 8.4821, lon: 76.9201, connections: ["COK", "BLR", "MAA", "IXE"] },
    { code: "SXR", name: "Srinagar", lat: 33.9871, lon: 74.7742, connections: ["DEL", "IXC", "JAM"] },
    { code: "IXM", name: "Madurai", lat: 9.8345, lon: 78.0934, connections: ["MAA", "TRV"] },
    { code: "BDQ", name: "Vadodara", lat: 22.3362, lon: 73.2264, connections: ["BOM", "DEL"] },
    { code: "STV", name: "Surat", lat: 21.1141, lon: 72.7411, connections: ["AMD", "BOM"] },
    { code: "BHO", name: "Bhopal", lat: 23.2875, lon: 77.3375, connections: ["DEL", "HYD"] },
    { code: "IDR", name: "Indore", lat: 22.7251, lon: 75.8011, connections: ["BOM", "AMD"] },
    { code: "NAG", name: "Nagpur", lat: 21.0922, lon: 79.0472, connections: ["BOM", "HYD"] },
    { code: "GAY", name: "Gaya", lat: 24.7440, lon: 84.9512, connections: ["CCU", "BBI"] },
    { code: "VTZ", name: "Visakhapatnam", lat: 17.7215, lon: 83.2245, connections: ["HYD", "BLR"] },
    { code: "DIB", name: "Dibrugarh", lat: 27.4839, lon: 95.0169, connections: ["GAU"] },
    { code: "GAU", name: "Guwahati", lat: 26.1061, lon: 91.5859, connections: ["CCU", "DEL", "DIB", "IXB"] },
    { code: "MYQ", name: "Mysuru", lat: 12.2304, lon: 76.6552, connections: ["BLR"] },
    { code: "RAJ", name: "Rajkot", lat: 22.3094, lon: 70.7799, connections: ["AMD"] },
    { code: "IXB", name: "Siliguri", lat: 26.6812, lon: 88.3286, connections: ["CCU", "GAU"] },
    { code: "IXA", name: "Agartala", lat: 23.8860, lon: 91.2400, connections: ["CCU"] },
    { code: "IMF", name: "Imphal", lat: 24.7600, lon: 93.8960, connections: ["CCU"] },
    { code: "SHL", name: "Shillong", lat: 25.7036, lon: 91.9787, connections: ["GAU"] },
    { code: "BBI", name: "Bhubaneswar", lat: 20.2444, lon: 85.8178, connections: ["DEL", "CCU", "LKO", "GAY"] },
    { code: "IXR", name: "Ranchi", lat: 23.3145, lon: 85.3210, connections: ["BBI", "CCU"] },
    { code: "UDR", name: "Udaipur", lat: 24.6177, lon: 73.8961, connections: ["DEL", "JAI"] },
    { code: "IXU", name: "Aurangabad", lat: 19.8626, lon: 75.3982, connections: ["BOM"] },
    { code: "JAM", name: "Jammu", lat: 32.6891, lon: 74.8374, connections: ["SXR", "DEL"] }
  ];
  
  

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
  }
  
  // Check if connection exists
  function hasConnection(fromCode, toCode) {
    if (fromCode === toCode) return false;
    const airport = airports.find(a => a.code === fromCode);
    return airport?.connections.includes(toCode);
  }

function findOptimizedRoutes(origin, destination, flightData) {
  const originAirport = airports.find(a => a.city === origin);
  const destAirport = airports.find(a => a.city === destination);
  
  if (!originAirport || !destAirport) {
    return null;
  }

  // Calculate direct distance
  const directDistance = calculateDistance(
    originAirport.lat, originAirport.lon,
    destAirport.lat, destAirport.lon
  );

  // Find possible connecting airports (excluding origin and destination)
  const possibleConnections = airports.filter(a => 
    a.city !== origin && a.city !== destination
  );

  // Calculate all possible 1-stop routes
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
      via: connection.city,
      totalDistance: firstLeg + secondLeg,
      firstLegDistance: firstLeg,
      secondLegDistance: secondLeg,
      savings: directDistance - (firstLeg + secondLeg) // Negative if longer
    };
  });

  oneStopRoutes.sort((a, b) => a.totalDistance - b.totalDistance);

  return {
    directDistance,
    oneStopRoutes: oneStopRoutes.slice(0, 3), 
    origin: originAirport,
    destination: destAirport
  };
}

function FlightOpt() {
    const location = useLocation();
    const navigate = useNavigate();
    const flightData = location.state?.flightData || {};
    
    if (Object.keys(flightData).length === 0) {
        return (
            <div className="flight-page" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <Helmet>
                    <title>No Flight Data</title>
                </Helmet>
                <h1>No Flight Data Available</h1>
                <p>No flight optimization data was found. Please start your booking process again.</p>
                <button onClick={() => navigate('/')}>Return to Home</button>
            </div>
        );
    }

    // Get optimization data
    const optimizationData = flightData.Departure_From && flightData.Going_to ? 
      findOptimizedRoutes(
        flightData.Departure_From.split('(')[0].trim(),
        flightData.Going_to.split('(')[0].trim(),
        flightData
      ) : null;

      
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
            <Helmet>
                <title>Optimized Flight Options</title>
            </Helmet>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <h1>Optimized Flight Options</h1>
                
                {/* Basic Flight Information */}
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
    
                {/* Optimization Results */}
                {optimizationData && (
                    <div style={{ marginTop: '40px' }}>
                        <h2>Route Optimization</h2>
                        <div style={{ 
                            backgroundColor: '#f8f9fa', 
                            padding: '20px', 
                            borderRadius: '8px',
                            marginBottom: '20px'
                        }}>
                            <h3>Direct Flight</h3>
                            <p>
                                <strong>{optimizationData.origin.city} ({optimizationData.origin.code})</strong> to{' '}
                                <strong>{optimizationData.destination.city} ({optimizationData.destination.code})</strong>
                            </p>
                            <p>Distance: {optimizationData.directDistance} km</p>
                        </div>
    
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
                                        <strong>First Leg:</strong> {optimizationData.origin.city} → {route.via}{' '}
                                        ({route.firstLegDistance} km)
                                    </p>
                                    <p>
                                        <strong>Second Leg:</strong> {route.via} → {optimizationData.destination.city}{' '}
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
                    </div>
                )}
    
                {/* Flight Connection Matrix */}
                <h1>Flight Connection Matrix</h1>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    Showing only available direct flight routes between major hubs
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
                                        return (
                                            <td 
                                                key={`${fromAirport.code}-${toAirport.code}`}
                                                style={{ 
                                                    border: '1px solid #ddd', 
                                                    padding: '12px',
                                                    textAlign: 'center',
                                                    backgroundColor: hasDirectFlight ? '#e8f5e9' : 'transparent'
                                                }}
                                            >
                                                {hasDirectFlight ? (
                                                    calculateDistance(
                                                        fromAirport.lat, fromAirport.lon,
                                                        toAirport.lat, toAirport.lon
                                                    )
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



