import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/Explore.css';

const Explore: React.FC = () => {
  return (
    <>
      <Navigation />
      <header className="hero-explore">
        <div className="hero-content">
          <h1>Explore the World with <span className="highlight">WonderVista</span></h1>
          <p className="hero-subtitle">Discover amazing destinations and unforgettable experiences</p>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-text">Explore More Below</div>
          <div className="scroll-arrow">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </header>

      <main>
        <section className="explore-container" id="destinations">
          <article className="explore-card" style={{ backgroundImage: "url('/images/destination.jpg')" }}>
            <div className="card-content">
              <h3>Destinations</h3>
              <p>Discover breathtaking travel locations</p>
              <Link to="/destinations" className="btn">Explore</Link>
            </div>
          </article>

          <article className="explore-card" style={{ backgroundImage: "url('/images/adventures.jpg')" }}>
            <div className="card-content">
              <h3>Adventures</h3>
              <p>Thrilling outdoor experiences</p>
              <Link to="/adventure" className="btn">Explore</Link>
            </div>
          </article>

          <article className="explore-card" style={{ backgroundImage: "url('/images/restaurants.jpeg')" }}>
            <div className="card-content">
              <h3>Dining</h3>
              <p>Experience world-class cuisine</p>
              <Link to="/restaurants" className="btn">View</Link>
            </div>
          </article>

          <article className="explore-card" style={{ backgroundImage: "url('/images/shopping.webp')" }}>
            <div className="card-content">
              <h3>Shopping</h3>
              <p>Find the best shopping destinations</p>
              <Link to="/shopping" className="btn">Discover</Link>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Explore; 