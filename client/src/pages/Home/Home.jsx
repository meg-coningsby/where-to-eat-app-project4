import { Link } from 'react-router-dom';
import { Button, Typography, Box, CardMedia } from '@mui/material';

export default function Home({ user }) {
    return (
        <Box
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            minHeight='100vh'
            textAlign='center'
            padding='20px'>
            <CardMedia
                component='img'
                alt='Where to eat feature image'
                height='140'
                image='../../assets/homepage-image.png'
                sx={{ width: 345, marginBottom: 2 }}
            />
            <Typography variant='h1' gutterBottom>
                Where To Eat
            </Typography>
            <Typography variant='h3' gutterBottom>
                Never be stumped with where to eat again.
            </Typography>
            {!user && (
                <Link to={'/auth'} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Login / Sign Up</Button>
                </Link>
            )}
        </Box>
    );
}
