import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Container,
    Alert,
    Breadcrumbs,
    Link,
    Typography,
} from '@mui/material';

import * as eventsAPI from '../../utilities/events-api';
import EventDetail from '../../components/EventDetail/EventDetail';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function EventsShowPage({ user }) {
    usePageTitle(`Event Details`);
    const navigate = useNavigate();
    const { id } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [error, setError] = useState(null);

    const fetchEventDetails = async () => {
        setError(null);
        try {
            const event = await eventsAPI.fetchEvent(id);
            setEventDetails(event);
        } catch (error) {
            console.error(error);
            setError(
                'An error occured when fetching the event details. Please try again.'
            );
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, [id]);

    const handleDeleteEvent = async () => {
        setError(null);
        try {
            await eventsAPI.deleteEvent(id);
            navigate('/events');
        } catch (error) {
            console.error('Error deleting event', error);
            setError(
                'An error occured when trying to delete this event. Please try again.'
            );
        }
    };

    const handleAcceptEvent = async () => {
        setError(null);
        try {
            await eventsAPI.acceptEvent(id, user.sub);
            fetchEventDetails();
        } catch (error) {
            console.error('Error accepting event', error);
            setError(
                'An error occured when trying to accept this invitation. Please try again.'
            );
        }
    };

    const handleDeclineEvent = async () => {
        setError(null);
        try {
            await eventsAPI.declineEvent(id, user.sub);
            fetchEventDetails();
        } catch (error) {
            console.error('Error declining event', error);
            setError(
                'An error occured when trying to decline this invitation. Please try again.'
            );
        }
    };

    return (
        <>
            <Container maxWidth='md'>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    flexDirection='column'
                    textAlign='center'
                    mt={2}>
                    <Breadcrumbs
                        aria-label='breadcrumb'
                        sx={{
                            fontSize: '0.8rem',
                            '& a': { textDecoration: 'none', color: 'inherit' },
                            '& .MuiTypography-root': {
                                fontSize: '0.8rem',
                                textDecoration: 'none',
                                color: 'inherit',
                            },
                        }}>
                        <Link href='/'>Home</Link>
                        <Link href='/events'>Events</Link>
                        <Typography>
                            {eventDetails && eventDetails.title}
                        </Typography>
                    </Breadcrumbs>
                </Box>
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
                {error && (
                    <Box mb={2}>
                        <Alert severity='error'>{error}</Alert>
                    </Box>
                )}
            </Container>
        </>
    );
}
