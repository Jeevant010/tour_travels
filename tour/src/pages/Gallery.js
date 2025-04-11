import React from 'react';
import './Gallery.css';
import { useState, useEffect } from 'react';
import Ourmain from '../hoc/Ourmain.jsx';


const Gallery = () => {
  const galleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',
      title: 'Beach Paradise',
      link: '/destinations/beach',
    },
    {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      title: 'Mountain Adventure',
      link: '/destinations/mountain', 
    },
    {
      url: 'https://images.unsplash.com/photo-1508051123996-69f8caf4891e?w=600&auto=format&fit=crop&q=60',
      title: 'City Lights',
      link: '/destinations/city', 
    },
    {
      url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop&q=60',
      title: 'Desert Safari',
      link: '/destinations/desert',
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      title: 'Historical Wonders',
      link: '/destinations/historical',
    },
    {
      url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&auto=format&fit=crop&q=60',
      link: '/destinations/wildlife', 
    },
  ];

  const [galleryImage, setGalleryImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          'https://api.unsplash.com/photos/random?count=12&client_id=B74V-7ggl_o3SW_-2GrHQkKiotQuis87wByAxD57mdo'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        
        const data = await response.json();
        
        const formattedImages = data.map(img => ({
          url: img.urls.regular,
          link: img.links.html,
          title: img.alt_description || 'Untitled',
          id: img.id
        }));
        
        setGalleryImage(formattedImages);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div className="loading">Loading gallery...</div>;
  if (error) return <div className="error">Error: {error}</div>;


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
      <div className="gallery-grid">
      {galleryImage.map((image) => (
        <a key={image.id} href={image.link} className="gallery-item" target="_blank" rel="noopener noreferrer">
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