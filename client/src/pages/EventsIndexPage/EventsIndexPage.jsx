import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';

import EventList from '../../components/EventList/EventList';
import * as eventsAPI from '../../utilities/events-api';

export default function EventsIndexPage({ user }) {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const events = await eventsAPI.fetchOwnedEvent();
            setEvents(events);
        } catch (error) {
            console.error('Error fetching the events');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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
                <EventList events={events} user={user} />
            </Box>
        </Container>
    );
}
