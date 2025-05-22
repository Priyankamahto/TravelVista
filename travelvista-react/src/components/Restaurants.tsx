import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Restaurants.css';

interface Restaurant {
    id: string;
    name: string;
    location: string;
    cuisine: string;
    rating: number;
    priceRange: string;
    image: string;
    features: string[];
}

const restaurantsData: Restaurant[] = [
    {
        id: 'r1',
        name: 'Spice Garden',
        location: 'MG Road, Bangalore',
        cuisine: 'Indian',
        rating: 4.8,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
        features: ['Outdoor Seating', 'Live Music', 'Valet Parking']
    },
    {
        id: 'r2',
        name: 'Sushi Bay',
        location: 'Indiranagar, Bangalore',
        cuisine: 'Japanese',
        rating: 4.6,
        priceRange: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?q=80&w=1000',
        features: ['Reservations', 'Private Dining', 'Wheelchair Accessible']
    },
    {
        id: 'r3',
        name: 'La Piazza',
        location: 'Koramangala, Bangalore',
        cuisine: 'Italian',
        rating: 4.7,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000',
        features: ['Full Bar', 'Delivery', 'Takeout']
    },
    {
        id: 'r4',
        name: 'The Dragon House',
        location: 'HSR Layout, Bangalore',
        cuisine: 'Chinese',
        rating: 4.5,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=1000',
        features: ['Buffet', 'Family Style', 'Group Friendly']
    },
    {
        id: 'r5',
        name: 'Mediterranean Bistro',
        location: 'Church Street, Bangalore',
        cuisine: 'Mediterranean',
        rating: 4.9,
        priceRange: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000',
        features: ['Rooftop', 'Wine Bar', 'Vegetarian Friendly']
    },
    {
        id: 'r6',
        name: 'Taco Fiesta',
        location: 'Whitefield, Bangalore',
        cuisine: 'Mexican',
        rating: 4.4,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?q=80&w=1000',
        features: ['Happy Hour', 'Late Night', 'Sports Bar']
    }
];

const Restaurants: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleFilter = (cuisine: string) => {
        setIsLoading(true);
        setCurrentFilter(cuisine);
        setTimeout(() => setIsLoading(false), 500); // Simulate loading
    };

    const filteredRestaurants = restaurantsData.filter(restaurant => {
        const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = currentFilter === 'all' || restaurant.cuisine.toLowerCase() === currentFilter.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <Navigation />
            
            <header className="page-header">
                <h1>Discover Amazing Restaurants</h1>
                <p>Explore the best dining experiences from around the world, from cozy cafes to fine dining establishments.</p>
                
                <div className="search-container">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search restaurants by name or location..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${currentFilter === 'indian' ? 'active' : ''}`}
                        onClick={() => handleFilter('indian')}
                    >
                        Indian
                    </button>
                    <button
                        className={`filter-btn ${currentFilter === 'chinese' ? 'active' : ''}`}
                        onClick={() => handleFilter('chinese')}
                    >
                        Chinese
                    </button>
                    <button
                        className={`filter-btn ${currentFilter === 'italian' ? 'active' : ''}`}
                        onClick={() => handleFilter('italian')}
                    >
                        Italian
                    </button>
                    <button
                        className={`filter-btn ${currentFilter === 'japanese' ? 'active' : ''}`}
                        onClick={() => handleFilter('japanese')}
                    >
                        Japanese
                    </button>
                    <button
                        className={`filter-btn ${currentFilter === 'mediterranean' ? 'active' : ''}`}
                        onClick={() => handleFilter('mediterranean')}
                    >
                        Mediterranean
                    </button>
                </div>
            </header>

            <main className="restaurants-container">
                {isLoading ? (
                    <div className="loading-spinner">
                        <i className="fas fa-utensils"></i>
                    </div>
                ) : (
                    <div className="restaurants-grid">
                        {filteredRestaurants.map(restaurant => (
                            <div 
                                key={restaurant.id} 
                                className="restaurant-card"
                                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                            >
                                <div className="restaurant-image">
                                    <img src={restaurant.image} alt={restaurant.name} />
                                    <span className="cuisine-tag">{restaurant.cuisine}</span>
                                </div>
                                <div className="restaurant-info">
                                    <h3 className="restaurant-name">{restaurant.name}</h3>
                                    <div className="restaurant-location">
                                        <i className="fas fa-map-marker-alt"></i>
                                        {restaurant.location}
                                    </div>
                                    <div className="restaurant-features">
                                        {restaurant.features.map((feature, index) => (
                                            <span key={index} className="feature">
                                                <i className="fas fa-check"></i>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="restaurant-meta">
                                        <div className="rating">
                                            <i className="fas fa-star"></i>
                                            {restaurant.rating}
                                        </div>
                                        <div className="price-range">{restaurant.priceRange}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </>
    );
};

export default Restaurants; 