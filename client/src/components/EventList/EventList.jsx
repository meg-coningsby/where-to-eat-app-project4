import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CardActions,
    Button,
} from '@mui/material';

export default function EventList({ events }) {
    const handleDeleteEvent = async () => {
        try {
        } catch (error) {}
    };

    return (
        <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item key={event._id} xs={12} sm={6} md={4}>
                        <Link
                            to={`/events/${event._id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                            }}>
                            <Card
                                sx={{
                                    width: '100%',
                                    '&:hover': { boxShadow: 6 },
                                }}>
                                <CardContent>
                                    <Typography variant='h5' component='div'>
                                        {event.title}
                                    </Typography>
                                    <CardActions>
                                        <Button
                                            size='small'
                                            component={Link}
                                            to={`/events/${event._id}/edit`}>
                                            Edit Event
                                        </Button>
                                        <Button
                                            size='small'
                                            color='error'
                                            onClick={() =>
                                                handleDeleteEvent(event._id)
                                            }>
                                            Delete Event
                                        </Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
