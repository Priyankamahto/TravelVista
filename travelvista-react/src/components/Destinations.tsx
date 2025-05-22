import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/Destinations.css';
import { Destination, User } from '../types/Destination';

const ITEMS_PER_PAGE = 9;
const STORAGE_KEY = "wondervista_uploaded_images";
const USER_STORAGE_KEY = "wondervista_current_user";

const destinations = [
    {
        id: 'd1',
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        type: 'historical',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        images: [
            'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000',
            'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000',
            'https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000'
        ],
        rating: '4.8',
        price: 1200,
        activities: ['Sunrise Viewing', 'Guided Tour', 'Photography', 'Garden Walk', 'Museum Visit'],
        description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal.'
    },
    {
        id: 'd2',
        name: 'Beaches of Goa',
        location: 'Goa',
        type: 'beaches',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        images: [
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000',
            'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1000',
            'https://images.unsplash.com/photo-1451440063999-77a8b2960d2b?q=80&w=1000'
        ],
        rating: '4.6',
        price: 1500,
        activities: ['Beach Hopping', 'Water Sports', 'Sunset Cruise', 'Seafood Dining', 'Nightlife'],
        description: 'Goa is famous for its pristine beaches, vibrant nightlife, Portuguese architecture, and delicious seafood. The state offers a perfect blend of Indian and Portuguese cultures.'
    },
    {
        id: 'd3',
        name: 'Mystical Ladakh',
        location: 'Ladakh',
        type: 'mountains',
        coordinates: { lat: 34.1526, lng: 77.5771 },
        images: [
            'https://travelontips.co.in/wp-content/uploads/2022/05/tour-d-1-3.jpg',
            'https://touravelholidays.com/wp-content/uploads/2023/08/leh-ladakhf-1.jpg',
            'https://lifeontheplanetladakh.com/wp-content/uploads/2024/11/IMG_7246-1140x600.jpeg'
        ],
        rating: '4.9',
        price: 1800,
        activities: ['Monastery Visits', 'Trekking', 'Mountain Biking', 'River Rafting', 'Stargazing'],
        description: 'Ladakh, often called "Little Tibet," is known for its remote mountain beauty and Buddhist culture. The region offers stunning landscapes, ancient monasteries, and unique cultural experiences.'
    },
    {
        id: 'd4',
        name: 'Kerala Backwaters',
        location: 'Kerala',
        type: 'nature',
        coordinates: { lat: 9.4981, lng: 76.3388 },
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/2/27/Houseboats_at_Kerala_Backwaters.jpg',
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000',
            'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1000'
        ],
        rating: '4.7',
        price: 1600,
        activities: ['Houseboat Cruise', 'Village Tour', 'Ayurvedic Spa', 'Bird Watching', 'Fishing'],
        description: 'The Kerala backwaters are a network of brackish lagoons and lakes lying parallel to the Arabian Sea coast. A houseboat cruise through these serene waters offers a unique experience of Kerala\'s rural life.'
    },
    {
        id: 'd5',
        name: 'Jaipur Heritage',
        location: 'Jaipur, Rajasthan',
        type: 'historical',
        coordinates: { lat: 26.9124, lng: 75.7873 },
        images: [
            'https://cf.bstatic.com/xdata/images/hotel/max1024x768/34741215.jpg?k=df4720a6ae3ba4506b46f27e59968f98e2ccf114612351bfcaf56caed7029d2b&o=&hp=1',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000',
            'https://images.unsplash.com/photo-1624456735729-03594a40c5fb?q=80&w=1000'
        ],
        rating: '4.6',
        price: 1300,
        activities: ['Palace Tour', 'Shopping', 'Elephant Ride', 'Cultural Show', 'Food Tour'],
        description: 'Jaipur, the Pink City, is known for its magnificent palaces, forts, and temples. The city\'s rich history and vibrant culture make it a must-visit destination in Rajasthan.'
    },
    {
        id: 'd6',
        name: 'Darjeeling Tea Gardens',
        location: 'West Bengal',
        type: 'nature',
        coordinates: { lat: 27.0360, lng: 88.2627 },
        images: [
            'https://bsmedia.business-standard.com/_media/bs/img/article/2024-01/04/full/1704387263-1571.jpg?im=FeatureCrop,size=(826,465)',
            'https://images.unsplash.com/photo-1598322974025-2f0da0b4b8c1?q=80&w=1000',
            'https://images.unsplash.com/photo-1576506542790-51244b486a6b?q=80&w=1000'
        ],
        rating: '4.5',
        price: 1400,
        activities: ['Tea Tasting', 'Garden Tour', 'Toy Train Ride', 'Sunrise Viewing', 'Trekking'],
        description: 'Darjeeling is famous for its tea gardens and the Darjeeling Himalayan Railway, a UNESCO World Heritage Site. The region offers stunning views of the Himalayas and a unique tea culture.'
    },
    {
        id: 'd7',
        name: 'Varanasi Ghats',
        location: 'Uttar Pradesh',
        type: 'spiritual',
        coordinates: { lat: 25.3176, lng: 82.9739 },
        images: [
            'https://images.unsplash.com/photo-1561359313-0639aad49ca6?q=80&w=1000',
            'https://images.unsplash.com/photo-1567516328339-3cebf1ac6dc3?q=80&w=1000',
            'https://images.unsplash.com/photo-1627301517152-11505d049286?q=80&w=1000'
        ],
        rating: '4.7',
        price: 1100,
        activities: ['Ganga Aarti', 'Boat Ride', 'Temple Visit', 'Meditation', 'Street Food'],
        description: 'Varanasi, one of the world\'s oldest living cities, is a major spiritual hub in India. The ghats along the Ganges River are the center of religious activities and cultural experiences.'
    },
    {
        id: 'd8',
        name: 'Andaman Islands',
        location: 'Andaman and Nicobar',
        type: 'beaches',
        coordinates: { lat: 11.7401, lng: 92.6586 },
        images: [
            'https://www.bharatbooking.com/admin/webroot/img/uploads/blog/1581661527_639007-Andaman-Islands.jpg',
            'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1000/?Andaman',
            'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000'
        ],
        rating: '4.8',
        price: 2000,
        activities: ['Scuba Diving', 'Snorkeling', 'Island Hopping', 'Beach Camping', 'Water Sports'],
        description: 'The Andaman Islands are known for their pristine beaches, coral reefs, and rich marine life. The islands offer a perfect tropical getaway with various water activities and natural beauty.'
    },
    {
        id: 'd9',
        name: 'Mysuru Palace',
        location: 'Mysuru, Karnataka',
        type: 'historical',
        coordinates: { lat: 12.3052, lng: 76.6552 },
        images: [
            'https://karnatakatourism.org/wp-content/uploads/2020/06/Mysuru-Palace-banner-1920_1100.jpg',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000',
            'https://images.unsplash.com/photo-1624456735729-03594a40c5fb?q=80&w=1000'
        ],
        rating: '4.7',
        price: 1400,
        activities: ['Palace Tour', 'Chamundi Hills Visit', 'Zoo Visit', 'Shopping', 'Cultural Shows'],
        description: 'Mysuru Palace, also known as the Amba Vilas Palace, is a historical palace and a royal residence. The palace is known for its Indo-Saracenic architecture and is illuminated with nearly 100,000 lights during the Dasara festival.'
    },
    {
        id: 'd10',
        name: 'Rann of Kutch',
        location: 'Gujarat',
        type: 'nature',
        coordinates: { lat: 23.7334, lng: 69.8597 },
        images: [
            'https://m.media-amazon.com/images/S/pv-target-images/54db22ae37635a39268314aa0c33c5c41c9c584626f7abea86a531e0344b1f42._SX1080_FMjpg_.jpg',
            'https://static.toiimg.com/photo/msid-107404336,width-96,height-65.cms',
            'https://www.rannutsav.net/wp-content/uploads/2022/08/rann-allabout.jpg'
        ],
        rating: '4.8',
        price: 1900,
        activities: ['White Desert Safari', 'Cultural Festival', 'Craft Village Tour', 'Stargazing', 'Camel Ride'],
        description: 'The Rann of Kutch is the largest salt desert in the world, offering a surreal landscape that turns into a white wonder during the full moon. The region is also known for its vibrant handicrafts, traditional music, and the famous Rann Utsav festival.'
    },
    {
        id: 'd11',
        name: 'Hampi Ruins',
        location: 'Karnataka',
        type: 'historical',
        coordinates: { lat: 15.3350, lng: 76.4600 },
        images: [
            'https://www.indoasia-hotels.com/assets/img/blog/02.jpg',
            'https://th-i.thgim.com/public/incoming/76j7xg/article68484140.ece/alternates/FREE_1200/Hampi_03.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdhgYeHkFf_akjYWCBmC9-9ii5FoL-l-oxZQ&s'
        ],
        rating: '4.7',
        price: 1500,
        activities: ['Temple Exploration', 'Boulder Climbing', 'Sunset Viewing', 'Bicycle Tour', 'Heritage Walk'],
        description: 'Hampi, a UNESCO World Heritage Site, is an ancient city with magnificent ruins of the Vijayanagara Empire. The landscape of giant boulders, ancient temples, and royal structures makes it a unique historical destination.'
    },
    {
        id: 'd12',
        name: 'Kaziranga National Park',
        location: 'Assam',
        type: 'wildlife',
        coordinates: { lat: 26.5735, lng: 93.1715 },
        images: [
            'https://etimg.etb2bimg.com/photo/103913259.cms',
            'https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2022/06/kaziranga-safari-zones.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQniKwa7i9KA6s7VnG7pLQmmEQWoKyzvZv4Bw&s',
            'https://www.kaziranga-national-park.com/blog/wp-content/uploads/2016/08/kaziranga-1s.jpg',
            'https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2023/04/kaziranga-birds.jpg'
        ],
        rating: '4.9',
        price: 2100,
        activities: ['Elephant Safari', 'Jeep Safari', 'Bird Watching', 'Nature Walks', 'Rhino Spotting'],
        description: 'Kaziranga National Park is a UNESCO World Heritage Site and home to the world\'s largest population of one-horned rhinoceroses. The park also hosts tigers, elephants, and numerous bird species in its diverse ecosystem.'
    },
    {
        id: 'd13',
        name: 'Golden Temple',
        location: 'Amritsar, Punjab',
        type: 'spiritual',
        coordinates: { lat: 31.6200, lng: 74.8765 },
        images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/1200px-The_Golden_Temple_of_Amrithsar_7.jpg',
            'https://i0.wp.com/thecareyadventures.com/blog/wp-content/uploads/2015/01/IMG_0406.jpg?ssl=1',
            ''
        ],
        rating: '4.8',
        price: 0, // Free entry
        activities: ['Prayer Service', 'Langar Experience', 'Night Illumination', 'Museum Visit', 'Community Kitchen Tour'],
        description: 'The Golden Temple is the holiest Gurdwara and spiritual center of Sikhism, known for its stunning golden architecture and the sacred Amrit Sarovar surrounding it.'
    },
     {
        id: 'd14',
        name: 'Hawa Mahal',
        location: 'Jaipur, Rajasthan',
        type: 'historical',
        coordinates: { lat: 26.9239, lng: 75.8267 },
        images: [
            'https://images.unsplash.com/photo-1477587458883-47145ed94245',
            'https://images.unsplash.com/photo-1524498250077-97d8043c5f3f',
            'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7'
        ],
        rating: '4.5',
        price: 200,
        activities: ['Architecture Tour', 'Photography', 'Sound & Light Show', 'Rooftop Views', 'Old City Walk'],
        description: 'The iconic "Palace of Winds" with its 953 windows was built to allow royal ladies to observe street festivals while remaining unseen.'
    },
    {
        id: 'd15',
        name: 'Munnar Tea Gardens',
        location: 'Kerala',
        type: 'nature',
        coordinates: { lat: 10.0889, lng: 77.0595 },
        images: [
            'https://images.unsplash.com/photo-1599315120242-73636a5d399f',
            'https://images.unsplash.com/photo-1599391409946-56e8e1a1e0b1',
            'https://images.unsplash.com/photo-1599391409946-56e8e1a1e0b1'
        ],
        rating: '4.7',
        price: 800,
        activities: ['Tea Tasting', 'Plantation Walk', 'Tea Museum', 'Kolukkumalai Sunrise', 'Spice Garden Visit'],
        description: 'Rolling hills covered with endless tea plantations, cool climate, and misty valleys make Munnar one of India\'s most beautiful hill stations.'
    },
     {
        id: 'd16',
        name: 'Ajanta & Ellora Caves',
        location: 'Aurangabad, Maharashtra',
        type: 'historical',
        coordinates: { lat: 20.5525, lng: 75.7004 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.9',
        price: 600,
        activities: ['Cave Exploration', 'Guided Tours', 'Photography', 'Architecture Study', 'Buddhist Art Appreciation'],
        description: 'These UNESCO World Heritage Sites feature stunning rock-cut cave monuments dating back to 2nd century BCE, showcasing ancient Indian art and architecture.'
    },
    {
        id: 'd17',
        name: 'Palolem Beach',
        location: 'Goa',
        type: 'beach',
        coordinates: { lat: 15.0101, lng: 74.0235 },
        images: [
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
            'https://images.unsplash.com/photo-1587922546307-776227941871',
            'https://images.unsplash.com/photo-1451440063999-77a8b2960d2b'
        ],
        rating: '4.6',
        price: 1200,
        activities: ['Dolphin Spotting', 'Kayaking', 'Beach Shacks', 'Full Moon Parties', 'Yoga Classes'],
        description: 'Goa\'s most beautiful crescent-shaped beach with soft white sand, calm waters, and scenic coconut palm lining.'
    },
    {
        id: 'd18',
        name: 'Meenakshi Temple',
        location: 'Madurai, Tamil Nadu',
        type: 'spiritual',
        coordinates: { lat: 9.9196, lng: 78.1193 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.7',
        price: 0,
        activities: ['Temple Rituals', 'Architecture Tour', 'Evening Ceremony', 'Photography', 'Market Shopping'],
        description: 'An ancient temple complex famous for its 14 colorful gopurams (gateway towers) covered with thousands of stone sculptures.'
    },
    {
        id: 'd19',
        name: 'Valley of Flowers',
        location: 'Uttarakhand',
        type: 'nature',
        coordinates: { lat: 30.7333, lng: 79.6333 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.8',
        price: 1500,
        activities: ['Trekking', 'Flower Photography', 'Bird Watching', 'Nature Walks', 'Camping'],
        description: 'UNESCO World Heritage Site known for its meadows of endemic alpine flowers and outstanding natural beauty.'
    },
    {
        id: 'd20',
        name: 'Charminar',
        location: 'Hyderabad, Telangana',
        type: 'historical',
        coordinates: { lat: 17.3616, lng: 78.4747 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.4',
        price: 100,
        activities: ['Monument Visit', 'Bazaar Shopping', 'Hyderabadi Cuisine', 'Photography', 'Night Views'],
        description: 'Iconic 16th-century mosque with 4 grand arches, offering panoramic views of Hyderabad from its upper floors.'
    },
    {
        id: 'd21',
        name: 'Dudhsagar Falls',
        location: 'Goa-Karnataka border',
        type: 'nature',
        coordinates: { lat: 15.3143, lng: 74.3143 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.7',
        price: 900,
        activities: ['Trekking', 'Swimming', 'Jeep Safari', 'Monsoon Visits', 'Photography'],
        description: 'Majestic four-tiered waterfall resembling a "sea of milk" during monsoon, surrounded by lush greenery.'
    },
    {
        id: 'd22',
        name: 'Konark Sun Temple',
        location: 'Odisha',
        type: 'historical',
        coordinates: { lat: 19.8876, lng: 86.0946 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.6',
        price: 500,
        activities: ['Architecture Tour', 'Light & Sound Show', 'Chariot Wheel Study', 'Beach Visit', 'Museum'],
        description: '13th-century temple shaped like a giant chariot with intricately carved stone wheels, pillars and walls.'
    },
     {
        id: 'd23',
        name: 'Khajuraho Temples',
        location: 'Madhya Pradesh',
        type: 'historical',
        coordinates: { lat: 24.8510, lng: 79.9335 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.7',
        price: 600,
        activities: ['Temple Tour', 'Sculpture Study', 'Dance Festival', 'Light Show', 'Photography'],
        description: 'UNESCO-listed group of Hindu and Jain temples famous for their erotic sculptures and Nagara-style architecture.'
    },
    {
        id: 'd24',
        name: 'Nubra Valley',
        location: 'Ladakh',
        type: 'adventure',
        coordinates: { lat: 34.6216, lng: 77.5539 },
        images: [
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b',
            'https://images.unsplash.com/photo-1580651213191-4c24d9ac4a0b'
        ],
        rating: '4.8',
        price: 2500,
        activities: ['Bactrian Camel Ride', 'Diskit Monastery', 'Sand Dunes', 'Panamik Hot Springs', 'Photography'],
        description: 'High-altitude cold desert with stunning landscapes, double-humped camels, and Buddhist monasteries.'
    }
];

const Destinations: React.FC = () => {
    const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentFilter, setCurrentFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState<Destination[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showDestinationModal, setShowDestinationModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Initialize destinations
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            setIsLoggedIn(true);
            setCurrentUser(JSON.parse(storedUser));
        }

        const uploadedImages = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const destinationsWithUploads = destinations.map(dest => {
            if (uploadedImages[dest.id]) {
                return {
                    ...dest,
                    images: [...dest.images, ...uploadedImages[dest.id].map((img: any) => img.url)]
                };
            }
            return dest;
        });

        setAllDestinations(destinationsWithUploads);
        setFilteredDestinations(destinationsWithUploads);
    }, []);

    const handleFilter = (filter: string) => {
        setCurrentFilter(filter);
        setCurrentPage(1);
        if (filter === 'all') {
            setFilteredDestinations(allDestinations);
        } else {
            setFilteredDestinations(allDestinations.filter(dest => dest.type === filter));
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (term.length > 0) {
            const suggestions = allDestinations.filter(dest =>
                dest.name.toLowerCase().includes(term.toLowerCase()) ||
                dest.location.toLowerCase().includes(term.toLowerCase())
            );
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    };

    const handleSearchSelect = (destination: Destination) => {
        setSearchTerm('');
        setSearchSuggestions([]);
        setSelectedDestination(destination);
        setShowDestinationModal(true);
    };

    const handleNearMe = () => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Calculate distances and sort destinations
                    const destinationsWithDistance = allDestinations.map(dest => ({
                        ...dest,
                        distance: calculateDistance(latitude, longitude, dest.coordinates.lat, dest.coordinates.lng)
                    }));
                    
                    const sorted = [...destinationsWithDistance].sort((a, b) => a.distance - b.distance);
                    setFilteredDestinations(sorted);
                    setIsLoading(false);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setIsLoading(false);
                    alert('Unable to access your location. Please check your browser settings.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                 Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const handlePageChange = (direction: 'prev' | 'next') => {
        const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE);
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getCurrentPageDestinations = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredDestinations.slice(startIndex, endIndex);
    };

    const handleImageUpload = () => {
        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }
        // TODO: Implement image upload functionality
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
        const div = e.target as HTMLDivElement;
        div.style.backgroundImage = 'url("https://via.placeholder.com/400x300?text=Image+Not+Available")';
    };

    const handleNextImage = () => {
        if (selectedDestination) {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex + 1) % selectedDestination.images.length
            );
        }
    };

    const handlePrevImage = () => {
        if (selectedDestination) {
            setCurrentImageIndex((prevIndex) => 
                (prevIndex - 1 + selectedDestination.images.length) % selectedDestination.images.length
            );
        }
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="destinations-container">
            <Navigation />
            <div className="destination-header">
                <div className="search-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <button><i className="fas fa-search"></i></button>
                        {searchSuggestions.length > 0 && (
                            <div className="search-suggestions">
                                {searchSuggestions.map(dest => (
                                    <div
                                        key={dest.id}
                                        className="suggestion-item"
                                        onClick={() => handleSearchSelect(dest)}
                                    >
                                        {dest.name} - {dest.location}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <button className="btn geo-btn" onClick={handleNearMe}>
                        <i className="fas fa-map-marker-alt"></i> Near Me
                    </button>
                </div>
            </div>

            <div className="filters">
                <button 
                    className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => handleFilter('all')}
                    style={{ color: '#000000' }}
                >
                    All
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'historical' ? 'active' : ''}`}
                    onClick={() => handleFilter('historical')}
                    style={{ color: '#000000' }}
                >
                    Historical
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'beach' ? 'active' : ''}`}
                    onClick={() => handleFilter('beach')}
                    style={{ color: '#000000' }}
                >
                    Beaches
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'mountain' ? 'active' : ''}`}
                    onClick={() => handleFilter('mountain')}
                    style={{ color: '#000000' }}
                >
                    Mountains
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'nature' ? 'active' : ''}`}
                    onClick={() => handleFilter('nature')}
                    style={{ color: '#000000' }}
                >
                    Nature
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'spiritual' ? 'active' : ''}`}
                    onClick={() => handleFilter('spiritual')}
                    style={{ color: '#000000' }}
                >
                    Spiritual
                </button>
                <button 
                    className={`filter-btn ${currentFilter === 'wildlife' ? 'active' : ''}`}
                    onClick={() => handleFilter('wildlife')}
                    style={{ color: '#000000' }}
                >
                    Wildlife
                </button>
            </div>

            {isLoading && (
                <div className="loading-spinner">
                    <i className="fas fa-compass"></i>
                </div>
            )}

            <main className="destination-grid">
                {getCurrentPageDestinations().map(dest => (
                    <article 
                        key={dest.id} 
                        className="destination-card"
                        onClick={() => {
                            setSelectedDestination(dest);
                            setShowDestinationModal(true);
                        }}
                    >
                        <div 
                            className="card-image" 
                            style={{ backgroundImage: `url('${dest.images[0]}')` }}
                            onError={handleImageError}
                            role="img"
                            aria-label={dest.name}
                        >
                            <span className="card-badge">{dest.type}</span>
                            <div className="image-count-badge">
                                <i className="fas fa-images"></i> {dest.images.length}
                            </div>
                        </div>
                        <div className="card-content">
                            <h3>{dest.name}</h3>
                            <div className="card-location">
                                <i className="fas fa-map-marker-alt"></i> {dest.location}
                            </div>
                            <div className="card-stats">
                                <span><i className="fas fa-star"></i> {dest.rating}</span>
                                <span>₹{dest.price}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </main>

            <div className="pagination">
                <button 
                    className="page-btn" 
                    onClick={() => handlePageChange('prev')}
                    disabled={currentPage === 1}
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <span className="page-indicator">{currentPage}</span>
                <button 
                    className="page-btn" 
                    onClick={() => handlePageChange('next')}
                    disabled={currentPage === Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)}
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            {showDestinationModal && selectedDestination && (
                <div className="destination-modal">
                    <div className="modal-content">
                        <span 
                            className="close-btn" 
                            onClick={() => {
                                setShowDestinationModal(false);
                                setCurrentImageIndex(0);
                            }}
                        >
                            &times;
                        </span>
                        <div className="modal-body">
                            <div className="image-gallery">
                                <div className="gallery-main">
                                <img 
                                        src={selectedDestination.images[currentImageIndex]} 
                                    alt={selectedDestination.name}
                                    className="gallery-main-image"
                                />
                                    <button 
                                        className="nav-btn prev-btn"
                                        onClick={handlePrevImage}
                                    >
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <button 
                                        className="nav-btn next-btn"
                                        onClick={handleNextImage}
                                    >
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div className="gallery-thumbnails">
                                    {selectedDestination.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`${selectedDestination.name} ${index + 1}`}
                                            className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => handleThumbnailClick(index)}
                                        />
                                    ))}
                                </div>
                                <button 
                                    className="upload-btn"
                                    onClick={handleImageUpload}
                                >
                                    <i className="fas fa-upload"></i> Add Photos
                                </button>
                            </div>
                            <div className="modal-details">
                                <h2>{selectedDestination.name}</h2>
                                <div className="location-rating">
                                    <span>
                                        <i className="fas fa-map-marker-alt"></i> {selectedDestination.location}
                                    </span>
                                    <span>
                                        <i className="fas fa-star"></i> {selectedDestination.rating}
                                    </span>
                                </div>
                                <p className="description">{selectedDestination.description}</p>
                                <div className="activities">
                                    <h4>Activities</h4>
                                    <ul>
                                        {selectedDestination.activities.map((activity, index) => (
                                            <li key={index}>{activity}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="price-section">
                                    <span>Starting from</span>
                                    <strong>₹{selectedDestination.price}</strong>
                                </div>
                                <button className="book-now-btn">
                                    Book Now <i className="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showLoginModal && (
                <div className="login-modal">
                    <div className="modal-content">
                        <span 
                            className="close-btn"
                            onClick={() => setShowLoginModal(false)}
                        >
                            &times;
                        </span>
                        <div className="modal-body">
                            <h2>Login Required</h2>
                            <p>Please login to upload images</p>
                            <div className="auth-actions">
                                <Link to="/login" className="btn login-btn">Login</Link>
                                <Link to="/signup" className="btn signup-btn">Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Destinations; 