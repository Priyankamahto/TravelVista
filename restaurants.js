// Configuration Constants
const RESTAURANTS_COUNT = 20;
const ITEMS_PER_PAGE = 9;
const CUISINES = ["italian", "asian", "mediterranean", "american", "indian"];
const MENU_CATEGORIES = ["Appetizers", "Main Courses", "Desserts", "Beverages"];

// Global State
let allRestaurants = [];
let filteredRestaurants = [];
let currentPage = 1;
let currentPosition = null;
const isLoggedIn = false; // Simulate login state

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the page
  initRestaurantsPage();

  // Setup event listeners
  setupEventListeners();
});

// Main Initialization
async function initRestaurantsPage() {
  try {
    showLoading(true);
    
    // Check if we have restaurants in localStorage
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      allRestaurants = JSON.parse(storedRestaurants);
    } else {
      // Generate sample restaurant data if none exists
      allRestaurants = generateRestaurants(RESTAURANTS_COUNT);
      localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
    }
    
    filteredRestaurants = [...allRestaurants];
    updatePagination();
  } catch (error) {
    console.error("Initialization error:", error);
    showError("Failed to load restaurants. Please try again later.");
  } finally {
    showLoading(false);
  }
}

// Data Generation
function generateRestaurants(count) {
  const cities = ["Paris", "New York", "Tokyo", "Dubai", "Rome", "Sydney", "London", "Bangkok"];
  const restaurantNames = [
    "La Bella Vita",
    "Sakura Garden",
    "Mediterranean Breeze",
    "Urban Grill",
    "Spice Route",
    "Golden Dragon",
    "Olive & Vine",
    "The Hungry Bear",
    "Saffron House",
    "Ocean Blue",
    "Rustic Table",
    "Fusion Kitchen",
    "The Green Plate",
    "Fire & Ice",
    "Taste of India",
    "Bamboo House",
    "The Cozy Corner",
    "Sunset Bistro",
    "Mamma Mia",
    "The Spicy Wok",
  ];

  return Array.from({ length: count }, (_, i) => {
    const cuisine = CUISINES[i % CUISINES.length];
    const city = cities[i % cities.length];
    const name = restaurantNames[i % restaurantNames.length];

    return {
      id: `R${Date.now()}${i}`,
      name: name,
      location: city,
      cuisine: cuisine,
      address: `${Math.floor(Math.random() * 200) + 1} ${getRandomStreetName()}, ${city}`,
      coordinates: {
        lat: (Math.random() * 180 - 90).toFixed(4),
        lng: (Math.random() * 360 - 180).toFixed(4),
      },
      image: `https://source.unsplash.com/800x600/?restaurant,${cuisine},food`,
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviewCount: Math.floor(Math.random() * 500) + 10,
      priceRange: getRandomPriceRange(),
      openingHours: "10:00 AM - 10:00 PM",
      phone: `+${Math.floor(Math.random() * 100)} ${Math.floor(Math.random() * 10000000000)}`,
      website: `https://www.${name.toLowerCase().replace(/\s+/g, "")}.com`,
      description: getRandomDescription(cuisine),
      menu: generateMenu(cuisine),
      reviews: generateReviews(Math.floor(Math.random() * 10) + 3),
      images: Array(Math.floor(Math.random() * 6) + 3)
        .fill()
        .map((_, i) => `https://source.unsplash.com/800x600/?${cuisine},food,restaurant,${i}`),
      features: getRandomFeatures(),
      ownerResponse: Math.random() > 0.7 ? getRandomOwnerResponse() : null,
      isVerified: Math.random() > 0.3,
      addedBy: Math.random() > 0.5 ? "visitor" : "owner",
      addedDate: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
    };
  });
}

function generateMenu(cuisine) {
  const menuItems = {
    italian: {
      Appetizers: ["Bruschetta", "Caprese Salad", "Arancini"],
      "Main Courses": ["Spaghetti Carbonara", "Margherita Pizza", "Risotto"],
      Desserts: ["Tiramisu", "Panna Cotta", "Cannoli"],
      Beverages: ["Italian Soda", "Espresso", "Limoncello"],
    },
    asian: {
      Appetizers: ["Spring Rolls", "Edamame", "Gyoza"],
      "Main Courses": ["Pad Thai", "Sushi Platter", "Beef Teriyaki"],
      Desserts: ["Mochi", "Green Tea Ice Cream", "Mango Sticky Rice"],
      Beverages: ["Bubble Tea", "Sake", "Jasmine Tea"],
    },
    mediterranean: {
      Appetizers: ["Hummus", "Tzatziki", "Dolma"],
      "Main Courses": ["Moussaka", "Paella", "Souvlaki"],
      Desserts: ["Baklava", "Turkish Delight", "Loukoumades"],
      Beverages: ["Mint Tea", "Ouzo", "Ayran"],
    },
    american: {
      Appetizers: ["Buffalo Wings", "Loaded Nachos", "Onion Rings"],
      "Main Courses": ["Cheeseburger", "BBQ Ribs", "Mac & Cheese"],
      Desserts: ["Apple Pie", "Cheesecake", "Brownie Sundae"],
      Beverages: ["Milkshake", "Craft Beer", "Lemonade"],
    },
    indian: {
      Appetizers: ["Samosas", "Pakora", "Papadum"],
      "Main Courses": ["Butter Chicken", "Biryani", "Palak Paneer"],
      Desserts: ["Gulab Jamun", "Kheer", "Jalebi"],
      Beverages: ["Lassi", "Masala Chai", "Mango Juice"],
    },
  };

  const menu = {};

  MENU_CATEGORIES.forEach((category) => {
    const items = menuItems[cuisine][category] || menuItems["american"][category];
    menu[category] = items.map((item) => ({
      name: item,
      description: getRandomFoodDescription(item),
      price: (Math.random() * 20 + 5).toFixed(2),
      image: `https://source.unsplash.com/100x100/?${item.toLowerCase().replace(/\s+/g, ",")},food`,
    }));
  });

  return menu;
}

function generateReviews(count) {
  const reviewers = [
    { name: "John D.", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Sarah M.", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Robert K.", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Emily L.", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "Michael P.", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Jessica T.", avatar: "https://randomuser.me/api/portraits/women/6.jpg" },
  ];

  const reviewTitles = [
    "Amazing experience!",
    "Great food, will return",
    "Decent place with good service",
    "Loved the atmosphere",
    "Fantastic flavors",
    "A hidden gem",
    "Worth every penny",
    "Exceeded expectations",
    "Memorable dining experience",
    "Authentic cuisine",
  ];

  return Array.from({ length: count }, (_, i) => {
    const reviewer = reviewers[i % reviewers.length];
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60));

    return {
      id: `REV${Date.now()}${i}`,
      reviewer: reviewer.name,
      avatar: reviewer.avatar,
      rating: rating,
      title: reviewTitles[i % reviewTitles.length],
      content: getRandomReviewContent(rating),
      date: date.toISOString().split("T")[0],
      photos:
        Math.random() > 0.5
          ? Array(Math.floor(Math.random() * 3) + 1)
              .fill()
              .map((_, j) => `https://source.unsplash.com/100x100/?food,restaurant,${j}`)
          : [],
      helpful: Math.floor(Math.random() * 20),
    };
  });
}

// Rendering Functions
function renderRestaurants(restaurants) {
  const restaurantGrid = document.getElementById("restaurantGrid");
  if (!restaurantGrid) return;

  restaurantGrid.innerHTML = restaurants.map((restaurant) => createRestaurantCard(restaurant)).join("");
}

function createRestaurantCard(restaurant) {
  return `
    <article class="restaurant-card" data-id="${restaurant.id}">
      <div class="card-image" style="background-image: url('${restaurant.image}')">
        <span class="card-badge">${capitalizeFirstLetter(restaurant.cuisine)}</span>
        ${restaurant.isVerified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>' : ""}
      </div>
      <div class="card-content">
        <h3>${restaurant.name}</h3>
        <div class="card-location">
          <i class="fas fa-map-marker-alt"></i> ${restaurant.location}
        </div>
        <div class="card-stats">
          <span class="rating">
            <i class="fas fa-star"></i> ${restaurant.rating}
          </span>
          <span>
            <i class="fas fa-comment"></i> ${restaurant.reviewCount} reviews
          </span>
          <span>
            <i class="fas fa-dollar-sign"></i> ${restaurant.priceRange}
          </span>
        </div>
        <button class="view-menu-btn" data-id="${restaurant.id}">View Details</button>
      </div>
    </article>
  `;
}

// Event Listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const heroSearchInput = document.getElementById("heroSearchInput");
  const searchButton = document.getElementById("searchButton");
  const heroSearchButton = document.getElementById("heroSearchButton");

  if (searchInput && searchButton) {
    searchButton.addEventListener("click", () => {
      searchRestaurants(searchInput.value);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchRestaurants(searchInput.value);
      }
    });
  }

  if (heroSearchInput && heroSearchButton) {
    heroSearchButton.addEventListener("click", () => {
      searchRestaurants(heroSearchInput.value);
    });

    heroSearchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        searchRestaurants(heroSearchInput.value);
      }
    });
  }

  // Filter buttons
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      filterRestaurants(filter);
    });
  });

  // Pagination
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");

  if (prevPageBtn && nextPageBtn) {
    prevPageBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        updatePagination();
      }
    });

    nextPageBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
      }
    });
  }

  // Restaurant card click
  document.addEventListener("click", (e) => {
    const viewDetailsBtn = e.target.closest(".view-menu-btn");
    if (viewDetailsBtn) {
      const restaurantId = viewDetailsBtn.dataset.id;
      window.location.href = `restaurant-details.jsx?id=${restaurantId}`;
    }
  });

  // Add restaurant button
  const addRestaurantBtn = document.getElementById("addRestaurantBtn");
  const addRestaurantModal = document.getElementById("addRestaurantModal");
  const closeAddModal = document.getElementById("closeAddModal");
  const cancelAddRestaurant = document.getElementById("cancelAddRestaurant");

  if (addRestaurantBtn && addRestaurantModal) {
    addRestaurantBtn.addEventListener("click", () => {
      addRestaurantModal.style.display = "block";

      // Check if user is logged in
      if (isLoggedIn) {
        document.getElementById("loginPrompt").style.display = "none";
        document.getElementById("addRestaurantForm").style.display = "block";
      } else {
        document.getElementById("loginPrompt").style.display = "block";
        document.getElementById("addRestaurantForm").style.display = "none";
      }
    });
  }

  if (closeAddModal) {
    closeAddModal.addEventListener("click", () => {
      addRestaurantModal.style.display = "none";
    });
  }

  if (cancelAddRestaurant) {
    cancelAddRestaurant.addEventListener("click", () => {
      addRestaurantModal.style.display = "none";
    });
  }

  // Add menu item button
  const addMenuItemBtn = document.getElementById("addMenuItem");
  if (addMenuItemBtn) {
    addMenuItemBtn.addEventListener("click", () => {
      const menuItems = document.getElementById("menuItems");
      const newItem = document.createElement("div");
      newItem.className = "menu-item";
      newItem.innerHTML = `
        <input type="text" placeholder="Dish name" class="dish-name" required>
        <input type="text" placeholder="Price" class="dish-price" required>
        <button type="button" class="remove-item"><i class="fas fa-times"></i></button>
      `;
      menuItems.appendChild(newItem);

      // Add event listener to the remove button
      const removeBtn = newItem.querySelector(".remove-item");
      removeBtn.addEventListener("click", () => {
        menuItems.removeChild(newItem);
      });
    });
  }

  // Image upload preview
  const restaurantImages = document.getElementById("restaurantImages");
  if (restaurantImages) {
    restaurantImages.addEventListener("change", handleImageUpload);
  }

  // Form submission
  const addRestaurantForm = document.getElementById("addRestaurantForm");
  if (addRestaurantForm) {
    addRestaurantForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Validate form
      const name = document.getElementById("restaurantName").value;
      const location = document.getElementById("restaurantLocation").value;
      const cuisine = document.getElementById("restaurantCuisine").value;
      const description = document.getElementById("restaurantDescription").value;
      const address = document.getElementById("restaurantAddress").value;
      const phone = document.getElementById("restaurantPhone").value;
      const website = document.getElementById("restaurantWebsite").value;
      const userType = document.querySelector("input[name='userType']:checked").value;
      
      // Validate images
      const imagePreview = document.getElementById("imagePreview");
      if (imagePreview.children.length < 3) {
        alert("Please upload at least 3 photos of the restaurant.");
        return;
      }

      // Create new restaurant object
      const newRestaurant = {
        id: `R${Date.now()}`,
        name: name,
        location: location,
        cuisine: cuisine,
        address: address,
        coordinates: {
          lat: (Math.random() * 180 - 90).toFixed(4),
          lng: (Math.random() * 360 - 180).toFixed(4),
        },
        image: "https://source.unsplash.com/800x600/?restaurant,food", // Default image
        rating: "0.0",
        reviewCount: 0,
        priceRange: "$",
        openingHours: "10:00 AM - 10:00 PM",
        phone: phone || "Not specified",
        website: website || "Not specified",
        description: description,
        menu: {},
        reviews: [],
        images: Array.from(imagePreview.children).map(item => item.querySelector("img").src),
        features: ["Takeout", "Dine-in"],
        isVerified: userType === "owner",
        addedBy: userType,
        addedDate: new Date().toISOString()
      };

      // Get menu items
      const menuItems = document.getElementById("menuItems").children;
      const menu = {};
      
      Array.from(menuItems).forEach(item => {
        const category = "Main Courses"; // Default category
        const name = item.querySelector(".dish-name").value;
        const price = item.querySelector(".dish-price").value;
        
        if (!menu[category]) {
          menu[category] = [];
        }
        
        menu[category].push({
          name: name,
          description: "Delicious dish",
          price: price,
          image: `https://source.unsplash.com/100x100/?${name.toLowerCase().replace(/\s+/g, ",")},food`
        });
      });
      
      newRestaurant.menu = menu;

      // Add to restaurants array
      allRestaurants.unshift(newRestaurant);
      filteredRestaurants = [...allRestaurants];
      
      // Save to localStorage
      localStorage.setItem("restaurants", JSON.stringify(allRestaurants));
      
      // Show success message
      alert("Restaurant submitted successfully! It will be reviewed before being published.");
      addRestaurantModal.style.display = "none";
      
      // Refresh the list
      currentPage = 1;
      updatePagination();
    });
  }

  // Geolocation
  const geoLocationBtn = document.getElementById("geoLocation");
  if (geoLocationBtn) {
    geoLocationBtn.addEventListener("click", handleGeolocation);
  }
}

// Search and Filter Functions
function searchRestaurants(term) {
  if (!term.trim()) {
    filteredRestaurants = [...allRestaurants];
  } else {
    term = term.toLowerCase().trim();
    filteredRestaurants = allRestaurants.filter(
      (restaurant) => 
        restaurant.location.toLowerCase().includes(term) || 
        restaurant.name.toLowerCase().includes(term) ||
        restaurant.cuisine.toLowerCase().includes(term)
    );
  }

  currentPage = 1;
  updatePagination();

  // Scroll to results
  document.querySelector(".filters-container").scrollIntoView({ behavior: "smooth" });
}

function filterRestaurants(filter) {
  if (filter === "all") {
    filteredRestaurants = [...allRestaurants];
  } else {
    filteredRestaurants = allRestaurants.filter((restaurant) => restaurant.cuisine === filter);
  }

  currentPage = 1;
  updatePagination();
}

// Pagination
function updatePagination() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const paginatedRestaurants = filteredRestaurants.slice(start, end);

  renderRestaurants(paginatedRestaurants);

  const currentPageElement = document.getElementById("currentPage");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");

  if (currentPageElement) {
    currentPageElement.textContent = currentPage;
  }

  if (prevPageBtn) {
    prevPageBtn.disabled = currentPage === 1;
  }

  if (nextPageBtn) {
    nextPageBtn.disabled = currentPage === Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE);
  }
}

// Image Upload Handler
function handleImageUpload(e) {
  const files = e.target.files;
  const imagePreview = document.getElementById("imagePreview");

  if (imagePreview) {
    imagePreview.innerHTML = "";

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;

      const reader = new FileReader();
      reader.onload = (event) => {
        const previewItem = document.createElement("div");
        previewItem.className = "preview-item";
        previewItem.innerHTML = `
          <img src="${event.target.result}" alt="Preview">
          <button type="button" class="remove-preview"><i class="fas fa-times"></i></button>
        `;
        imagePreview.appendChild(previewItem);

        // Add event listener to remove button
        const removeBtn = previewItem.querySelector(".remove-preview");
        removeBtn.addEventListener("click", () => {
          imagePreview.removeChild(previewItem);
        });
      };

      reader.readAsDataURL(file);
    }
  }
}

// Geolocation Handler
function handleGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Sort restaurants by distance
        filteredRestaurants = [...allRestaurants].sort((a, b) => {
          const distA = calculateDistance(
            currentPosition.lat,
            currentPosition.lng,
            a.coordinates.lat,
            a.coordinates.lng,
          );

          const distB = calculateDistance(
            currentPosition.lat,
            currentPosition.lng,
            b.coordinates.lat,
            b.coordinates.lng,
          );

          return distA - distB;
        });

        currentPage = 1;
        updatePagination();

        // Scroll to results
        document.querySelector(".filters-container").scrollIntoView({ behavior: "smooth" });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location. Please check your browser settings.");
      },
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// Utility Functions
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showLoading(loading) {
  const restaurantGrid = document.getElementById("restaurantGrid");
  if (restaurantGrid) {
    restaurantGrid.innerHTML = loading
      ? '<div class="loading-spinner"><i class="fas fa-utensils fa-spin"></i><p>Loading restaurants...</p></div>'
      : "";
  }
}

function showError(message) {
  const restaurantGrid = document.getElementById("restaurantGrid");
  if (restaurantGrid) {
    restaurantGrid.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <h2>Oops! Something went wrong</h2>
        <p>${message}</p>
      </div>
    `;
  }
}

// Helper functions for generating random data
function getRandomStreetName() {
  const streets = ["Main St", "Oak Ave", "Maple Rd", "Broadway", "Park Ave", "Sunset Blvd", "Ocean Dr", "River Rd"];
  return streets[Math.floor(Math.random() * streets.length)];
}

function getRandomPriceRange() {
  const ranges = ["$", "$$", "$$$", "$$$$"];
  return ranges[Math.floor(Math.random() * ranges.length)];
}

function getRandomDescription(cuisine) {
  const descriptions = {
    italian:
      "Authentic Italian cuisine with homemade pasta and wood-fired pizzas. Our recipes have been passed down through generations, bringing the true taste of Italy to your table.",
    asian:
      "Experience the exotic flavors of Asia with our carefully crafted dishes. From spicy curries to delicate sushi, our menu offers a journey through the diverse cuisines of the East.",
    mediterranean:
      "Savor the fresh and healthy Mediterranean diet with our olive oil-based dishes, fresh seafood, and aromatic herbs. Transport yourself to the sunny shores of the Mediterranean.",
    american:
      "Classic American comfort food with a modern twist. Our generous portions and quality ingredients make every meal satisfying and memorable.",
    indian:
      "Rich and aromatic Indian cuisine featuring traditional spices and cooking techniques. Our tandoor oven produces the most tender meats and authentic naan bread.",
  };

  return (
    descriptions[cuisine] ||
    "A delightful culinary experience with a diverse menu featuring fresh, locally-sourced ingredients. Our passionate chefs create memorable dishes in a welcoming atmosphere."
  );
}

function getRandomFoodDescription(item) {
  const descriptions = {
    Bruschetta: "Toasted bread topped with fresh tomatoes, garlic, and basil",
    "Caprese Salad": "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
    "Spaghetti Carbonara": "Classic pasta with pancetta, egg, and parmesan",
    Tiramisu: "Coffee-soaked ladyfingers with mascarpone cream",
    "Spring Rolls": "Crispy rolls filled with vegetables and served with dipping sauce",
    "Pad Thai": "Stir-fried rice noodles with egg, tofu, bean sprouts, and peanuts",
    Hummus: "Creamy chickpea dip with olive oil and pita bread",
    Moussaka: "Layered eggplant casserole with ground meat and béchamel sauce",
    "Buffalo Wings": "Crispy chicken wings tossed in spicy buffalo sauce",
    Cheeseburger: "Juicy beef patty with melted cheese on a toasted bun",
    Samosas: "Crispy pastry filled with spiced potatoes and peas",
    "Butter Chicken": "Tender chicken in a rich, creamy tomato sauce",
  };

  return descriptions[item] || "A delicious dish prepared with the finest ingredients";
}

function getRandomReviewContent(rating) {
  const positiveReviews = [
    "Absolutely loved this place! The food was incredible and the service was top-notch. Will definitely be coming back soon.",
    "One of the best dining experiences I've had in a long time. Every dish was perfectly prepared and the atmosphere was wonderful.",
    "Fantastic restaurant with amazing flavors. The chef clearly knows what they're doing. Highly recommend!",
    "Great food, friendly staff, and beautiful ambiance. What more could you ask for? A must-visit!",
  ];

  const averageReviews = [
    "Decent place with good food. Service was a bit slow but the quality made up for it. Would visit again.",
    "Nice restaurant with a good selection of dishes. Some were better than others, but overall a pleasant experience.",
    "Food was tasty and the atmosphere was nice. Nothing extraordinary but definitely worth a visit if you're in the area.",
  ];

  if (rating >= 4.5) {
    return positiveReviews[Math.floor(Math.random() * positiveReviews.length)];
  } else {
    return averageReviews[Math.floor(Math.random() * averageReviews.length)];
  }
}

function getRandomFeatures() {
  const allFeatures = [
    "Outdoor Seating",
    "Takeout",
    "Delivery",
    "Reservations",
    "Wheelchair Accessible",
    "Full Bar",
    "Wine Selection",
    "Free Wi-Fi",
    "Live Music",
    "Private Dining",
    "Vegetarian Options",
    "Vegan Options",
    "Gluten-Free Options",
    "Kid-Friendly",
  ];

  const featureCount = Math.floor(Math.random() * 6) + 3;
  const features = [];

  for (let i = 0; i < featureCount; i++) {
    const randomFeature = allFeatures[Math.floor(Math.random() * allFeatures.length)];
    if (!features.includes(randomFeature)) {
      features.push(randomFeature);
    }
  }

  return features;
}

function getRandomOwnerResponse() {
  const responses = [
    "Thank you for your review! We're delighted that you enjoyed your experience with us and hope to welcome you back soon.",
    "We appreciate your feedback and are glad you had a great time. Your support means a lot to us!",
    "Thank you for taking the time to share your experience. We're constantly working to provide the best service possible.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}