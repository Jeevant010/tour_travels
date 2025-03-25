import React, { useRef } from 'react';
import './Home.css';
import Explore from '../Components/Explore';
import travelImage from '../assets/images/travel.jpg'; // Import the image
import Ourmain from '../hoc/Ourmain';


function Home() {
  const bookingOptionsRef = useRef(null);

  const scrollLeft = () => {
    bookingOptionsRef.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    bookingOptionsRef.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="home">
        {/* Hero Section */}
        <section
          className="hero"
          style={{
            backgroundImage: `url(${travelImage})`, // Use the imported image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="hero-content">
            <h1>Welcome to EasyTravel.com</h1>
            <p>Discover amazing destinations and unforgettable experiences with us.</p>
            <button className="cta-button">Explore Tours</button>
          </div>
        </section>

        {/* Booking Links Section */}
        <section className="booking-links">
          <h2>Book Your Travel</h2>
          <div className="slider-container">
            <button className="arrow left-arrow" onClick={scrollLeft}>
              &#8249;
            </button>
            <div className="booking-options" ref={bookingOptionsRef}>
              <a href="#flights" className="booking-card flight-booking">
                <h3>Flight Booking</h3>
                <p>Book flights to your favorite destinations.</p>
              </a>
              <a href="#trains" className="booking-card train-booking">
                <h3>Train Booking</h3>
                <p>Reserve train tickets for your journey.</p>
              </a>
              <a href="#hotels" className="booking-card hotel-booking">
                <h3>Hotel Booking</h3>
                <p>Find and book the best hotels for your stay.</p>
              </a>
              <a href="#taxi" className="booking-card taxi-booking">
                <h3>Taxi Booking</h3>
                <p>Book a taxi for convenient local travel.</p>
              </a>
              <a href="#rentals" className="booking-card rental-booking">
                <h3>Rental Services</h3>
                <p>Rent vehicles for your travel needs.</p>
              </a>
            </div>
            <button className="arrow right-arrow" onClick={scrollRight}>
              &#8250;
            </button>
          </div>
        </section>

        <Explore />

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Expert Guides</h3>
              <p>Our experienced guides ensure you have the best travel experience.</p>
            </div>
            <div className="feature-item">
              <h3>Affordable Packages</h3>
              <p>We offer competitive pricing without compromising on quality.</p>
            </div>
            <div className="feature-item">
              <h3>24/7 Support</h3>
              <p>Our team is here to assist you anytime, anywhere.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Ourmain(Home);