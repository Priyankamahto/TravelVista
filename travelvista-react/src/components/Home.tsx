import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="slider">
        <div 
          className={`slide ${currentSlide === 0 ? 'active' : ''}`} 
          style={{ backgroundImage: "url('/images/slide1.jpg')" }}
        ></div>
        <div 
          className={`slide ${currentSlide === 1 ? 'active' : ''}`} 
          style={{ backgroundImage: "url('/images/slide2.png')" }}
        ></div>
        <div 
          className={`slide ${currentSlide === 2 ? 'active' : ''}`} 
          style={{ backgroundImage: "url('/images/slide3.png')" }}
        ></div>
      </div>
      <div className="hero-content">
        <h1>Welcome to <span className="highlight">WonderVista</span></h1>
        <p>"Your Ultimate Travel Companion!"</p>
        <Link to="/explore">
          <button className="btn">Explore Now ✈</button>
        </Link>
      </div>
    </section>
  );
};

export default Home; 