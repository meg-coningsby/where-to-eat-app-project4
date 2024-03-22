import React, { useState, useEffect } from 'react';
import {
    Typography,
    Container,
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';

import RestaurantSearchForm from '../../components/RestaurantSearchForm/RestaurantSearchForm';
import RestaurantList from '../../components/RestaurantList/RestaurantList';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function RestaurantSearch() {
    usePageTitle(`Restaurant Search`);
    const [restaurants, setRestaurants] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('rating');
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const sortRestaurants = (restaurants, criteria) => {
        if (criteria === 'name') {
            return [...restaurants].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else if (criteria === 'rating') {
            return [...restaurants].sort((a, b) => b.rating - a.rating);
        }
        return restaurants;
    };

    const handleSortChange = (event, newCriteria) => {
        if (newCriteria !== null) {
            setSortCriteria(newCriteria);
        }
    };

    useEffect(() => {
        setRestaurants((currentRestaurants) =>
            sortRestaurants(currentRestaurants, sortCriteria)
        );
    }, [sortCriteria]);

    return (
        <Container
            maxWidth='md'
            sx={{
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
            <Typography variant='h4' component='h1' gutterBottom align='center'>
                Restaurant Search
            </Typography>
            <RestaurantSearchForm
                setRestaurants={setRestaurants}
                sortCriteria={sortCriteria}
                sortRestaurants={sortRestaurants}
                setSearchPerformed={setSearchPerformed}
                setIsLoading={setIsLoading}
                sx={{ width: '100%', maxWidth: 600 }}
            />
            {restaurants.length > 0 && (
                <ToggleButtonGroup
                    value={sortCriteria}
                    exclusive
                    onChange={handleSortChange}
                    aria-label='Filter events'
                    size='small'
                    style={{ marginBottom: '16px', marginTop: '20px' }}>
                    <ToggleButton value='rating'>Sort by Rating</ToggleButton>
                    <ToggleButton value='name'>Sort by Name</ToggleButton>
                </ToggleButtonGroup>
            )}
            <RestaurantList
                restaurants={restaurants}
                sx={{ width: '100%', maxWidth: 600 }}
            />
            {searchPerformed && !isLoading && restaurants.length === 0 && (
                <Typography variant='body1' align='center'>
                    No places found matching your search filters.
                </Typography>
            )}
        </Container>
    );
}
