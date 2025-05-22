// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close Menu on Click Outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Indicator Animation
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    scrollIndicator.style.opacity = 1 - Math.min(scrollPos / 300, 1);
});

// Card Hover Effect
document.querySelectorAll('.explore-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${y * 10}deg)
            rotateY(${-x * 10}deg)
            translateZ(20px)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Responsive Auth Buttons
function handleAuthButtons() {
    const authButtons = document.querySelector('.auth-buttons');
    if (window.innerWidth <= 480) {
        authButtons.style.display = 'none';
    } else {
        authButtons.style.display = 'flex';
    }
}

window.addEventListener('resize', handleAuthButtons);
window.addEventListener('load', handleAuthButtons);

// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication Functions
document.addEventListener('DOMContentLoaded', () => {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const userType = document.getElementById('userTypeLogin').value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Redirect based on user type
                    window.location.href = `${userType}-dashboard.html`;
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }

    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if(signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const fullName = document.getElementById('fullName').value;
            const userType = document.getElementById('userType').value;
            const businessType = document.getElementById('businessType').value;
            const latitude = document.getElementById('latitude').value;
            const longitude = document.getElementById('longitude').value;

            if(password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Add additional user data to Firestore
                    return firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                        fullName,
                        userType,
                        businessType: userType === 'business' ? businessType : null,
                        location: latitude && longitude ? 
                            { lat: parseFloat(latitude), lng: parseFloat(longitude) } : null,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                })
                .then(() => {
                    alert('Account created successfully!');
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    alert(error.message);
                });
        });
    }

    // Google Authentication
    document.getElementById('googleLogin')?.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    // Updated Geolocation Handler with Reverse Geocoding
document.getElementById('getLocation')?.addEventListener('click', () => {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                document.getElementById('latitude').value = lat;
                document.getElementById('longitude').value = lng;
                
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                    );
                    const data = await response.json();
                    
                    document.getElementById('city').value = data.address.city || data.address.town || '';
                    document.getElementById('state').value = data.address.state || '';
                    document.getElementById('pincode').value = data.address.postcode || '';
                    document.getElementById('country').value = data.address.country || '';
                    
                    document.querySelector('.address-details').style.display = 'block';
                } catch (error) {
                    alert('Error fetching location details');
                }
            },
            (error) => {
                alert('Error getting location: ' + error.message);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});

    // Business Type Toggle
    document.getElementById('userType')?.addEventListener('change', function() {
        const businessTypeDiv = document.querySelector('.business-type');
        businessTypeDiv.style.display = this.value === 'business' ? 'block' : 'none';
    });
});