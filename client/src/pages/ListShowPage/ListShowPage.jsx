import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Typography,
    Box,
    TextField,
    Grid,
    Rating,
} from '@mui/material';

import * as listsAPI from '../../utilities/lists-api';
import * as restaurantsAPI from '../../utilities/restaurants-api';
import * as visitedAPI from '../../utilities/visited-api';
import Modal from '../../components/Modal/Modal';
import ListRestaurantDetails from '../../components/ListRestaurantDetails/ListRestaurantDetails';

export default function ListShowPage({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRestaurantId, setCurrentRestaurantId] = useState('');
    const [visitDetails, setVisitDetails] = useState({
        visitDate: '',
        comments: '',
        rating: 0,
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
                comments: commentsValue,
                rating: visitDetails.rating,
                userId: user.sub,
            });
            setIsModalOpen(false);
            setVisitDetails({ visitDate: '', comments: '' });
            setCurrentRestaurantId('');
        } catch (error) {
            console.error('Error marking restaurant as visited', error);
        }
    };

    return (
        <>
            {list ? (
                <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant='h4' gutterBottom>
                            {list.name}
                        </Typography>
                        <Typography variant='subtitle1' gutterBottom>
                            Public: {list.public ? 'Yes' : 'No'}
                        </Typography>
                    </Box>
                    {user && (
                        <Box
                            sx={{
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 1,
                            }}>
                            <Button
                                variant='contained'
                                color='secondary'
                                component={Link}
                                to={`/lists/${id}/edit`}>
                                Edit List Details
                            </Button>
                            <Button
                                variant='outlined'
                                color='error'
                                onClick={handleDelete}>
                                Delete List
                            </Button>
                        </Box>
                    )}
                    {list.restaurants && list.restaurants.length > 0 ? (
                        <Box mt={4}>
                            <Grid container spacing={2}>
                                {list.restaurants.map((restaurant, index) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={index}>
                                        <ListRestaurantDetails
                                            restaurant={restaurant}
                                            user={user}
                                            handleRemoveRestaurant={
                                                handleRemoveRestaurant
                                            }
                                            handleMarkAsVisited={
                                                handleMarkAsVisited
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ) : (
                        <Typography textAlign='center' mt={2}>
                            No restaurants in this list.
                        </Typography>
                    )}
                </Box>
            ) : (
                <Typography textAlign='center' mt={2}>
                    Loading...
                </Typography>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                        <Typography component='legend'>Rating</Typography>
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
                </>
            </Modal>
        </>
    );
}
