import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Adventures.css';

const Adventures: React.FC = () => {
  return (
    <>
      <Navigation />
      <div className="adventures-container">
        <h1>Adventure Experiences</h1>
        <p>Coming Soon! We're working on bringing you exciting adventure experiences.</p>
      </div>
      <Footer />
    </>
  );
};

export default Adventures; 