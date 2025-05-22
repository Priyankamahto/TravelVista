// Configuration Constants
const DESTINATION_COUNT = 8;
const ITEMS_PER_PAGE = 9;
const NOMINATIM_API = "https://nominatim.openstreetmap.org/search";
const STORAGE_KEY = "wondervista_uploaded_images";
const USER_STORAGE_KEY = "wondervista_current_user";

// Global State
let allDestinations = [];
let filteredDestinations = [];
let currentPage = 1;
let currentPosition = null;
let currentModalDestination = null;
let isLoggedIn = false;
let currentUser = null;

// Initialize uploaded images and user from localStorage
let uploadedImages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
let storedUser = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));
if (storedUser) {
    isLoggedIn = true;
    currentUser = storedUser;
    updateAuthUI();
}

// Hardcoded Indian Destinations Data
const hardcodedDestinations = [
    {
        id: 'd1',
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        type: 'historical',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        images: [
            'destinations/tajmahal.webp',
            'images/taj-mahal-2.jpg',
            'images/taj-mahal-3.jpg'
        ],
        rating: '4.9',
        price: 600,
        activities: ['Guided Tours', 'Sunrise Viewing', 'Photography'],
        description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.'
    },
    {
        id: 'd2',
        name: 'Red Fort',
        location: 'Delhi',
        type: 'historical',
        coordinates: { lat: 28.6562, lng: 77.2410 },
        images: [
            'destinations/redfort.jpg',
            'images/red-fort-2.jpg'
        ],
        rating: '4.7',
        price: 350,
        activities: ['Light Show', 'Museum Visit', 'Historical Walk'],
        description: 'A historic fort in Delhi that served as the main residence of the Mughal Emperors. Constructed in 1639, it was the focal point of the medieval city of Shahjahanabad.'
    },
    {
        id: 'd3',
        name: 'Goa Beaches',
        location: 'Goa',
        type: 'beach',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        images: [
            'destinations/gb1.jpg',
            'destinations/gb2.jpg'
        ],
        rating: '4.8',
        price: 450,
        activities: ['Water Sports', 'Beach Parties', 'Dolphin Spotting'],
        description: 'Famous for its palm-fringed beaches, Portuguese heritage, and vibrant nightlife. Goa offers a perfect blend of Indian and Western cultures.'
    },
    {
        id: 'd4',
        name: 'Hawa Mahal',
        location: 'Jaipur, Rajasthan',
        type: 'historical',
        coordinates: { lat: 26.9239, lng: 75.8267 },
        images: [
            'destinations/hm1.png',
            'destinations/hm2.jpg'
        ],
        rating: '4.6',
        price: 300,
        activities: ['Photography', 'City Tours', 'Shopping'],
        description: 'The "Palace of Winds" is a stunning pink sandstone structure with 953 small windows (jharokhas) decorated with intricate latticework.'
    },
    {
        id: 'd5',
        name: 'Kerala Backwaters',
        location: 'Alappuzha, Kerala',
        type: 'beach',
        coordinates: { lat: 9.4981, lng: 76.3388 },
        images: [
            'destinations/kb1.webp',
            'destinations/kb2.jpg'
        ],
        rating: '4.9',
        price: 550,
        activities: ['Houseboat Stay', 'Village Tours', 'Ayurvedic Spa'],
        description: 'A network of brackish lagoons and lakes lying parallel to the Arabian Sea coast where traditional rice boats convert into luxurious houseboats.'
    },
    {
        id: 'd6',
        name: 'Leh-Ladakh',
        location: 'Ladakh',
        type: 'mountain',
        coordinates: { lat: 34.1526, lng: 77.5771 },
        images: [
            'destinations/ladakh1.webp',
            'destinations/ladakh2.webp'
        ],
        rating: '4.9',
        price: 700,
        activities: ['Mountain Biking', 'Monastery Visits', 'Trekking'],
        description: 'A high-altitude desert region in the Himalayas with breathtaking landscapes, Buddhist monasteries, and adventurous roads.'
    },
    {
        id: 'd7',
        name: 'Mysore Palace',
        location: 'Mysuru, Karnataka',
        type: 'historical',
        coordinates: { lat: 12.3051, lng: 76.6552 },
        images: [
            'destinations/mys1.jpeg',
            'destinations/mys2.webp'
        ],
        rating: '4.7',
        price: 400,
        activities: ['Light Show', 'Palace Tour', 'Shopping'],
        description: 'The official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore, known for its magnificent illumination on Sundays.'
    },
    {
        id: 'd8',
        name: 'Rishikesh',
        location: 'Uttarakhand',
        type: 'adventure',
        coordinates: { lat: 30.0869, lng: 78.2676 },
        images: [
            'images/rishikesh-1.jpg',
            'images/rishikesh-2.jpg'
        ],
        rating: '4.8',
        price: 500,
        activities: ['River Rafting', 'Yoga Retreats', 'Bungee Jumping'],
        description: 'Known as the "Yoga Capital of the World", this spiritual city on the Ganges is also famous for adventure sports and the evening Ganga Aarti.'
    }
];

// DOM Elements
const dom = {
    searchInput: document.getElementById('searchInput'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    destinationGrid: document.getElementById('destinationGrid'),
    currentPage: document.getElementById('currentPage'),
    prevPage: document.getElementById('prevPage'),
    nextPage: document.getElementById('nextPage'),
    geoLocation: document.getElementById('geoLocation'),
    destinationModal: document.getElementById('destinationModal'),
    loginModal: document.getElementById('loginModal'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    logoutBtn: document.getElementById('logoutBtn'),
    userProfile: document.getElementById('userProfile'),
    usernameDisplay: document.getElementById('usernameDisplay')
};

// Authentication Functions
function updateAuthUI() {
    if (isLoggedIn && currentUser) {
        dom.loginBtn.style.display = 'none';
        dom.signupBtn.style.display = 'none';
        dom.userProfile.style.display = 'flex';
        dom.usernameDisplay.textContent = currentUser.username;
    } else {
        dom.loginBtn.style.display = 'block';
        dom.signupBtn.style.display = 'block';
        dom.userProfile.style.display = 'none';
    }
}

function handleLogin(user) {
    isLoggedIn = true;
    currentUser = user;
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    updateAuthUI();
}

function handleLogout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.removeItem(USER_STORAGE_KEY);
    updateAuthUI();
}

// Main Initialization
async function initDestinationPage() {
    showLoading(true);
    
    // Initialize destinations with uploaded images
    allDestinations = hardcodedDestinations.map(dest => {
        if (uploadedImages[dest.id]) {
            return {
                ...dest,
                images: [...dest.images, ...uploadedImages[dest.id].map(img => img.url)]
            };
        }
        return dest;
    });
    
    filteredDestinations = [...allDestinations];
    setupEventListeners();
    updatePagination();
    showLoading(false);
}

// Rendering System
function renderDestinations(destinations) {
    dom.destinationGrid.innerHTML = destinations.map(dest => 
        createCardHTML(dest)
    ).join('');
}

function createCardHTML(dest) {
    const allImages = [...dest.images];
    if (uploadedImages[dest.id]) {
        allImages.push(...uploadedImages[dest.id].map(img => img.url));
    }
    const firstImage = allImages[0] || 'https://via.placeholder.com/800x600/cccccc/969696?text=No+Image';
    return `<article class="destination-card" data-id="${dest.id}">
        <div class="card-image" 
             style="background-image: url('${firstImage}')"
             data-fallback="https://via.placeholder.com/800x600/cccccc/969696?text=${encodeURIComponent(dest.name)}">
            <span class="card-badge">${dest.type}</span>
            <div class="image-count-badge">
                <i class="fas fa-images"></i> ${allImages.length}
            </div>
        </div>
        <div class="card-content">
            <h3>${dest.name}</h3>
            <div class="card-location">
                <i class="fas fa-map-marker-alt"></i> ${dest.location}
            </div>
            <div class="card-stats">
                <span><i class="fas fa-star"></i> ${dest.rating}</span>
                <span>₹${dest.price}</span>
                <span><i class="fas fa-clock"></i> 5 days</span>
            </div>
        </div>
    </article>`;
}

// Search System
function setupSearch() {
    const searchHandler = debounce(term => {
        filteredDestinations = allDestinations.filter(dest =>
            dest.name.toLowerCase().includes(term) ||
            dest.location.toLowerCase().includes(term)
        );
        currentPage = 1;
        updatePagination();
    }, 300);

    dom.searchInput.addEventListener('input', e => {
        const term = e.target.value.toLowerCase().trim();
        searchHandler(term);
        updateSuggestions(term);
    });
}

function updateSuggestions(term) {
    const results = term.length >= 2 ? 
        filteredDestinations.filter(dest =>
            dest.name.toLowerCase().startsWith(term)
        ).slice(0, 5) : [];

    dom.searchSuggestions.innerHTML = results.map(dest => `
        <div class="search-suggestion-item" data-id="${dest.id}">
            ${dest.name}, ${dest.location}
        </div>
    `).join('');

    dom.searchSuggestions.style.display = results.length ? 'block' : 'none';
}

// Pagination System
function setupPagination() {
    dom.prevPage.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    dom.nextPage.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
}

function updatePagination() {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    renderDestinations(filteredDestinations.slice(start, end));
    dom.currentPage.textContent = currentPage;
    dom.prevPage.disabled = currentPage === 1;
    dom.nextPage.disabled = currentPage === Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
}

// Filter System
function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filteredDestinations = filter === 'all' ? 
                [...allDestinations] : 
                allDestinations.filter(dest => dest.type === filter);
            
            currentPage = 1;
            updatePagination();
        });
    });
}

// Geolocation System
async function handleGeolocation() {
    try {
        const position = await getCurrentPosition();
        currentPosition = position.coords;
        showNearbyDestinations();
    } catch (error) {
        alert('Unable to access location: ' + error.message);
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) reject(new Error('Geolocation not supported'));
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
    });
}

function showNearbyDestinations() {
    filteredDestinations = filteredDestinations.map(dest => ({
        ...dest,
        distance: calculateDistance(
            currentPosition.latitude,
            currentPosition.longitude,
            dest.coordinates.lat,
            dest.coordinates.lng
        )
    })).sort((a, b) => a.distance - b.distance);

    currentPage = 1;
    updatePagination();
}

// Modal System
function setupModal() {
    dom.destinationGrid.addEventListener('click', async (e) => {
        const card = e.target.closest('.destination-card');
        if (card) {
            const destId = card.dataset.id;
            const dest = allDestinations.find(d => d.id === destId);
            if (dest) {
                currentModalDestination = dest;
                showDestinationModal(dest);
            }
        }
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            dom.destinationModal.style.display = 'none';
            dom.loginModal.style.display = 'none';
        });
    });
}

function showDestinationModal(dest) {
    const modalBody = dom.destinationModal.querySelector('.modal-body');
    const allImages = [...dest.images];
    let userUploadedImages = [];
    
    if (uploadedImages[dest.id]) {
        userUploadedImages = uploadedImages[dest.id];
        allImages.push(...userUploadedImages.map(img => img.url));
    }
    
    modalBody.innerHTML = `
        <div class="image-gallery">
            <div class="gallery-main-image" 
                 style="background-image: url('${allImages[0]}')"></div>
            <div class="gallery-thumbnails">
                ${allImages.map((img, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                         style="background-image: url('${img}')" 
                         data-index="${index}">
                         ${index >= dest.images.length && isLoggedIn ? 
                            `<button class="delete-image-btn" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>` : ''
                         }
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="modal-details">
            <h2>${dest.name}</h2>
            <div class="location-rating">
                <span><i class="fas fa-map-marker-alt"></i> ${dest.location}</span>
                <span><i class="fas fa-star"></i> ${dest.rating}</span>
            </div>
            <p class="description">${dest.description}</p>
            <div class="activities">
                <h4>Activities:</h4>
                <ul>${dest.activities.map(a => `<li>${a}</li>`).join('')}</ul>
            </div>
            <div class="price-section">
                <span>Starting from: <strong>₹${dest.price}</strong> per person</span>
            </div>
            <button class="book-now-btn">Book Now</button>
        </div>
        <div class="upload-section">
            <input type="file" id="imageUpload" accept="image/*" multiple style="display: none;">
            <button class="upload-btn" id="uploadBtn">
                <i class="fas fa-camera"></i> Add Your Photos
            </button>
        </div>
    `;
    
    // Setup thumbnail click handlers
    modalBody.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-image-btn')) {
                const index = thumb.dataset.index;
                modalBody.querySelector('.gallery-main-image').style.backgroundImage = 
                    `url('${allImages[index]}')`;
                modalBody.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            }
        });
    });
    
    // Setup delete buttons
    modalBody.querySelectorAll('.delete-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.index);
            deleteUploadedImage(dest.id, index - dest.images.length);
        });
    });
    
    // Setup image upload
    const uploadBtn = modalBody.querySelector('#uploadBtn');
    const fileInput = modalBody.querySelector('#imageUpload');
    
    uploadBtn.addEventListener('click', () => {
        if (isLoggedIn) {
            fileInput.click();
        } else {
            dom.loginModal.style.display = 'block';
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0 && isLoggedIn) {
            const thumbnails = modalBody.querySelector('.gallery-thumbnails');
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // Store the image in localStorage
                    const newImage = {
                        url: event.target.result,
                        uploadedBy: currentUser.username,
                        timestamp: new Date().toISOString()
                    };
                    
                    if (!uploadedImages[dest.id]) {
                        uploadedImages[dest.id] = [];
                    }
                    uploadedImages[dest.id].push(newImage);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedImages));
                    
                    // Add to the gallery
                    const newIndex = allImages.length;
                    const newThumb = document.createElement('div');
                    newThumb.className = 'thumbnail';
                    newThumb.style.backgroundImage = `url('${newImage.url}')`;
                    newThumb.dataset.index = newIndex;
                    newThumb.innerHTML = `
                        <button class="delete-image-btn" data-index="${newIndex}">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    thumbnails.appendChild(newThumb);
                    
                    // Add click handler for new thumbnail
                    newThumb.addEventListener('click', (e) => {
                        if (!e.target.closest('.delete-image-btn')) {
                            modalBody.querySelector('.gallery-main-image').style.backgroundImage = 
                                `url('${newImage.url}')`;
                            modalBody.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                            newThumb.classList.add('active');
                        }
                    });
                    
                    // Add delete handler
                    newThumb.querySelector('.delete-image-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteUploadedImage(dest.id, uploadedImages[dest.id].length - 1);
                    });
                };
                reader.readAsDataURL(file);
            });
            
            // Update the card to show new image count
            updateDestinationCard(dest.id);
        }
    });
    
    dom.destinationModal.style.display = 'block';
}

function deleteUploadedImage(destId, imgIndex) {
    if (uploadedImages[destId] && uploadedImages[destId][imgIndex]) {
        // Check if current user is the one who uploaded the image
        if (uploadedImages[destId][imgIndex].uploadedBy === currentUser.username) {
            uploadedImages[destId].splice(imgIndex, 1);
            if (uploadedImages[destId].length === 0) {
                delete uploadedImages[destId];
            }
            localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedImages));
            
            // Refresh the modal
            const dest = allDestinations.find(d => d.id === destId);
            if (dest) {
                showDestinationModal(dest);
            }
            
            // Update the card
            updateDestinationCard(destId);
        } else {
            alert('You can only delete images you uploaded');
        }
    }
}

function updateDestinationCard(destId) {
    const card = document.querySelector(`.destination-card[data-id="${destId}"]`);
    if (card) {
        const dest = allDestinations.find(d => d.id === destId);
        if (dest) {
            const allImages = [...dest.images];
            if (uploadedImages[dest.id]) {
                allImages.push(...uploadedImages[dest.id].map(img => img.url));
            }
            
            const imageCountBadge = card.querySelector('.image-count-badge');
            if (imageCountBadge) {
                imageCountBadge.innerHTML = `<i class="fas fa-images"></i> ${allImages.length}`;
            }
            
            // Update main image if it's the first uploaded image
            if (uploadedImages[dest.id] && uploadedImages[dest.id].length === 1) {
                const cardImage = card.querySelector('.card-image');
                if (cardImage) {
                    cardImage.style.backgroundImage = `url('${uploadedImages[dest.id][0].url}')`;
                }
            }
        }
    }
}

// Utility Functions
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), timeout);
    };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * 
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function showLoading(loading) {
    dom.destinationGrid.innerHTML = loading ? 
        '<div class="loading-spinner"><i class="fas fa-compass fa-spin"></i></div>' : 
        '';
}

// Event Listeners
function setupEventListeners() {
    setupSearch();
    setupFilters();
    setupPagination();
    setupModal();
    
    dom.geoLocation.addEventListener('click', handleGeolocation);
    dom.logoutBtn.addEventListener('click', handleLogout);
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-box')) {
            dom.searchSuggestions.style.display = 'none';
        }
    });

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
        document.querySelector('.nav-right').classList.toggle('active');
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', initDestinationPage); 