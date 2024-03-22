import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material';

import * as visitedAPI from '../../utilities/visited-api';

export default function ListRestaurantDetails({
    restaurant,
    user,
    handleRemoveRestaurant,
    handleMarkAsVisited,
}) {
    const [isVisited, setIsVisited] = useState(false);

    useEffect(() => {
        const fetchVisitedStatus = async () => {
            try {
                const response = await visitedAPI.checkIfVisited(
                    restaurant._id
                );
                setIsVisited(response.isVisited);
            } catch (error) {
                console.error('Error checking visited status:', error);
            }
        };

        if (user) {
            fetchVisitedStatus();
        }
    }, [restaurant._id, user]);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6'>
                    <Link
                        to={`/restaurants/${restaurant.googlePlaceId}`}
                        style={{
                            color: 'inherit',
                        }}>
                        {restaurant.name}
                    </Link>
                </Typography>
                <Typography variant='body2'>{restaurant.address}</Typography>
                <Typography
                    variant='body2'
                    color='textSecondary'
                    component='div'
                    sx={{ mt: 1 }}>
                    {isVisited ? 'Visited' : 'Not Visited'}
                </Typography>
            </CardContent>
            {user && (
                <CardActions>
                    <Button
                        size='small'
                        color='error'
                        onClick={() => handleRemoveRestaurant(restaurant._id)}>
                        Remove
                    </Button>
                    <Button
                        size='small'
                        onClick={() => handleMarkAsVisited(restaurant._id)}>
                        Add a Visit
                    </Button>
                </CardActions>
            )}
        </Card>
    );
}
