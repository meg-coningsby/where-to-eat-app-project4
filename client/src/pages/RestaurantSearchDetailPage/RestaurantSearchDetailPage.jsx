import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';
import Modal from '../../components/Modal/Modal';
import * as listsAPI from '../../utilities/lists-api'; // Import the lists API functions

export default function RestaurantSearchDetailPage() {
    const apiKey = import.meta.env.VITE_apikey;
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);

    const fetchUserLists = async () => {
        try {
            const fetchedLists = await listsAPI.fetchLists();
            setUserLists(fetchedLists);
        } catch (error) {
            console.error('Error fetching user lists:', error);
        }
    };

    useEffect(() => {
        fetchRestaurantDetails(id);
        fetchUserLists(); // Fetch user's lists when the component mounts
    }, [id]);

    const fetchRestaurantDetails = async (placeId) => {
        try {
            const response = await axios.get(`/api/restaurants/${placeId}`);
            setRestaurantDetails(response.data);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <RestaurantDetail restaurant={restaurantDetails} />
            <div>
                <button onClick={openModal}>Add to List</button>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <p>Select the list you want to add this restaurant to:</p>
                    <select>
                        {userLists.map((list) => (
                            <option key={list._id} value={list._id}>
                                {list.name}
                            </option>
                        ))}
                    </select>
                    {/* Other modal content */}
                </Modal>
            </div>
        </div>
    );
}
