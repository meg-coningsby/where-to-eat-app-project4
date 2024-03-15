import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';

export default function RestaurantSearchDetailPage() {
    const apiKey = import.meta.env.VITE_apikey;
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);

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
        console.log(restaurantDetails);
    }, [id]); // Fetch whenever the id changes

    return (
        <div>
            <RestaurantDetail restaurant={restaurantDetails} />
        </div>
    );
}
