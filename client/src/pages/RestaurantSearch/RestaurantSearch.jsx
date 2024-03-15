import React, { useState } from 'react';

import RestaurantSearchForm from '../../components/RestaurantSearchForm/RestaurantSearchForm';
import RestaurantList from '../../components/RestaurantList/RestaurantList';

export default function RestaurantSearch() {
    const [restaurants, setRestaurants] = useState([]);
    return (
        <div>
            <h1>Restaurant Search</h1>
            <RestaurantSearchForm
                restaurants={restaurants}
                setRestaurants={setRestaurants}
            />
            <RestaurantList restaurants={restaurants} />
        </div>
    );
}
