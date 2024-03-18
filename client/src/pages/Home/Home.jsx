import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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
