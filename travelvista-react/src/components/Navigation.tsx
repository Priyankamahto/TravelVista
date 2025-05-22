import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <span>🌍</span>
                <span className="logo-text">WonderVista</span>
            </Link>

            <ul className="nav-links">
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/destinations" 
                        className={location.pathname === '/destinations' ? 'active' : ''}
                    >
                        Destinations
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/adventures" 
                        className={location.pathname === '/adventures' ? 'active' : ''}
                    >
                        Adventures
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/shopping" 
                        className={location.pathname === '/shopping' ? 'active' : ''}
                    >
                        Shopping
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/restaurants" 
                        className={location.pathname === '/restaurants' ? 'active' : ''}
                    >
                        Restaurants
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/about" 
                        className={location.pathname === '/about' ? 'active' : ''}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/contact" 
                        className={location.pathname === '/contact' ? 'active' : ''}
                    >
                        Contact
                    </Link>
                </li>
            </ul>

            <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
        </nav>
    );
};

export default Navigation; 