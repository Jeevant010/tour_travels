import React, { useState } from 'react';
import './News.css';

function News() {
  const newsItems = [
    {
      title: 'Travel Restrictions Lifted',
      description: 'Many countries have lifted travel restrictions. Plan your trip today!',
      date: 'March 20, 2025',
    },
    {
      title: 'New Flight Routes Announced',
      description: 'Airlines have introduced new routes to popular destinations.',
      date: 'March 18, 2025',
    },
    {
      title: 'Top 10 Travel Destinations',
      description: 'Check out the top 10 travel destinations for 2025.',
      date: 'March 15, 2025',
    },
    {
      title: 'Travel Safety Tips',
      description: 'Learn how to stay safe while traveling in 2025.',
      date: 'March 10, 2025',
    },
    {
      title: 'Budget Travel Hacks',
      description: 'Discover tips to save money on your next trip.',
      date: 'March 5, 2025',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section className="news-section">
      <h2 className="news-title">Latest News</h2>
      <div className="news-slider">
        <button className="prev-slide" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="news-grid">
          {newsItems.slice(currentSlide, currentSlide + 3).map((item, index) => (
            <div key={index} className="news-item">
              <h3 className="news-item-title">{item.title}</h3>
              <p className="news-item-description">{item.description}</p>
              <p className="news-item-date">{item.date}</p>
            </div>
          ))}
        </div>
        <button className="next-slide" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default News;