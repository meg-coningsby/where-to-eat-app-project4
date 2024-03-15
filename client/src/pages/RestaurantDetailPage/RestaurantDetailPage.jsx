import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RestaurantDetailPage() {
    const apiKey = import.meta.env.VITE_apikey;
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState('');

    const fetchRestaurantDetails = async (placeId) => {
        try {
            const response = await axios.get(`/api/restaurants/${placeId}`);
            setRestaurantDetails(response.data); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    };

    useEffect(() => {
        fetchRestaurantDetails(id); // Fetch restaurant details when component mounts
    }, [id]); // Fetch whenever the id changes

    const mapSrc = restaurantDetails?.geometry
        ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${restaurantDetails.geometry.location.lat},${restaurantDetails.geometry.location.lng}`
        : '';
    const googlePlaceLink = restaurantDetails?.place_id
        ? `https://www.google.com/maps/place/?q=place_id:${restaurantDetails.place_id}`
        : '';

    return (
        <div>
            {restaurantDetails ? (
                <>
                    <h2>Name: {restaurantDetails.name}</h2>
                    <p>Address: {restaurantDetails.formatted_address}</p>
                    {/* Link to Google Places information */}
                    {googlePlaceLink && (
                        <p>
                            <a
                                href={googlePlaceLink}
                                target='_blank'
                                rel='noopener noreferrer'>
                                View on Google Maps
                            </a>
                        </p>
                    )}
                    <iframe
                        width='600'
                        height='450'
                        style={{ border: 0 }}
                        loading='lazy'
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(
                            restaurantDetails.name +
                                ' ' +
                                restaurantDetails.formatted_address
                        )}`}></iframe>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
