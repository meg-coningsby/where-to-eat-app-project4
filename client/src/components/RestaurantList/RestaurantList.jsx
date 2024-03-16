import { Link } from 'react-router-dom';

export default function RestaurantList({ restaurants }) {
    return (
        <>
            <h3>Results:</h3>
            {restaurants.map((restaurant) => (
                <div key={restaurant.place_id}>
                    {/* Render link to RestaurantDetailPage with restaurant ID */}
                    <Link to={`/restaurants/${restaurant.place_id}`}>
                        {restaurant.name}
                    </Link>
                    {restaurant.rating}
                </div>
            ))}
        </>
    );
}
