import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Shopping.css';

const Shopping: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="shopping-container">
        <h1>Shopping Experience</h1>
        <p>Coming Soon! We're working on bringing you the best shopping experiences.</p>
      </div>
      <Footer />
    </>
  );
};

export default Shopping; 