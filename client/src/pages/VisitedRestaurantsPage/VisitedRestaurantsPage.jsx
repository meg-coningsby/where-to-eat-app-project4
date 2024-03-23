import { useState, useEffect } from 'react';
import { Typography, Box, Grid, Alert } from '@mui/material';

import * as visitedAPI from '../../utilities/visited-api';
import Modal from '../../components/Modal/Modal';
import VisitedRestaurantDetails from '../../components/VisitedRestaurantDetails/VisitedRestaurantDetails';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function VisitedRestaurantsPage() {
    usePageTitle(`Visited Restaurants`);
    const [visitedList, setVisitedList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitedList = async () => {
            setError(null);
            try {
                const listData = await visitedAPI.fetchVisits();
                setVisitedList(listData);
            } catch (error) {
                console.error('Error fetching visited restaurants: ', error);
                setError(
                    'An error occured fetching your visited restaurants. Please refresh the page to try again.'
                );
            }
        };
        fetchVisitedList();
    }, []);

    const handleDeleteVisit = async (restaurantId) => {
        setError(null);
        try {
            await visitedAPI.deleteRestaurantFromVisited(restaurantId);
            const updatedVisitedList = await visitedAPI.fetchVisits();
            setVisitedList(updatedVisitedList);
        } catch (error) {
            console.error('Error deleting visited restaurant', error);
            setError(
                'An error occured when trying to delete a visit. Please try again.'
            );
        }
    };

    const handleViewDetails = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    return (
        <>
            {visitedList ? (
                <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' gutterBottom>
                            Visited Restaurants
                        </Typography>
                    </Box>
                    {error && (
                        <Box mb={2}>
                            <Alert severity='error'>{error}</Alert>
                        </Box>
                    )}
                    {/* Display list of visited restaurants */}
                    {visitedList.length > 0 ? (
                        <Box mt={4}>
                            <Grid container spacing={2}>
                                {visitedList.map((visited, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}>
                                        <VisitedRestaurantDetails
                                            visited={visited}
                                            onDeleteVisit={handleDeleteVisit}
                                            onViewDetails={handleViewDetails}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <Typography textAlign='center' mt={2}>
                            No visited restaurants yet.
                        </Typography>
                    )}
                </Box>
            ) : (
                <Typography textAlign='center' mt={2}>
                    Loading...
                </Typography>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Typography variant='body1'>{selectedComment}</Typography>
            </Modal>
        </>
    );
}
