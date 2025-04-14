import React from 'react';
import './Gallery.css';
import { useState, useEffect } from 'react';
import Ourmain from '../hoc/Ourmain.jsx';

const Gallery = () => {
  // Static gallery images
  const staticGalleryImages = [
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60',
      title: 'Beach Paradise',
      link: 'https://www.holidify.com/collections/best-beaches-in-india',
    },
    {
      url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60',
      title: 'Mountain Adventure',
      link: 'https://www.holidify.com/collections/hill-stations-of-india', 
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1681552900042-5b5881fed356?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eSUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D',
      title: 'City Lights',
      link: 'https://www.holidify.com/country/india/', 
    },
    {
      url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop&q=60',
      title: 'Desert Safari',
      link: 'https://www.holidify.com/collections/deserts-in-india',
    },
    {
      url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=60',
      title: 'Historical Wonders',
      link: 'https://www.holidify.com/collections/historical-places-in-india',
    },
    {
      url: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&auto=format&fit=crop&q=60',
      title: 'Wildlife Adventure',
      link: 'https://www.holidify.com/collections/wildlife-sanctuaries-in-india', 
    },
  ];

  // State for dynamic images
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (pageNum) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.unsplash.com/photos/random?count=6&client_id=B74V-7ggl_o3SW_-2GrHQkKiotQuis87wByAxD57mdo&page=${pageNum}`
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
      
      return formattedImages;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    const loadInitialImages = async () => {
      const images = await fetchImages(1);
      setGalleryImages(images);
    };
    loadInitialImages();
  }, []);

  const loadMoreImages = async () => {
    const nextPage = page + 1;
    const newImages = await fetchImages(nextPage);
    
    if (newImages.length > 0) {
      setGalleryImages(prev => [...prev, ...newImages]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  if (loading && page === 1) return <div className="loading">Loading gallery...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Explore Our Destinations</h1>
      
      {/* Featured Destinations (Static) */}
      <div className="gallery-section">
        <h2 className="section-title">Featured Destinations</h2>
        <div className="gallery-grid">
          {staticGalleryImages.map((image, index) => (
            <a key={`static-${index}`} href={image.link} className="gallery-item">
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
      
      {/* Dynamic Gallery */}
      <div className="gallery-section">
        <h2 className="section-title">Discover More</h2>
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <a 
              key={image.id} 
              href={image.link} 
              className="gallery-item" 
              target="_blank" 
              rel="noopener noreferrer"
            >
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
        
        {/* Load More Button */}
        {hasMore && (
          <div className="load-more-container">
            <button 
              onClick={loadMoreImages} 
              className="load-more-btn"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ourmain(Gallery);