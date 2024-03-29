import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Alert,
} from '@mui/material';

import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';
import EventList from '../../components/EventList/EventList';
import * as eventsAPI from '../../utilities/events-api';

export default function EventsIndexPage({ user }) {
    usePageTitle('Events');

    const [events, setEvents] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setError(null);
        try {
            let fetchedEvents;
            if (selectedFilter === 'all') {
                fetchedEvents = await eventsAPI.fetchOwnedAndInvitedEvent();
            } else if (selectedFilter === 'own') {
                fetchedEvents = await eventsAPI.fetchOwnedEvent();
            } else if (selectedFilter === 'invited') {
                fetchedEvents = await eventsAPI.fetchInvitedEvent();
            }
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Error fetching the events');
            setError(
                'An error occured when fetching your events. Please refresh the page and try again.'
            );
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [selectedFilter]);

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setSelectedFilter(newFilter);
        }
    };

    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    My Events
                </Typography>
                <Link to={'/events/new'} style={{ textDecoration: 'none' }}>
                    <Button
                        variant='contained'
                        color='secondary'
                        style={{ marginTop: '16px' }}>
                        Create a New Event
                    </Button>
                </Link>
                {error && (
                    <Box mb={2}>
                        <Alert severity='error'>{error}</Alert>
                    </Box>
                )}
                <ToggleButtonGroup
                    value={selectedFilter}
                    exclusive
                    onChange={handleFilterChange}
                    color='primary'
                    style={{ marginBottom: '16px', marginTop: '20px' }}>
                    <ToggleButton value='all'>All Events</ToggleButton>
                    <ToggleButton value='own'>My Own Events</ToggleButton>
                    <ToggleButton value='invited'>Invited Events</ToggleButton>
                </ToggleButtonGroup>
                <EventList events={events} user={user} />
            </Box>
        </Container>
    );
}
