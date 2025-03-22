import React, { useState } from 'react';
import './Explore.css';
import pixelsImage from '../assets/images/pexels.jpg'; // Default background image
import dexterImage from '../assets/images/dexter.jpg'; // Background image for Jaipur
import keralaImage from '../assets/images/kerala.jpg'; // Background image for Kerala

function Explore() {
  const [activeTab, setActiveTab] = useState('tajmahal');

  const places = {
    tajmahal: {
      name: 'Taj Mahal',
      description: 'An iconic symbol of love, located in Agra, and one of the Seven Wonders of the World.',
    },
    jaipur: {
      name: 'Jaipur',
      description: 'The Pink City of India, known for its royal palaces, forts, and vibrant culture.',
    },
    kerala: {
      name: 'Kerala',
      description: 'God’s Own Country, famous for its serene backwaters, lush greenery, and houseboats.',
    },
  };

  // Determine the background image based on the active tab
  const backgroundImage =
    activeTab === 'jaipur'
      ? dexterImage
      : activeTab === 'kerala'
      ? keralaImage
      : pixelsImage;

  return (
    <section
      className="explore"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Dynamically set the background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h2>Explore</h2>
      <div className="tabs">
        {Object.keys(places).map((key) => (
          <button
            key={key}
            className={`tab ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {places[key].name}
          </button>
        ))}
      </div>
      <div className="tab-content">
        <h3>{places[activeTab].name}</h3>
        <p>{places[activeTab].description}</p>
      </div>
    </section>
  );
}

export default Explore;