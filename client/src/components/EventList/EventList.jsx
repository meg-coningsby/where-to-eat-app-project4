import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '80%', margin: '0 auto', paddingTop: 4 }}>
            <Grid container spacing={2}>
                {events.map((event) => (
                    <Grid item key={event._id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                width: '100%',
                                '&:hover': { boxShadow: 6 },
                                cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/events/${event._id}`)}>
                            <CardContent>
                                <Typography variant='h6' component='div'>
                                    {event.title}
                                </Typography>
                                <Typography variant='body2' component='div'>
                                    {event.location.name}
                                </Typography>
                                <Typography variant='body2' component='div'>
                                    {new Date(event.date).toLocaleDateString(
                                        'en-Au',
                                        {
                                            weekday: 'short',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        }
                                    )}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size='small'
                                    color='secondary'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/events/${event._id}`);
                                    }}>
                                    View Event Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
