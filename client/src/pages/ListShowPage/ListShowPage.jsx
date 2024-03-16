import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';

export default function ListShowPage({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState(null);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const listData = await listsAPI.fetchList(id);
                setList(listData);
            } catch (error) {
                console.error('Error fetching list details: ', error);
            }
        };
        fetchList();
    }, [id]);

    const handleDelete = async () => {
        try {
            await listsAPI.deleteList(id);
            navigate('/lists');
        } catch (error) {
            console.error('Error deleting list', error);
        }
    };

    const handleRemoveRestaurant = async (restaurantId) => {
        try {
            await restaurantsAPI.deleteRestaurantFromList(id, restaurantId);
            const updatedList = await listsAPI.fetchList(id);
            setList(updatedList);
        } catch (error) {
            console.error('Error removing restaurant from list', error);
        }
    };

    const handleToggleVisited = async (restaurantId, visited) => {
        try {
            // Toggle the visited state of the restaurant
            await restaurantsAPI.toggleVisited(restaurantId, visited);
            // Fetch the updated list after toggling
            const updatedList = await listsAPI.fetchList(id);
            setList(updatedList);
        } catch (error) {
            console.error('Error toggling visited status', error);
        }
    };

    return (
        <>
            {list ? (
                <div>
                    <h1>{list.name}</h1>
                    <p>Public: {list.public ? 'Yes' : 'No'}</p>
                    {/* Display list of restaurants */}
                    {list.restaurants && list.restaurants.length > 0 ? (
                        <div>
                            <h2>Restaurants:</h2>
                            <ul>
                                {list.restaurants.map((restaurant, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/restaurants/${restaurant.googlePlaceId}`}>
                                            {restaurant.name}
                                        </Link>
                                        - {restaurant.address}
                                        <span>
                                            -{' '}
                                            {restaurant.visited
                                                ? 'Visited'
                                                : 'Not Visited'}
                                        </span>
                                        <button
                                            onClick={() =>
                                                handleToggleVisited(
                                                    restaurant._id,
                                                    restaurant.visited
                                                )
                                            }>
                                            {restaurant.visited
                                                ? 'Mark as Not Visited'
                                                : 'Mark as Visited'}
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleRemoveRestaurant(
                                                    restaurant._id
                                                )
                                            }>
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No restaurants in this list.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <Link to={`/lists/${id}/edit`}>
                <button>Edit List Details</button>
            </Link>
            <button onClick={handleDelete}>Delete List</button>
        </>
    );
}
