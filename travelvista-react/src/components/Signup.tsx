import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Auth.css';

interface LocationInfo {
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
}

interface FormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
    businessType: string;
}

const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        businessType: ''
    });
    const [location, setLocation] = useState<LocationInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [showBusinessType, setShowBusinessType] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const navigate = useNavigate();

    const detectLocation = async () => {
        setIsDetectingLocation(true);
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
                            state: data.principalSubdivision,
                            country: data.countryName,
                            postalCode: data.postcode || '',
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    } catch (err) {
                        console.error('Error fetching location details:', err);
                        setMessage({ type: 'error', text: 'Failed to detect location. Please try again.' });
                    } finally {
                        setIsDetectingLocation(false);
                    }
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setMessage({ type: 'error', text: 'Failed to detect location. Please enable location services.' });
                    setIsDetectingLocation(false);
                }
            );
        } else {
            setMessage({ type: 'error', text: 'Geolocation is not supported by your browser.' });
            setIsDetectingLocation(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'userType') {
            setShowBusinessType(value === 'business');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Form validation
        if (!formData.fullName || !formData.email || !formData.password || !formData.userType) {
            setMessage({ type: 'error', text: 'Please fill in all required fields.' });
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
            setLoading(false);
            return;
        }

        if (!termsAccepted) {
            setMessage({ type: 'error', text: 'Please accept the Terms and Conditions.' });
            setLoading(false);
            return;
        }

        if (formData.userType === 'business' && !formData.businessType) {
            setMessage({ type: 'error', text: 'Please select a business category.' });
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // For demo purposes, hardcode a successful signup
            localStorage.setItem('wondervista_user', JSON.stringify({
                ...formData,
                location: location || 'Unknown'
            }));

            setMessage({ type: 'success', text: 'Account created successfully! Redirecting to login...' });
            
            // Redirect after showing success message
            setTimeout(() => {
                navigate('/login');
            }, 1500);

        } catch (err) {
            setMessage({ type: 'error', text: 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = () => {
        setMessage({ type: 'info', text: 'Google signup integration coming soon!' });
    };

    return (
        <>
            <Navigation />
            <section className="auth-container">
                <div className="auth-form">
                    <h2>Create Your WonderVista Account</h2>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <div className="input-group">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

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
                                    placeholder="Create password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
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

                        {showBusinessType && (
                            <div className="form-group">
                                <label htmlFor="businessType">Business Category</label>
                                <div className="input-group">
                                    <i className="fas fa-store"></i>
                                    <select
                                        id="businessType"
                                        name="businessType"
                                        value={formData.businessType}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Business Category</option>
                                        <option value="hotel">Hotel/Restaurant</option>
                                        <option value="shop">Retail Shop</option>
                                        <option value="guide">Tour Guide Service</option>
                                        <option value="transport">Transport Service</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>Location Details</label>
                            <div className="location-group">
                                <input
                                    type="text"
                                    value={location ? `${location.city}, ${location.country}` : ''}
                                    readOnly
                                    placeholder="Click to get location"
                                />
                                <button
                                    type="button"
                                    className="btn location-btn"
                                    onClick={detectLocation}
                                    disabled={isDetectingLocation}
                                >
                                    <i className="fas fa-map-marker-alt"></i>
                                    {isDetectingLocation ? 'Detecting...' : 'Detect Location'}
                                </button>
                            </div>
                        </div>

                        {location && (
                            <div className="address-details">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={location.city}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            id="state"
                                            value={location.state}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="postalCode">Postal Code</label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            value={location.postalCode}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="country">Country</label>
                                        <input
                                            type="text"
                                            id="country"
                                            value={location.country}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="checkbox-label terms">
                                <input
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                />
                                I accept the <Link to="/terms">Terms & Conditions</Link> and{' '}
                                <Link to="/privacy">Privacy Policy</Link>
                            </label>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>

                        <div className="divider">
                            <span>or</span>
                        </div>

                        <button 
                            type="button" 
                            className="google-btn"
                            onClick={handleGoogleSignup}
                        >
                            <i className="fab fa-google"></i>
                            Continue with Google
                        </button>

                        <p className="auth-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Signup; 