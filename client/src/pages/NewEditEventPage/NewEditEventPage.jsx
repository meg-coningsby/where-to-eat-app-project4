import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import EventForm from '../../components/EventForm/EventForm';

export default function NewEditEventPage({ user }) {
    const location = useLocation();
    const isNewEvent = location.pathname === '/events/new';

    return (
        <Container maxWidth='sm'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {isNewEvent ? 'Create a New Event' : 'Edit Event'}
                </Typography>
                <EventForm user={user} />
            </Box>
        </Container>
    );
}
