import { Link } from 'react-router-dom';
import { Button, Typography, Box, CardMedia } from '@mui/material';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function Home({ user }) {
    usePageTitle('Home');

    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='flex-start'
            minHeight='100vh'
            textAlign='center'
            padding='20px'>
            <CardMedia
                component='img'
                image='/homepageImage.png'
                alt='Homepage Image'
                style={{ maxWidth: '30%', height: 'auto' }}
            />
            <Typography variant='h1' gutterBottom>
                Where To Eat
            </Typography>
            <Typography variant='h5' gutterBottom>
                Never be stumped with where to eat again.
            </Typography>
            {!user && (
                <Box mt={2}>
                    <Link to={'/auth'} style={{ textDecoration: 'none' }}>
                        <Button variant='contained'>Login / Sign Up</Button>
                    </Link>
                </Box>
            )}
        </Box>
    );
}
