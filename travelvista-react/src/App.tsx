import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import Explore from './components/Explore';
import Destinations from './components/Destinations';
import Shopping from './components/Shopping';
import Restaurants from './components/Restaurants';
import RestaurantDetails from './components/RestaurantDetails';
import About from './components/About';
import Contact from './components/Contact';
import Adventures from './components/Adventures';
import Login from './components/Login';
import Signup from './components/Signup';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Pages that should not show header/footer
  const minimalPages = ['/', '/login', '/signup'];
  const showHeaderFooter = !minimalPages.includes(location.pathname);

  // Pages that might have their own footer (we'll exclude the main footer)
  const pagesWithOwnFooter = [
    '/destinations',
    '/restaurants',
    '/about',
    '/contact',
    '/shopping',
    '/adventures'
  ];
  const showMainFooter = showHeaderFooter && !pagesWithOwnFooter.includes(location.pathname);

  return (
    <div className="App">
      {showHeaderFooter && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adventures" element={<Adventures />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showMainFooter && <Footer />}
    </div>
  );
}

export default App;