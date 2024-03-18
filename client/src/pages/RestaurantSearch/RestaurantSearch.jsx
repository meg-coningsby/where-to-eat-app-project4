import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import RestaurantSearchForm from '../../components/RestaurantSearchForm/RestaurantSearchForm';
import RestaurantList from '../../components/RestaurantList/RestaurantList';

export default function RestaurantSearch() {
    const [restaurants, setRestaurants] = useState([]);
    return (
        <Container
            maxWidth='md'
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography variant='h2' component='h1' gutterBottom align='center'>
                Restaurant Search
            </Typography>
            <RestaurantSearchForm
                restaurants={restaurants}
                setRestaurants={setRestaurants}
                sx={{ width: '100%', maxWidth: 600 }}
            />
            <RestaurantList
                restaurants={restaurants}
                sx={{ width: '100%', maxWidth: 600 }}
            />
        </Container>
    );
}
