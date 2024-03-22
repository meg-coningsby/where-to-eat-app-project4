import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import EventForm from '../../components/EventForm/EventForm';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function NewEditEventPage({ user }) {
    const location = useLocation();
    const isNewEvent = location.pathname === '/events/new';

    const pageTitle = isNewEvent ? 'Create a New Event' : 'Edit Event';

    usePageTitle(pageTitle);

    return (
        <Container maxWidth='sm'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {pageTitle}
                </Typography>
                <EventForm user={user} />
            </Box>
        </Container>
    );
}
