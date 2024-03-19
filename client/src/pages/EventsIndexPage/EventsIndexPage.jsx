import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';

import EventList from '../../components/EventList/EventList';
import * as eventsAPI from '../../utilities/events-api';

export default function EventsIndexPage({ user }) {
    const [events, setEvents] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const fetchEvents = async () => {
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
                        color='primary'
                        style={{ marginTop: '16px' }}>
                        Create a New Event
                    </Button>
                </Link>
                <ToggleButtonGroup
                    value={selectedFilter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label='Filter events'
                    size='small'
                    style={{ marginBottom: '16px', marginTop: '20px' }}>
                    <ToggleButton value='all'>All Events</ToggleButton>
                    <ToggleButton value='own'>My Own Events</ToggleButton>
                    <ToggleButton value='invited'>Invited Events</ToggleButton>
                    {/* Add more filter options as needed */}
                </ToggleButtonGroup>
                <EventList events={events} user={user} />
            </Box>
        </Container>
    );
}
