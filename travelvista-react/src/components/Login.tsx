import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Auth.css';

interface LocationInfo {
    city: string;
    country: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        userType: '',
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [location, setLocation] = useState<LocationInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Get user's location when component mounts
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
                        );
                        const data = await response.json();
                        setLocation({
                            city: data.city,
                            country: data.countryName
                        });
                    } catch (err) {
                        console.error('Error fetching location details:', err);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Form validation
        if (!formData.email || !formData.password || !formData.userType) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo purposes, hardcode a successful login
            localStorage.setItem('wondervista_user', JSON.stringify({
                ...formData,
                location: location || 'Unknown'
            }));

            setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
            
            // Redirect after showing success message
            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (err) {
            setMessage({ type: 'error', text: 'Login failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        setMessage({ type: 'info', text: 'Google login integration coming soon!' });
    };

    return (
        <>
            <Navigation />
            <section className="auth-container">
                <div className="auth-form">
                    <h2>Welcome Back to WonderVista</h2>

                    {location && (
                        <p className="location-info">
                            <i className="fas fa-map-marker-alt"></i>
                            Logging in from {location.city}, {location.country}
                        </p>
                    )}

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="userType">Account Type</label>
                            <div className="input-group">
                                <i className="fas fa-user-tag"></i>
                                <select
                                    id="userType"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Account Type</option>
                                    <option value="admin">Admin</option>
                                    <option value="traveler">Traveler</option>
                                    <option value="business">Business Owner</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button 
                            type="button" 
                            className="google-btn"
                            onClick={handleGoogleLogin}
                        >
                            <i className="fab fa-google"></i>
                            Continue with Google
                        </button>

                        <p className="auth-link">
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </p>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Login; 