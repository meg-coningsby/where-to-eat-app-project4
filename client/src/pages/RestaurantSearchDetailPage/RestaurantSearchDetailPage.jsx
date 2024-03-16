import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';
import Modal from '../../components/Modal/Modal';

import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';

export default function RestaurantSearchDetailPage() {
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');

    useEffect(() => {
        fetchRestaurantDetails(id);
        fetchUserLists();
        return () => setSelectedList('');
    }, [id]);

    const fetchUserLists = async () => {
        try {
            const fetchedLists = await listsAPI.fetchLists();
            setUserLists(fetchedLists);
        } catch (error) {
            console.error('Error fetching user lists:', error);
        }
    };

    const fetchRestaurantDetails = async (placeId) => {
        try {
            const response = await axios.get(`/api/restaurants/${placeId}`);
            setRestaurantDetails(response.data);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
        }
    };

    const addToUserList = async () => {
        if (!selectedList || !restaurantDetails) {
            console.error(
                'Selected list, restaurant ID, or restaurant details are empty'
            );
            return;
        }
        try {
            const { name, formatted_address: address } = restaurantDetails;
            await restaurantsAPI.addRestaurantToList(
                selectedList,
                id,
                name,
                address
            );
            closeModal();
            setSelectedList('');
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
                            value={selectedList}
                            onChange={(e) => setSelectedList(e.target.value)}>
                            <option value='' disabled>
                                Select a list
                            </option>{' '}
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
