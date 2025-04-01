import React from 'react';
import './Explore.css';

const Explore = () => {
  const exploreItems = [
    {
      title: 'Mumbai',
      description: 'Mumbai, the city of dreams, offers a mix of modernity and tradition with iconic landmarks like the Gateway of India and Marine Drive.',
      image: 'https://media.istockphoto.com/id/539018660/photo/taj-mahal-hotel-and-gateway-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=egndJzhyZQimV9AtYRdQsTd1XrH0h0-AgZJvShxxQ5A=',
      link: 'https://www.maharashtratourism.gov.in/mumbai',
    },
    {
      title: 'Delhi',
      description: 'Delhi, the capital of India, is known for its rich history, vibrant culture, and landmarks like the Red Fort and India Gate.',
      image: 'https://mrwallpaper.com/images/high/delhi-lotus-temple-aerial-nvux50s7thmmlnwd.webp',
      link: 'https://www.delhitourism.gov.in/',
    },
    {
      title: 'Goa',
      description: 'Goa is famous for its stunning beaches, vibrant nightlife, and Portuguese heritage.',
      image: 'https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z29hJTIwYmVhY2hlc3xlbnwwfHwwfHx8MA%3D%3D',
      link: 'https://www.goa-tourism.com/',
    },
    {
      title: 'Chennai',
      description: 'Chennai, a cultural hub, is known for its temples, beaches, and classical music.',
      image: 'https://media.gettyimages.com/id/978023606/photo/shore-temple-garden-landscape-chennai-tamilnadu-india.jpg?s=612x612&w=0&k=20&c=jSNKZLvr6JgvgehoGBA8CVhFZYcsU_nYEuo3VvgJ2rQ=',
      link: 'https://www.tamilnadutourism.tn.gov.in/',
    },
    {
      title: 'Rajasthan',
      description: 'Rajasthan, the land of kings, is famous for its palaces, forts, and desert landscapes.',
      image: 'https://images.pexels.com/photos/797824/pexels-photo-797824.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: 'https://www.tourism.rajasthan.gov.in/',
    },
    {
      title: 'Kolkata',
      description: 'Kolkata, the cultural capital of India, is known for its colonial architecture and vibrant festivals.',
      image: 'https://plus.unsplash.com/premium_photo-1697730414399-3d4d9ada98bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D',
      link: 'https://www.wbtourismgov.in/',
    },
    {
      title: 'Darjeeling',
      description: 'Darjeeling is renowned for its tea gardens, scenic views, and the iconic toy train.',
      image: 'https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyamVlbGluZ3xlbnwwfHwwfHx8MA%3D%3D',
      link: 'https://www.wbtourismgov.in/destination/place/darjeeling',
    },
    {
      title: 'Kerala',
      description: 'Kerala, God\'s Own Country, is known for its backwaters, lush greenery, and serene beaches.',
      image: 'https://media.istockphoto.com/id/153547597/photo/ocean-view-in-varkala-kerala-india.jpg?b=1&s=612x612&w=0&k=20&c=n1LCRpFR95mOJhNwRrUMHFVj5n-iEli7RunH9KVyUXQ=',
      link: 'https://www.keralatourism.org/',
    },
  ];

  return (
    <section className="explore-section">
      <h2 className="explore-title">Explore Popular Destinations</h2>
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
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="explore-button"
              >
                Discover More
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Explore;