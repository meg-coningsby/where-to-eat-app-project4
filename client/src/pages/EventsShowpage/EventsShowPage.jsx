import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import * as eventsAPI from '../../utilities/events-api';
import EventDetail from '../../components/EventDetail/EventDetail';

export default function EventsShowPage({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const event = await eventsAPI.fetchEvent(id);
                setEventDetails(event);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch event details.');
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleDeleteEvent = async () => {
        try {
            await eventsAPI.deleteEvent(id);
            navigate('/events');
        } catch (error) {
            console.error('Error deleting event', error);
        }
    };

    return (
        <>
            <Container maxWidth='md'>
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='flex-start'
                    mt={4}>
                    <EventDetail
                        event={eventDetails}
                        user={user}
                        handleDeleteEvent={handleDeleteEvent}
                    />
                </Box>
            </Container>
        </>
    );
}
