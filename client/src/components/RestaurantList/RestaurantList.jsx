import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Container,
    Box,
} from '@mui/material';

export default function RestaurantList({ restaurants }) {
    return (
        <Container maxWidth='lg' sx={{ mt: 4, pb: 4 }}>
            <Grid container spacing={2} justifyContent='center'>
                {restaurants.map((restaurant) => (
                    <Grid
                        item
                        key={restaurant.place_id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        sx={{ display: 'flex' }}>
                        <Link
                            to={`/restaurants/${restaurant.place_id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                width: '100%',
                            }}>
                            <Card
                                sx={{
                                    maxWidth: '100%',
                                    height: '100%',
                                    margin: 'auto',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    {' '}
                                    <Typography variant='h5' component='div'>
                                        {restaurant.name}
                                    </Typography>
                                    <Typography variant='body1'>
                                        {restaurant.vicinity}
                                    </Typography>
                                    <Typography
                                        variant='body2'
                                        color='text.secondary'
                                        sx={{ marginTop: 1 }}>
                                        Google Rating: {restaurant.rating}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
