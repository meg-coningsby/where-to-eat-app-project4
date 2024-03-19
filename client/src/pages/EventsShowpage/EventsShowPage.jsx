import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import * as eventsAPI from '../../utilities/events-api';
import EventDetail from '../../components/EventDetail/EventDetail';

export default function EventsShowPage({ user }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    const fetchEventDetails = async () => {
        try {
            const event = await eventsAPI.fetchEvent(id);
            setEventDetails(event);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch event details.');
        }
    };

    useEffect(() => {
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

    const handleAcceptEvent = async () => {
        try {
            await eventsAPI.acceptEvent(id, user.sub);
            fetchEventDetails();
        } catch (error) {
            console.error('Error accepting event', error);
        }
    };

    const handleDeclineEvent = async () => {
        try {
            await eventsAPI.declineEvent(id, user.sub);
            fetchEventDetails();
        } catch (error) {
            console.error('Error declining event', error);
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
                        handleAcceptEvent={handleAcceptEvent}
                        handleDeclineEvent={handleDeclineEvent}
                    />
                </Box>
            </Container>
        </>
    );
}
