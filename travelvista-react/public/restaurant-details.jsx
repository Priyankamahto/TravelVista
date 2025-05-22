import React from 'react';
import './restaurant-details.css'; // Import the CSS

function RestaurantDetails() {
    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="logo">🌍 WonderVista</div>
                <div className="menu-toggle" id="mobile-menu">
                    <i className="fas fa-bars"></i>
                </div>
                <ul className="nav-links" id="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="destination.html">Destinations</a></li>
                    <li><a href="shopping.html">Shopping</a></li>
                    <li className="active"><a href="restaurants.html">Restaurants</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div className="nav-right">
                    <div className="auth-buttons">
                        <a href="login.html" className="btn login-btn">Login</a>
                        <a href="signup.html" className="btn signup-btn">Sign Up</a>
                    </div>
                </div>
            </nav>

            {/* Restaurant Details Container */}
            <div className="restaurant-details-container" id="restaurantDetails">
                {/* Content will be loaded dynamically */}
                <div className="loading-spinner">
                    <i className="fas fa-utensils fa-spin"></i>
                    <p>Loading restaurant details...</p>
                </div>
            </div>

            {/* Review Modal */}
            <div className="review-modal" id="reviewModal">
                <div className="modal-content">
                    <span className="close-btn" id="closeReviewModal">&times;</span>
                    <div className="modal-header">
                        <h2>Share Your Experience</h2>
                        <p>Help others by sharing your dining experience</p>
                    </div>
                    <div className="modal-body">
                        <div id="reviewLoginPrompt" style={{ display: 'none' }}>
                            <div className="login-required">
                                <i className="fas fa-lock"></i>
                                <h3>Login Required</h3>
                                <p>You need to be logged in to write a review.</p>
                                <div className="login-buttons">
                                    <a href="login.html" className="btn login-btn">Login</a>
                                    <a href="signup.html" className="btn signup-btn">Sign Up</a>
                                </div>
                            </div>
                        </div>
                        <form id="reviewForm">
                            <div className="form-group">
                                <label>Your Rating*</label>
                                <div className="rating-select">
                                    <i className="far fa-star" data-rating="1"></i>
                                    <i className="far fa-star" data-rating="2"></i>
                                    <i className="far fa-star" data-rating="3"></i>
                                    <i className="far fa-star" data-rating="4"></i>
                                    <i className="far fa-star" data-rating="5"></i>
                                </div>
                                <input type="hidden" id="ratingValue" value="0" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewTitle">Review Title*</label>
                                <input type="text" id="reviewTitle" required placeholder="Summarize your experience" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewText">Your Review*</label>
                                <textarea id="reviewText" rows="4" required placeholder="What did you like or dislike?"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="visitDate">Date of Visit*</label>
                                <input type="date" id="visitDate" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="reviewImages">Upload Photos (Optional)</label>
                                <div className="image-upload-container">
                                    <div className="image-upload-box">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <p>Drag & drop images or click to browse</p>
                                        <input type="file" id="reviewImages" multiple accept="image/*" />
                                    </div>
                                    <div className="image-preview" id="reviewImagePreview"></div>
                                </div>
                                <p className="form-note">Maximum 5 photos (each under 5MB)</p>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="btn cancel-btn" id="cancelReview">Cancel</button>
                                <button type="submit" className="btn submit-btn">Submit Review</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section about">
                        <h3>About WonderVista</h3>
                        <p>Discover the world's most amazing culinary experiences with our expert food guides.</p>
                    </div>
                    <div className="footer-section links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Food Guides</a></li>
                            <li><a href="#">Special Offers</a></li>
                            <li><a href="#">Popular Cuisines</a></li>
                            <li><a href="#">Food Blog</a></li>
                            <li><a href="#">FAQs</a></li>
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

            {/* JS Libraries for lightgallery */}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.0/lightgallery.min.js"></script>
            <script src="restaurant-details.js"></script>
        </div>
    );
}

export default RestaurantDetails;
