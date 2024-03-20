import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';
import Modal from '../../components/Modal/Modal';

import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';

export default function RestaurantSearchDetailPage({ user }) {
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');

    useEffect(() => {
        fetchRestaurantDetails(id);
        if (user) {
            fetchUserLists();
        }
        return () => setSelectedList('');
    }, [id, user]);

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
        <Container maxWidth='md'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'>
                <RestaurantDetail restaurant={restaurantDetails} />
                <Box mt={2}>
                    {user && (
                        <Button variant='contained' onClick={openModal}>
                            Add to List
                        </Button>
                    )}
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <>
                            <Typography variant='body1'>
                                Select the list you want to add this restaurant
                                to:
                            </Typography>
                            <Select
                                value={selectedList}
                                onChange={(e) =>
                                    setSelectedList(e.target.value)
                                }
                                sx={{ minWidth: 200, mt: 1, mr: 1 }}>
                                <MenuItem value='' disabled>
                                    Select a list
                                </MenuItem>
                                {userLists.map((list) => (
                                    <MenuItem key={list._id} value={list._id}>
                                        {list.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant='contained'
                                onClick={addToUserList}
                                sx={{ mt: 1 }}>
                                Add to List
                            </Button>
                        </>
                    </Modal>
                </Box>
            </Box>
        </Container>
    );
}
