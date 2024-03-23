import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Button,
    Container,
    MenuItem,
    Select,
    Typography,
    TextField,
    Rating,
    Alert,
} from '@mui/material';

import axios from 'axios';
import RestaurantDetail from '../../components/RestaurantDetails/RestaurantDetails';
import Modal from '../../components/Modal/Modal';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';
import * as visitedAPI from '../../utilities/visited-api';

export default function RestaurantSearchDetailPage({ user }) {
    usePageTitle(`Restaurant Details`);
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const [isListModalOpen, setIsListModalOpen] = useState(false);
    const [isVisitedModalOpen, setIsVisitedModalOpen] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [selectedList, setSelectedList] = useState('');
    const [visitDetails, setVisitDetails] = useState({
        visitDate: '',
        comments: '',
        rating: 0,
    });
    const [error, setError] = useState(null);
    const [listModalError, setListModalError] = useState(null);
    const [visitedModalError, setVisitedModalError] = useState(null);

    const clearListModalError = () => {
        setListModalError(null);
    };

    const clearVisitedModalError = () => {
        setVisitedModalError(null);
    };

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
            setListModalError('Error fetching user lists. Please try again.');
        }
    };

    const fetchRestaurantDetails = async (placeId) => {
        try {
            const response = await axios.get(`/api/restaurants/${placeId}`);
            setRestaurantDetails(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching restaurant details:', error);
            setError('Error fetching restaurant details. Please try again.');
        }
    };

    const addToUserList = async () => {
        if (!selectedList || !restaurantDetails) {
            console.error(
                'Selected list, restaurant ID, or restaurant details are empty'
            );
            return;
        }

        clearListModalError();

        try {
            const { name, formatted_address: address } = restaurantDetails;
            await restaurantsAPI.addRestaurantToList(
                selectedList,
                id,
                name,
                address
            );
            closeListModal();
            setSelectedList('');
        } catch (error) {
            console.error('Error adding restaurant to list:', error);
            setListModalError(
                'Error adding restaurant to list. Please try again.'
            );
        }
    };

    const handleSubmitVisited = async () => {
        clearVisitedModalError();

        try {
            const commentsValue = visitDetails.comments || '';

            if (!restaurantDetails) {
                console.error('Restaurant details are missing');
                return;
            }

            const { name, formatted_address: address } = restaurantDetails;

            await visitedAPI.addRestaurantFromSearchToVisited({
                googlePlaceId: id,
                name,
                address,
                visitDate: visitDetails.visitDate,
                comments: commentsValue,
                rating: visitDetails.rating,
            });
            closeVisitedModal();
            setVisitDetails({ visitDate: '', comments: '', rating: 0 });
        } catch (error) {
            console.error('Error adding restaurant visit', error);
            setVisitedModalError(
                'Error adding restaurant visit. Please try again.'
            );
        }
    };

    const openListModal = () => {
        setIsListModalOpen(true);
        clearListModalError();
    };

    const closeListModal = () => {
        setIsListModalOpen(false);
        clearListModalError();
    };

    const openVisitedModal = () => {
        setIsVisitedModalOpen(true);
        clearVisitedModalError();
    };

    const closeVisitedModal = () => {
        setIsVisitedModalOpen(false);
        clearVisitedModalError();
    };

    return (
        <Container maxWidth='md'>
            {error ? (
                <Box mb={2}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            ) : (
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='flex-start'>
                    <RestaurantDetail restaurant={restaurantDetails} />
                    <Box mt={2}>
                        {user && (
                            <>
                                <Button
                                    variant='contained'
                                    onClick={openListModal}
                                    sx={{ mr: 2 }}>
                                    Add to List
                                </Button>
                                <Button
                                    variant='contained'
                                    onClick={openVisitedModal}>
                                    Add a Visit
                                </Button>
                            </>
                        )}
                        <Modal
                            isOpen={isListModalOpen}
                            onClose={closeListModal}>
                            <>
                                <Typography variant='body1'>
                                    Select the list you want to add this
                                    restaurant to:
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
                                        <MenuItem
                                            key={list._id}
                                            value={list._id}>
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
                                {listModalError && (
                                    <Alert
                                        severity='error'
                                        onClose={clearListModalError}>
                                        {listModalError}
                                    </Alert>
                                )}
                            </>
                        </Modal>
                        <Modal
                            isOpen={isVisitedModalOpen}
                            onClose={closeVisitedModal}>
                            <>
                                <Typography variant='h6' sx={{ mb: 2 }}>
                                    Mark as Visited
                                </Typography>
                                <TextField
                                    id='visit-date'
                                    label='Visit Date'
                                    type='date'
                                    value={visitDetails.visitDate}
                                    onChange={(e) =>
                                        setVisitDetails({
                                            ...visitDetails,
                                            visitDate: e.target.value,
                                        })
                                    }
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ mb: 2 }}
                                />
                                <TextField
                                    id='comments'
                                    label='Comments'
                                    multiline
                                    rows={4}
                                    value={visitDetails.comments}
                                    onChange={(e) =>
                                        setVisitDetails({
                                            ...visitDetails,
                                            comments: e.target.value,
                                        })
                                    }
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />
                                <Box sx={{ mb: 2 }}>
                                    <Typography component='legend'>
                                        Rating
                                    </Typography>
                                    <Rating
                                        name='rating'
                                        value={visitDetails.rating}
                                        onChange={(event, newValue) => {
                                            setVisitDetails({
                                                ...visitDetails,
                                                rating: newValue,
                                            });
                                        }}
                                    />
                                </Box>
                                <Box textAlign='center'>
                                    <Button
                                        variant='contained'
                                        onClick={handleSubmitVisited}
                                        fullWidth
                                        sx={{ mt: 1 }}>
                                        Add Visit
                                    </Button>
                                </Box>
                                {visitedModalError && (
                                    <Alert
                                        severity='error'
                                        onClose={clearVisitedModalError}>
                                        {visitedModalError}
                                    </Alert>
                                )}
                            </>
                        </Modal>
                    </Box>
                </Box>
            )}
        </Container>
    );
}
