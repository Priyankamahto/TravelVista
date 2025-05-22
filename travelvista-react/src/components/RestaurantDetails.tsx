import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import '../styles/RestaurantDetails.css';

interface Restaurant {
    id: string;
    name: string;
    location: string;
    cuisine: string;
    rating: number;
    priceRange: string;
    image: string;
    features: string[];
    description: string;
    menu: {
        name: string;
        price: string;
    }[];
    openingHours: string;
    contact: string;
}

const restaurantsData: Restaurant[] = [
    {
        id: 'r1',
        name: 'Spice Garden',
        location: 'MG Road, Bangalore',
        cuisine: 'South Indian',
        rating: 4.8,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000',
        features: ['Outdoor Seating', 'Live Music', 'Valet Parking'],
        description: 'Experience authentic South Indian cuisine in a modern setting. Our chefs use traditional recipes with a contemporary twist, bringing you the best of Karnataka\'s culinary heritage.',
        menu: [
            { name: 'Masala Dosa', price: '₹150' },
            { name: 'Bisi Bele Bath', price: '₹200' },
            { name: 'Filter Coffee', price: '₹50' }
        ],
        openingHours: '7:00 AM - 11:00 PM',
        contact: '+91 9876543210'
    },
    {
        id: 'r2',
        name: 'Dilli Darbar',
        location: 'Connaught Place, Delhi',
        cuisine: 'North Indian',
        rating: 4.7,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000',
        features: ['Family Dining', 'Private Rooms', 'Live Tandoor'],
        description: 'A royal dining experience offering authentic North Indian cuisine. Our chefs specialize in Mughlai and Punjabi dishes, cooked in traditional clay ovens.',
        menu: [
            { name: 'Butter Chicken', price: '₹450' },
            { name: 'Dal Makhani', price: '₹350' },
            { name: 'Naan Basket', price: '₹200' }
        ],
        openingHours: '11:00 AM - 11:00 PM',
        contact: '+91 9876543211'
    },
    {
        id: 'r3',
        name: 'Coastal Spice',
        location: 'Marine Drive, Mumbai',
        cuisine: 'Coastal Indian',
        rating: 4.9,
        priceRange: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000',
        features: ['Sea View', 'Fresh Seafood', 'Wine Pairing'],
        description: 'Experience the authentic flavors of coastal India with our fresh seafood specialties. Our menu features traditional recipes from Kerala, Goa, and Maharashtra.',
        menu: [
            { name: 'Prawn Curry', price: '₹650' },
            { name: 'Fish Thali', price: '₹550' },
            { name: 'Coconut Rice', price: '₹250' }
        ],
        openingHours: '12:00 PM - 11:00 PM',
        contact: '+91 9876543212'
    },
    {
        id: 'r4',
        name: 'Bengal Spice',
        location: 'Park Street, Kolkata',
        cuisine: 'Bengali',
        rating: 4.6,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?q=80&w=1000',
        features: ['Cultural Events', 'Traditional Music', 'Thali Service'],
        description: 'A celebration of Bengali cuisine and culture. Our chefs prepare traditional dishes using authentic recipes passed down through generations.',
        menu: [
            { name: 'Macher Jhol', price: '₹400' },
            { name: 'Shorshe Ilish', price: '₹500' },
            { name: 'Mishti Doi', price: '₹100' }
        ],
        openingHours: '11:00 AM - 10:30 PM',
        contact: '+91 9876543213'
    },
    {
        id: 'r5',
        name: 'Rajasthani Darbar',
        location: 'Jaipur, Rajasthan',
        cuisine: 'Rajasthani',
        rating: 4.8,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1000',
        features: ['Royal Ambience', 'Folk Dance', 'Traditional Seating'],
        description: 'Experience the royal flavors of Rajasthan in a majestic setting. Our menu features authentic Rajasthani dishes prepared with traditional methods.',
        menu: [
            { name: 'Laal Maas', price: '₹550' },
            { name: 'Dal Baati Churma', price: '₹450' },
            { name: 'Ghewar', price: '₹200' }
        ],
        openingHours: '11:00 AM - 11:00 PM',
        contact: '+91 9876543214'
    },
    {
        id: 'r6',
        name: 'Chettinad Palace',
        location: 'Chennai, Tamil Nadu',
        cuisine: 'Chettinad',
        rating: 4.7,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1555992336-03a23c7b20ee?q=80&w=1000',
        features: ['Spice Market', 'Cooking Classes', 'Traditional Decor'],
        description: 'Authentic Chettinad cuisine known for its rich flavors and aromatic spices. Our chefs use traditional recipes from the Chettinad region of Tamil Nadu.',
        menu: [
            { name: 'Chettinad Chicken', price: '₹450' },
            { name: 'Karaikudi Biryani', price: '₹400' },
            { name: 'Paniyaram', price: '₹150' }
        ],
        openingHours: '11:00 AM - 11:00 PM',
        contact: '+91 9876543215'
    },
    {
        id: 'r7',
        name: 'Kashmiri Kitchen',
        location: 'Srinagar, Jammu & Kashmir',
        cuisine: 'Kashmiri',
        rating: 4.8,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
        features: ['Houseboat Dining', 'Traditional Music', 'Garden Seating'],
        description: 'Experience the royal flavors of Kashmir in a traditional setting. Our chefs prepare authentic Kashmiri dishes using age-old recipes and local ingredients.',
        menu: [
            { name: 'Rogan Josh', price: '₹550' },
            { name: 'Gushtaba', price: '₹450' },
            { name: 'Kahwa Tea', price: '₹150' }
        ],
        openingHours: '11:00 AM - 10:30 PM',
        contact: '+91 9876543216'
    },
    {
        id: 'r8',
        name: 'Punjab Dhaba',
        location: 'Amritsar, Punjab',
        cuisine: 'Punjabi',
        rating: 4.9,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1000',
        features: ['Live Tandoor', 'Family Style', 'Traditional Decor'],
        description: 'Authentic Punjabi dhaba experience with the best of North Indian cuisine. Our chefs specialize in tandoori dishes and rich curries.',
        menu: [
            { name: 'Amritsari Kulcha', price: '₹120' },
            { name: 'Sarson da Saag', price: '₹200' },
            { name: 'Lassi', price: '₹80' }
        ],
        openingHours: '7:00 AM - 11:00 PM',
        contact: '+91 9876543217'
    },
    {
        id: 'r9',
        name: 'Konkan Coast',
        location: 'Goa',
        cuisine: 'Goan',
        rating: 4.7,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
        features: ['Beach View', 'Fresh Seafood', 'Live Music'],
        description: 'Experience authentic Goan cuisine with Portuguese influences. Our menu features fresh seafood and traditional Goan specialties.',
        menu: [
            { name: 'Goan Fish Curry', price: '₹450' },
            { name: 'Pork Vindaloo', price: '₹400' },
            { name: 'Bebinca', price: '₹200' }
        ],
        openingHours: '12:00 PM - 11:00 PM',
        contact: '+91 9876543218'
    },
    {
        id: 'r10',
        name: 'Hyderabadi House',
        location: 'Hyderabad, Telangana',
        cuisine: 'Hyderabadi',
        rating: 4.8,
        priceRange: '₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
        features: ['Nawabi Ambience', 'Live Kitchen', 'Hookah Lounge'],
        description: 'Royal Hyderabadi cuisine in a majestic setting. Our chefs prepare authentic Nizami dishes using traditional recipes.',
        menu: [
            { name: 'Hyderabadi Biryani', price: '₹450' },
            { name: 'Haleem', price: '₹350' },
            { name: 'Double Ka Meetha', price: '₹150' }
        ],
        openingHours: '11:00 AM - 11:00 PM',
        contact: '+91 9876543219'
    },
    {
        id: 'r11',
        name: 'Gujarati Thali',
        location: 'Ahmedabad, Gujarat',
        cuisine: 'Gujarati',
        rating: 4.6,
        priceRange: '₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
        features: ['Unlimited Thali', 'Traditional Dance', 'Jain Options'],
        description: 'Authentic Gujarati thali experience with unlimited servings. Our menu features traditional Gujarati dishes with a perfect balance of sweet and savory.',
        menu: [
            { name: 'Gujarati Thali', price: '₹350' },
            { name: 'Dhokla', price: '₹120' },
            { name: 'Jalebi', price: '₹80' }
        ],
        openingHours: '11:00 AM - 10:30 PM',
        contact: '+91 9876543220'
    },
    {
        id: 'r12',
        name: 'Awadhi Darbar',
        location: 'Lucknow, Uttar Pradesh',
        cuisine: 'Awadhi',
        rating: 4.9,
        priceRange: '₹₹₹₹',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000',
        features: ['Royal Dining', 'Live Qawwali', 'Nawabi Decor'],
        description: 'Experience the royal cuisine of Awadh in a majestic setting. Our chefs prepare authentic Awadhi dishes using traditional dum cooking techniques.',
        menu: [
            { name: 'Galouti Kebab', price: '₹550' },
            { name: 'Lucknowi Biryani', price: '₹500' },
            { name: 'Shahi Tukda', price: '₹200' }
        ],
        openingHours: '12:00 PM - 11:00 PM',
        contact: '+91 9876543221'
    }
];

const RestaurantDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const restaurant = restaurantsData.find(r => r.id === id);

    if (!restaurant) {
        return (
            <div className="not-found">
                <h2>Restaurant not found</h2>
                <button onClick={() => navigate('/restaurants')}>Back to Restaurants</button>
            </div>
        );
    }

    return (
        <>
            <Navigation />
            <div className="restaurant-details">
                <div className="restaurant-header">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="restaurant-info">
                        <h1>{restaurant.name}</h1>
                        <div className="restaurant-meta">
                            <span className="rating">
                                <i className="fas fa-star"></i>
                                {restaurant.rating}
                            </span>
                            <span className="price-range">{restaurant.priceRange}</span>
                        </div>
                        <p className="location">
                            <i className="fas fa-map-marker-alt"></i>
                            {restaurant.location}
                        </p>
                        <p className="cuisine">{restaurant.cuisine}</p>
                    </div>
                </div>

                <div className="restaurant-content">
                    <div className="description">
                        <h2>About</h2>
                        <p>{restaurant.description}</p>
                    </div>

                    <div className="features">
                        <h2>Features</h2>
                        <ul>
                            {restaurant.features.map((feature, index) => (
                                <li key={index}>
                                    <i className="fas fa-check"></i>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="menu">
                        <h2>Popular Dishes</h2>
                        <ul>
                            {restaurant.menu.map((item, index) => (
                                <li key={index}>
                                    <span className="dish-name">{item.name}</span>
                                    <span className="dish-price">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p><i className="fas fa-clock"></i> {restaurant.openingHours}</p>
                        <p><i className="fas fa-phone"></i> {restaurant.contact}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RestaurantDetails; 