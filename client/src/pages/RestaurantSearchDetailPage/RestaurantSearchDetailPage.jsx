import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';
import Modal from '../../components/Modal/Modal';

import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';

export default function RestaurantSearchDetailPage() {
    const apiKey = import.meta.env.VITE_apikey;
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');

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
        fetchUserLists();
    }, [id]);

    const fetchRestaurantDetails = async (placeId) => {
        try {
            const response = await axios.get(`/api/restaurants/${placeId}`);
            setRestaurantDetails(response.data);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    };

    const addToUserList = async () => {
        try {
            if (selectedList && id) {
                await restaurantsAPI.addRestaurantToList(selectedList, id);
                closeModal();
            } else {
                console.error('Selected list or restaurant ID is empty');
            }
        } catch (error) {
            console.error('Error adding restaurant to list:', error);
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
                    <>
                        <p>
                            Select the list you want to add this restaurant to:
                        </p>
                        <select
                            onChange={(e) => setSelectedList(e.target.value)}>
                            {userLists.map((list) => (
                                <option key={list._id} value={list._id}>
                                    {list.name}
                                </option>
                            ))}
                        </select>
                        <button onClick={addToUserList}>Add to List</button>
                    </>
                </Modal>
            </div>
        </div>
    );
}
