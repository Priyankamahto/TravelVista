export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Destination {
    id: string;
    name: string;
    location: string;
    type: string;
    coordinates: Coordinates;
    images: string[];
    rating: string;
    price: number;
    activities: string[];
    description: string;
}

export interface User {
    username: string;
    email: string;
}

export interface UploadedImage {
    url: string;
    uploadedBy: string;
    timestamp: number;
} 