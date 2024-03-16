import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';
import * as visitedAPI from '../../utilities/visited-api';
import Modal from '../../components/Modal/Modal';

export default function ListShowPage({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRestaurantId, setCurrentRestaurantId] = useState('');
    const [visitDetails, setVisitDetails] = useState({
        visitDate: '',
        comments: '',
    });

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

    const handleMarkAsVisited = (restaurantId) => {
        setIsModalOpen(true);
        setCurrentRestaurantId(restaurantId);
    };

    const handleSubmitVisited = async () => {
        try {
            // Ensure comments field is set to an empty string if it's undefined or null
            const commentsValue = visitDetails.comments || '';

            await visitedAPI.addRestaurantToVisited({
                restaurantId: currentRestaurantId,
                visitDate: visitDetails.visitDate,
                comments: commentsValue, // Pass the comments value explicitly
                userId: user.sub,
            });
            setIsModalOpen(false);
            setVisitDetails({ visitDate: '', comments: '' });
            setCurrentRestaurantId('');
            // Optionally refresh the list or specific data here
        } catch (error) {
            console.error('Error marking restaurant as visited', error);
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
                                        <button
                                            onClick={() =>
                                                handleRemoveRestaurant(
                                                    restaurant._id
                                                )
                                            }>
                                            Remove
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleMarkAsVisited(
                                                    restaurant._id
                                                )
                                            }>
                                            Add a Visit
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
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Mark as Visited</h2>
                <label>Visit Date:</label>
                <input
                    type='date'
                    value={visitDetails.visitDate}
                    onChange={(e) =>
                        setVisitDetails({
                            ...visitDetails,
                            visitDate: e.target.value,
                        })
                    }
                />
                <label>Comments:</label>
                <textarea
                    value={visitDetails.comments}
                    onChange={(e) =>
                        setVisitDetails({
                            ...visitDetails,
                            comments: e.target.value,
                        })
                    }></textarea>
                <button onClick={handleSubmitVisited}>Add Visit</button>
            </Modal>
        </>
    );
}
