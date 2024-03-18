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
                <Box sx={{ maxWidth: 600, margin: '0 auto', paddingTop: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' gutterBottom>
                            Visited Restaurants
                        </Typography>
                    </Box>
                    {/* Display list of visited restaurants */}
                    {visitedList.length > 0 ? (
                        <Box mt={4}>
                            {' '}
                            <Grid container spacing={2}>
                                {visitedList.map((visited, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant='h6'>
                                                    <Link
                                                        to={`/restaurants/${visited.restaurant.googlePlaceId}`}>
                                                        {
                                                            visited.restaurant
                                                                .name
                                                        }
                                                    </Link>
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                        width: '100%',
                                                    }}
                                                    mt={1}>
                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'>
                                                        {new Date(
                                                            visited.visitDate
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                    {visited.rating && (
                                                        <Rating
                                                            name='read-only'
                                                            size='small'
                                                            value={
                                                                visited.rating
                                                            }
                                                            readOnly
                                                        />
                                                    )}
                                                </Box>
                                            </CardContent>
                                            <CardActions>
                                                {visited.comments && (
                                                    <Button
                                                        size='small'
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                visited.comments
                                                            )
                                                        }>
                                                        View Details
                                                    </Button>
                                                )}
                                                <Button
                                                    size='small'
                                                    color='error'
                                                    onClick={() =>
                                                        handleDeleteVisit(
                                                            visited._id
                                                        )
                                                    }>
                                                    Delete Visit
                                                </Button>
                                            </CardActions>
                                        </Card>
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
