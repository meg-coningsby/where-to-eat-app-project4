import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Grid,
} from '@mui/material';

export default function ListRestaurantDetails({
    restaurants,
    user,
    handleRemoveRestaurant,
    handleMarkAsVisited,
}) {
    return (
        <Grid container spacing={2}>
            {restaurants.map((restaurant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    {' '}
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
                            <Typography variant='body2'>
                                {restaurant.address}
                            </Typography>
                        </CardContent>
                        {user && (
                            <CardActions>
                                <Button
                                    size='small'
                                    color='error'
                                    onClick={() =>
                                        handleRemoveRestaurant(restaurant._id)
                                    }>
                                    Remove
                                </Button>
                                <Button
                                    size='small'
                                    onClick={() =>
                                        handleMarkAsVisited(restaurant._id)
                                    }>
                                    Add a Visit
                                </Button>
                            </CardActions>
                        )}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
