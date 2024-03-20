import { Button, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Profile({ user }) {
    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {user.name}'s Profile
                </Typography>
                <Typography variant='h6' gutterBottom>
                    Email: {user.email}
                </Typography>
                <Box
                    mt={2}
                    display='flex'
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems='center'
                    justifyContent='center'
                    gap={2}>
                    <Link to='/lists' style={{ textDecoration: 'none' }}>
                        <Button variant='outlined' color='primary'>
                            View Saved Lists
                        </Button>
                    </Link>
                    <Link to='/visited' style={{ textDecoration: 'none' }}>
                        <Button variant='outlined' color='primary'>
                            View Visited Restaurants
                        </Button>
                    </Link>
                    <Link to='/events' style={{ textDecoration: 'none' }}>
                        <Button variant='outlined' color='primary'>
                            View Events
                        </Button>
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
