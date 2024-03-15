import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RestaurantDetailPage() {
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);

    return (
        <div>
            <h2>{restaurantDetails.name}</h2>
            <p>Address: {restaurantDetails.formatted_address}</p>
            <p>Rating: {restaurantDetails.rating}</p>
            {restaurantDetails.international_phone_number && (
                <p>Phone: {restaurantDetails.international_phone_number}</p>
            )}
            {restaurantDetails.website && (
                <a
                    href={restaurantDetails.website}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Visit Website
                </a>
            )}
        </div>
    );
}
