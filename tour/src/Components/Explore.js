import React from 'react';
import './Explore.css';

const Explore = () => {
  const exploreItems = [
    {
      title: 'Beaches',
      description: 'Relax on the most beautiful beaches around the world.',
      image: 'https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z29hJTIwYmVhY2hlc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Mountains',
      description: 'Explore breathtaking mountain ranges.',
      image: 'https://plus.unsplash.com/premium_photo-1661814278311-d59ab0b4a676?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGltYWxheWFzfGVufDB8fDB8fHww',
    },
    {
      title: 'Cities',
      description: 'Discover vibrant cities full of culture and history.',
      image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVtYmFpfGVufDB8fDB8fHww',
    },
    {
      title: 'Adventure',
      description: 'Experience thrilling adventures and activities.',
      image: 'https://plus.unsplash.com/premium_photo-1682390303366-7463dcbec281?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWR2ZW50dXJlfGVufDB8fDB8fHww',
    },
    {
      title: 'Wildlife',
      description: 'Get close to nature and wildlife.',
      image: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdpbGRsaWZlfGVufDB8fDB8fHww',
    },
    {
      title: 'Deserts',
      description: 'Experience the beauty of vast deserts and enjoy activities like camel rides.',
      image: 'https://plus.unsplash.com/premium_photo-1661962428918-6a57ab674e23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmFqYXN0aGFufGVufDB8fDB8fHww',
    },
    {
      title: 'Road Trips',
      description: 'Hit the road and explore scenic routes and hidden gems.',
      image: 'https://plus.unsplash.com/premium_photo-1664126702249-57c71ebd427e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHJvYWQlMjB0aXBzfGVufDB8fDB8fHww',
    },
    {
      title: 'Historical Sites',
      description: 'Step back in time and explore iconic landmarks and ancient ruins.',
      image: 'https://plus.unsplash.com/premium_photo-1661951545793-ecb10ba445dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SGlzdG9yaWNhbCUyMHNpdGVzJTIwaW5kaWF8ZW58MHx8MHx8fDA%3D',
    },
  ];

  return (
    <section className="explore-section">
      <h2 className="explore-title">Explore the World</h2>
      <div className="explore-grid">
        {exploreItems.map((item, index) => (
          <div key={index} className="explore-card">
            <div
              className="explore-card-image"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            ></div>
            <div className="explore-card-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button className="explore-button">Discover More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;