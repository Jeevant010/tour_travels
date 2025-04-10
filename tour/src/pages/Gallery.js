import React from 'react';
import './Gallery.css';
import Ourmain from '../hoc/Ourmain.jsx';
const Gallery = () => {
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',
      title: 'Beach Paradise',
      link: '/destinations/beach', // Example link
    },
    {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      title: 'Mountain Adventure',
      link: '/destinations/mountain', // Example link
    },
    {
      url: 'https://images.unsplash.com/photo-1508051123996-69f8caf4891e?w=600&auto=format&fit=crop&q=60',
      title: 'City Lights',
      link: '/destinations/city', // Example link
    },
    {
      url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop&q=60',
      title: 'Desert Safari',
      link: '/destinations/desert', // Example link
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      title: 'Historical Wonders',
      link: '/destinations/historical', // Example link
    },
    {
      url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&auto=format&fit=crop&q=60',
      link: '/destinations/wildlife', // Example link
    },
  ];

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Explore Our Destinations</h1>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <a key={index} href={image.link} className="gallery-item">
            <div
              className="gallery-image"
              style={{ backgroundImage: `url(${image.url})` }}
            ></div>
            <div className="gallery-caption">
              <h3>{image.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};


export default Ourmain(Gallery);