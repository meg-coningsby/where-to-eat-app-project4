import { Link } from 'react-router-dom';
import {
    Container,
    Box,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    CardActions,
    Button,
} from '@mui/material';

export default function EventDetail({
    event,
    user,
    handleDeleteEvent,
    handleAcceptEvent,
    handleDeclineEvent,
}) {
    if (!event) {
        return (
            <Container maxWidth='sm'>
                <Typography>Loading...</Typography>
            </Container>
        );
    }

    const apiKey = import.meta.env.VITE_apikey;

    // Check if event.location is defined
    const locationName = event.location
        ? event.location.name
        : 'Unknown Location';

    // Construct Google Maps embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(
        locationName + ' ' + (event.location ? event.location.address : '')
    )}`;

    // Helper function to render user lists
    const renderUserList = (users, emptyMessage = 'No users') => {
        return users.length > 0 ? (
            users.map((user, index) => (
                <span key={index}>
                    {user.name}
                    {index < users.length - 1 ? ', ' : ''}
                </span>
            ))
        ) : (
            <span>{emptyMessage}</span>
        );
    };

    const renderCardActions = () => {
        if (!user) return null;

        // Checks if the user is the owner of the event
        if (user.sub === event.owner._id) {
            return (
                <>
                    <Button
                        size='small'
                        component={Link}
                        to={`/events/${event._id}/edit`}>
                        Edit Event
                    </Button>
                    <Button
                        size='small'
                        color='error'
                        onClick={() => handleDeleteEvent(event._id)}>
                        Delete Event
                    </Button>
                </>
            );
        }

        // Checks if the user is invited and has not yet accepted or declined
        const isInvited = event.invitedUsers.some(
            (invitedUser) => invitedUser._id === user.sub
        );
        const hasAccepted = event.acceptedUsers.some(
            (acceptedUser) => acceptedUser._id === user.sub
        );
        const hasDeclined = event.declinedUsers.some(
            (declinedUser) => declinedUser._id === user.sub
        );

        if (isInvited && !hasAccepted && !hasDeclined) {
            return (
                <>
                    <Button
                        size='small'
                        onClick={() => handleAcceptEvent(event._id, user.sub)}>
                        Accept
                    </Button>
                    <Button
                        size='small'
                        color='error'
                        onClick={() => handleDeclineEvent(event._id, user.sub)}>
                        Decline
                    </Button>
                </>
            );
        }

        // If the user has already responded or was not invited, no actions are shown
        return null;
    };

    return (
        <Container maxWidth='md' style={{ marginTop: '20px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}>
                <Card elevation={0} sx={{ width: '100%' }}>
                    <CardMedia
                        component='iframe'
                        src={mapUrl}
                        height='250'
                        title='Event Location'
                        style={{ border: 0, width: '100%' }}
                        loading='lazy'
                        allowFullScreen
                    />
                    <CardContent>
                        <Typography variant='h4' gutterBottom>
                            {event.title}
                        </Typography>
                        <Typography variant='h6' gutterBottom>
                            {locationName}
                        </Typography>

                        {/* Responsive Grid Container */}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Typography variant='body1' gutterBottom>
                                    {event.description}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Typography variant='body1' gutterBottom>
                                    Event Created By: {event.owner.name}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Invited:{' '}
                                    {renderUserList(
                                        event.invitedUsers,
                                        'No users invited'
                                    )}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Accepted:{' '}
                                    {renderUserList(
                                        event.acceptedUsers,
                                        'No accepted users'
                                    )}
                                </Typography>
                                <Typography variant='body1' gutterBottom>
                                    Declined:{' '}
                                    {renderUserList(
                                        event.declinedUsers,
                                        'No declined users'
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        {renderCardActions()}
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
}
