import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as listsAPI from '../../utilities/lists-api';

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
                                        {/* Display restaurant name and other details as needed */}
                                        {restaurant.name} - {restaurant.address}
                                        {/* Add Link to restaurant details page if needed */}
                                        {/* <Link to={`/restaurants/${restaurant.id}`}>View Details</Link> */}
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
