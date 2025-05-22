import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About WonderVista</h3>
          <p>Discover India's most amazing destinations with our expert travel guides.</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="#">Travel Guides</Link></li>
            <li><Link to="#">Special Offers</Link></li>
            <li><Link to="#">Travel Insurance</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">FAQs</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 WonderVista. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 