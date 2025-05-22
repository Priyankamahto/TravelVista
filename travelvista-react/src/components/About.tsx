import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/About.css';

const About: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="about-container">
        <h1>About WonderVista</h1>
        <div className="about-content">
          <h2>Our Story</h2>
          <p>Founded in 2023, WonderVista aims to revolutionize travel planning by providing a comprehensive platform for discovering and exploring amazing destinations across India.</p>
          
          <div className="mission-vision">
            <div className="mission">
              <h3>Our Mission</h3>
              <p>To make travel planning seamless and enjoyable while promoting sustainable tourism and cultural appreciation.</p>
            </div>
            <div className="vision">
              <h3>Our Vision</h3>
              <p>To become the most trusted travel companion for anyone looking to explore the diverse beauty of India.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About; 