document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Sample restaurant data (replace with actual API call in production)
    const sampleRestaurant = {
        id: "R123456",
        name: "Gourmet Paradise",
        location: "New York",
        cuisine: "international",
        address: "123 Food Street, New York, NY 10001",
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        },
        images: [
            "https://source.unsplash.com/random/800x600/?restaurant,interior",
            "https://source.unsplash.com/random/800x600/?restaurant,food",
            "https://source.unsplash.com/random/800x600/?restaurant,chef",
            "https://source.unsplash.com/random/800x600/?restaurant,dining"
        ],
        rating: 4.5,
        reviewCount: 128,
        priceRange: "$$$",
        openingHours: "11:00 AM - 10:00 PM (Mon-Sun)",
        phone: "+1 (212) 555-1234",
        website: "https://www.gourmetparadise.com",
        description: "An exquisite dining experience offering world-class cuisine with a focus on fresh, locally-sourced ingredients. Our award-winning chefs create culinary masterpieces that delight all senses.",
        menu: {
            "Starters": [
                {
                    name: "Truffle Arancini",
                    description: "Crispy risotto balls with black truffle and parmesan",
                    price: 12.99,
                    image: "https://source.unsplash.com/random/300x200/?arancini"
                },
                {
                    name: "Octopus Carpaccio",
                    description: "Thinly sliced octopus with citrus dressing",
                    price: 15.99,
                    image: "https://source.unsplash.com/random/300x200/?octopus"
                }
            ],
            "Main Courses": [
                {
                    name: "Filet Mignon",
                    description: "8oz grass-fed beef with truffle mashed potatoes",
                    price: 34.99,
                    image: "https://source.unsplash.com/random/300x200/?steak"
                },
                {
                    name: "Lobster Risotto",
                    description: "Creamy arborio rice with fresh Maine lobster",
                    price: 29.99,
                    image: "https://source.unsplash.com/random/300x200/?risotto"
                }
            ],
            "Desserts": [
                {
                    name: "Chocolate Soufflé",
                    description: "Warm chocolate soufflé with vanilla ice cream",
                    price: 10.99,
                    image: "https://source.unsplash.com/random/300x200/?souffle"
                },
                {
                    name: "Crème Brûlée",
                    description: "Classic vanilla bean custard with caramelized sugar",
                    price: 8.99,
                    image: "https://source.unsplash.com/random/300x200/?creme-brulee"
                }
            ]
        },
        reviews: [
            {
                reviewer: "Sarah Johnson",
                avatar: "https://randomuser.me/api/portraits/women/43.jpg",
                date: "2023-05-15",
                rating: 5,
                title: "Exceptional dining experience!",
                content: "Every dish was a masterpiece. The service was impeccable and the ambiance was perfect for our anniversary dinner.",
                photos: [
                    "https://source.unsplash.com/random/300x200/?restaurant,food,1",
                    "https://source.unsplash.com/random/300x200/?restaurant,dessert,1"
                ],
                helpful: 12
            },
            {
                reviewer: "Michael Chen",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                date: "2023-04-28",
                rating: 4,
                title: "Great food, a bit pricey",
                content: "The food was excellent but portions were smaller than expected for the price. Would still recommend for special occasions.",
                photos: [],
                helpful: 5
            }
        ],
        features: ["Outdoor Seating", "Wine Pairings", "Chef's Table", "Vegetarian Options"],
        ownerResponse: "Thank you for your kind review, Sarah! We're delighted you enjoyed your anniversary with us. Michael, we appreciate your feedback about portion sizes and will take it into consideration.",
        isVerified: true,
        addedBy: "owner"
    };

    // Load restaurant details
    loadRestaurantDetails(sampleRestaurant);

    // Review modal functionality
    const reviewModal = document.getElementById('reviewModal');
    const writeReviewBtn = document.getElementById('writeReviewBtn');
    const closeReviewModal = document.getElementById('closeReviewModal');
    const cancelReviewBtn = document.getElementById('cancelReview');
    const reviewForm = document.getElementById('reviewForm');

    // Show review modal
    document.addEventListener('click', function(e) {
        if (e.target.closest('#writeReviewBtn')) {
            reviewModal.style.display = 'block';
        }
    });

    // Close review modal
    closeReviewModal.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });

    cancelReviewBtn.addEventListener('click', function() {
        reviewModal.style.display = 'none';
    });

    // Star rating functionality
    const ratingStars = document.querySelectorAll('.rating-select i');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            document.getElementById('ratingValue').value = rating;
            
            // Update star display
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
    });

    // Image upload preview
    const reviewImages = document.getElementById('reviewImages');
    const imagePreview = document.getElementById('reviewImagePreview');

    reviewImages.addEventListener('change', function(e) {
        imagePreview.innerHTML = '';
        const files = e.target.files;
        
        for (let i = 0; i < Math.min(files.length, 5); i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = function(event) {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                previewItem.innerHTML = `
                    <img src="${event.target.result}" alt="Preview">
                    <button type="button" class="remove-preview"><i class="fas fa-times"></i></button>
                `;
                imagePreview.appendChild(previewItem);

                // Add remove button functionality
                previewItem.querySelector('.remove-preview').addEventListener('click', function() {
                    imagePreview.removeChild(previewItem);
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const rating = document.getElementById('ratingValue').value;
        const title = document.getElementById('reviewTitle').value;
        const content = document.getElementById('reviewText').value;
        const visitDate = document.getElementById('visitDate').value;
        
        // Get uploaded images
        const photos = [];
        const previewItems = imagePreview.querySelectorAll('.preview-item img');
        previewItems.forEach(item => {
            photos.push(item.src);
        });

        // Create new review
        const newReview = {
            reviewer: "You",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
            date: visitDate,
            rating: rating,
            title: title,
            content: content,
            photos: photos,
            helpful: 0
        };

        // Add review to restaurant (in a real app, this would be an API call)
        sampleRestaurant.reviews.unshift(newReview);
        sampleRestaurant.reviewCount++;
        
        // Recalculate average rating
        const totalRatings = sampleRestaurant.reviews.reduce((sum, review) => sum + review.rating, 0);
        sampleRestaurant.rating = (totalRatings / sampleRestaurant.reviews.length).toFixed(1);

        // Reload restaurant details to show the new review
        loadRestaurantDetails(sampleRestaurant);
        
        // Close modal and reset form
        reviewModal.style.display = 'none';
        reviewForm.reset();
        imagePreview.innerHTML = '';
        ratingStars.forEach(star => {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        });
        document.getElementById('ratingValue').value = 0;

        // Show success message
        alert('Thank you for your review!');
    });

    // Load restaurant details function
    function loadRestaurantDetails(restaurant) {
        const container = document.getElementById('restaurantDetails');
        
        container.innerHTML = `
            <div class="restaurant-header">
                <img src="${restaurant.images[0]}" alt="${restaurant.name}" class="restaurant-header-image">
                <div class="restaurant-header-overlay">
                    <h1 class="restaurant-title">${restaurant.name}</h1>
                    <div class="restaurant-meta">
                        <span><i class="fas fa-map-marker-alt"></i> ${restaurant.location}</span>
                        <span><i class="fas fa-utensils"></i> ${restaurant.cuisine.charAt(0).toUpperCase() + restaurant.cuisine.slice(1)}</span>
                        <span><i class="fas fa-star"></i> ${restaurant.rating} (${restaurant.reviewCount} reviews)</span>
                        <span><i class="fas fa-dollar-sign"></i> ${restaurant.priceRange}</span>
                    </div>
                    <div class="restaurant-actions">
                        <button class="action-btn write-review-btn" id="writeReviewBtn">
                            <i class="fas fa-pencil-alt"></i> Write a Review
                        </button>
                        <button class="action-btn save-btn" id="saveRestaurantBtn">
                            <i class="far fa-bookmark"></i> Save
                        </button>
                        <button class="action-btn share-btn" id="shareRestaurantBtn">
                            <i class="fas fa-share-alt"></i> Share
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="restaurant-content">
                <div class="restaurant-main">
                    <div class="content-section">
                        <h2 class="section-title"><i class="fas fa-info-circle"></i> About</h2>
                        <p class="restaurant-description">${restaurant.description}</p>
                        ${restaurant.isVerified ? '<div class="verified-badge"><i class="fas fa-check-circle"></i> Verified by WonderVista</div>' : ''}
                        ${restaurant.addedBy === 'owner' ? '<div class="owner-badge"><i class="fas fa-user-tie"></i> Added by Business Owner</div>' : ''}
                    </div>
                    
                    <div class="content-section">
                        <h2 class="section-title"><i class="fas fa-camera"></i> Photos</h2>
                        <div class="restaurant-gallery" id="restaurantGallery">
                            ${restaurant.images.map((img, index) => `
                                <div class="gallery-item" data-src="${img}">
                                    <img src="${img}" alt="${restaurant.name} photo ${index + 1}">
                                </div>
                            `).join('')}
                        </div>
                        ${restaurant.images.length > 4 ? `
                            <div class="view-all-photos" id="viewAllPhotos">
                                <i class="fas fa-images"></i> View all ${restaurant.images.length} photos
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="content-section">
                        <h2 class="section-title"><i class="fas fa-utensils"></i> Menu</h2>
                        <div class="menu-list">
                            ${Object.entries(restaurant.menu).map(([category, items]) => `
                                <div class="menu-category">
                                    <h3 class="menu-category-title">${category}</h3>
                                    <div class="menu-items">
                                        ${items.map(item => `
                                            <div class="menu-item-card">
                                                <div class="menu-item-image">
                                                    <img src="${item.image}" alt="${item.name}">
                                                </div>
                                                <div class="menu-item-details">
                                                    <div class="menu-item-name">${item.name}</div>
                                                    <div class="menu-item-description">${item.description}</div>
                                                    <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h2 class="section-title"><i class="fas fa-star"></i> Reviews</h2>
                        ${restaurant.reviews.length > 0 ? `
                            <div class="review-list">
                                ${restaurant.reviews.map(review => `
                                    <div class="review-card">
                                        <div class="review-header">
                                            <div class="reviewer">
                                                <div class="reviewer-avatar">
                                                    <img src="${review.avatar}" alt="${review.reviewer}">
                                                </div>
                                                <div class="reviewer-info">
                                                    <h4>${review.reviewer}</h4>
                                                    <div class="reviewer-meta">
                                                        <span>${new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="review-rating">
                                                ${generateStarRating(review.rating)}
                                            </div>
                                        </div>
                                        <h3>${review.title}</h3>
                                        <div class="review-content">${review.content}</div>
                                        ${review.photos.length > 0 ? `
                                            <div class="review-photos">
                                                ${review.photos.map((photo, i) => `
                                                    <div class="review-photo" data-src="${photo}">
                                                        <img src="${photo}" alt="Review photo ${i + 1}">
                                                    </div>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                        ${review.helpful > 0 ? `
                                            <div class="review-helpful">
                                                <i class="fas fa-thumbs-up"></i> ${review.helpful} found this helpful
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : `
                            <div class="no-reviews">
                                <i class="fas fa-comment-slash"></i>
                                <p>No reviews yet. Be the first to share your experience!</p>
                            </div>
                        `}
                    </div>
                </div>
                
                <div class="restaurant-sidebar">
                    <div class="sidebar-card">
                        <div class="sidebar-card-header">
                            <h3><i class="fas fa-info-circle"></i> Restaurant Info</h3>
                        </div>
                        <div class="sidebar-card-body">
                            <ul class="restaurant-info-list">
                                <li class="restaurant-info-item">
                                    <div class="info-icon"><i class="fas fa-map-marker-alt"></i></div>
                                    <div class="info-content">
                                        <div class="info-label">Address</div>
                                        <div class="info-value">${restaurant.address}</div>
                                    </div>
                                </li>
                                <li class="restaurant-info-item">
                                    <div class="info-icon"><i class="fas fa-phone"></i></div>
                                    <div class="info-content">
                                        <div class="info-label">Phone</div>
                                        <div class="info-value">${restaurant.phone}</div>
                                    </div>
                                </li>
                                <li class="restaurant-info-item">
                                    <div class="info-icon"><i class="fas fa-globe"></i></div>
                                    <div class="info-content">
                                        <div class="info-label">Website</div>
                                        <div class="info-value"><a href="${restaurant.website}" target="_blank">${restaurant.website.replace('https://', '').replace('www.', '')}</a></div>
                                    </div>
                                </li>
                                <li class="restaurant-info-item">
                                    <div class="info-icon"><i class="fas fa-clock"></i></div>
                                    <div class="info-content">
                                        <div class="info-label">Hours</div>
                                        <div class="info-value">${restaurant.openingHours}</div>
                                    </div>
                                </li>
                            </ul>
                            
                            <div class="map-container">
                                <div id="map" style="width:100%;height:250px;"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sidebar-card">
                        <div class="sidebar-card-header">
                            <h3><i class="fas fa-check-circle"></i> Features</h3>
                        </div>
                        <div class="sidebar-card-body">
                            <ul class="features-list">
                                ${restaurant.features.map(feature => `
                                    <li><i class="fas fa-check"></i> ${feature}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="sidebar-card">
                        <div class="sidebar-card-header">
                            <h3><i class="fas fa-exclamation-circle"></i> Health & Safety</h3>
                        </div>
                        <div class="sidebar-card-body">
                            <ul class="features-list">
                                <li><i class="fas fa-check"></i> Staff wears masks</li>
                                <li><i class="fas fa-check"></i> Contactless payment available</li>
                                <li><i class="fas fa-check"></i> Sanitized between seating</li>
                                <li><i class="fas fa-check"></i> Staff fully vaccinated</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize lightGallery
        if (typeof lightGallery !== 'undefined') {
            lightGallery(document.getElementById('restaurantGallery'), {
                selector: '.gallery-item',
                download: false,
                counter: false
            });

            // Initialize lightGallery for review photos
            document.querySelectorAll('.review-photos').forEach(gallery => {
                lightGallery(gallery, {
                    selector: '.review-photo',
                    download: false,
                    counter: false
                });
            });
        }

        // View all photos button
        const viewAllPhotos = document.getElementById('viewAllPhotos');
        if (viewAllPhotos) {
            viewAllPhotos.addEventListener('click', function() {
                lightGallery(document.getElementById('restaurantGallery'), {
                    selector: '.gallery-item',
                    download: false,
                    counter: false,
                    dynamic: true,
                    dynamicEl: restaurant.images.map(img => ({
                        src: img,
                        thumb: img
                    }))
                });
            });
        }

        // Save restaurant button
        const saveRestaurantBtn = document.getElementById('saveRestaurantBtn');
        if (saveRestaurantBtn) {
            saveRestaurantBtn.addEventListener('click', function() {
                this.innerHTML = this.innerHTML.includes('far fa-bookmark') ?
                    '<i class="fas fa-bookmark"></i> Saved' :
                    '<i class="far fa-bookmark"></i> Save';
                alert('Restaurant saved to your favorites!');
            });
        }

        // Share restaurant button
        const shareRestaurantBtn = document.getElementById('shareRestaurantBtn');
        if (shareRestaurantBtn) {
            shareRestaurantBtn.addEventListener('click', function() {
                if (navigator.share) {
                    navigator.share({
                        title: restaurant.name,
                        text: `Check out ${restaurant.name} on WonderVista!`,
                        url: window.location.href
                    }).catch(err => {
                        console.log('Error sharing:', err);
                        fallbackShare(restaurant);
                    });
                } else {
                    fallbackShare(restaurant);
                }
            });
        }

        // Initialize map (simplified for demo)
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.innerHTML = `
                <div style="width:100%;height:100%;background:#eee;display:flex;align-items:center;justify-content:center;">
                    <p style="color:#666;">Map would display here with restaurant location</p>
                </div>
            `;
        }
    }

    // Helper function to generate star rating HTML
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let stars = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (halfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }

    // Fallback for Web Share API
    function fallbackShare(restaurant) {
        const shareUrl = `https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(restaurant.name)} on WonderVista!&url=${encodeURIComponent(window.location.href)}`;
        window.open(shareUrl, '_blank');
    }
});