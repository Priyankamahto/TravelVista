// Data for all pages
const data = {
    destinations: [
        {
            name: "Santorini, Greece",
            image: "https://images.unsplash.com/photo-1578439230783-ef9c7bf6bbca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            rating: 4.9,
            description: "Whitewashed buildings with blue domes overlooking the Aegean Sea"
        },
        {
            name: "Machu Picchu, Peru",
            image: "https://images.unsplash.com/photo-1526392060635-9d601cd437b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            rating: 4.8,
            description: "Ancient Incan city nestled in the Andes Mountains"
        }
    ],
    hotels: [
        {
            name: "Burj Al Arab, Dubai",
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            rating: 5.0,
            price: "$800/night"
        }
    ],
    restaurants: [
        {
            name: "Osteria Francescana, Italy",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
            rating: 4.9,
            cuisine: "Modern Italian"
        }
    ]
};

// Card Template
function createCard(item) {
    return `
        <div class="card">
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <div class="rating">${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 ? '½' : ''}</div>
                <p>${item.description || item.price || item.cuisine}</p>
                <button class="cta-button">View Details</button>
            </div>
        </div>
    `;
}

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.split('/').pop();
    const container = document.querySelector('.cards-container');
    
    if (container) {
        let dataset = [];
        if (path === 'destinations.html') dataset = data.destinations;
        if (path === 'hotels.html') dataset = data.hotels;
        if (path === 'restaurants.html') dataset = data.restaurants;
        
        container.innerHTML = dataset.map(createCard).join('');
    }

    // Add click handlers
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            alert('Feature coming soon!');
        });
    });
});