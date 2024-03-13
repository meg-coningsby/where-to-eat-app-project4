import { useState } from 'react';

export default function RestaurantSearch() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRestaurants = async () => {
        setIsLoading(true);
        const res = await fetch();
    };

    return (
        <>
            <h1>What Do You Feel Like?</h1>
        </>
    );
}
