import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Contact.css';

const Contact: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <p>info@wondervista.com</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <p>+91 123 456 7890</p>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>123 Travel Street, Mumbai, India</p>
              </div>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact; 