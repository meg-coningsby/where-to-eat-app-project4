import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Box,
    Grid,
    Rating,
} from '@mui/material';

import * as visitedAPI from '../../utilities/visited-api';
import Modal from '../../components/Modal/Modal';
import VisitedRestaurantDetails from '../../components/VisitedRestaurantDetails/VisitedRestaurantDetails';

export default function VisitedRestaurantsPage() {
    const [visitedList, setVisitedList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedComment, setSelectedComment] = useState('');

    useEffect(() => {
        const fetchVisitedList = async () => {
            try {
                const listData = await visitedAPI.fetchVisits();
                setVisitedList(listData);
            } catch (error) {
                console.error('Error fetching list details: ', error);
            }
        };
        fetchVisitedList();
    }, []);

    const handleDeleteVisit = async (restaurantId) => {
        try {
            await visitedAPI.deleteRestaurantFromVisited(restaurantId);
            const updatedVisitedList = await visitedAPI.fetchVisits();
            setVisitedList(updatedVisitedList);
        } catch (error) {
            console.error('Error deleting visited restaurant', error);
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
