import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
    return (
        <>
            <h1>Where To Eat</h1>
            <h3>Never be stumped with where to eat again.</h3>
            <Link to={'/auth'}>
                <Button variant='contained'>Login / Sign Up</Button>
            </Link>
            <Link to={'/restaurants'}>
                <Button>Search Restaurants</Button>
            </Link>
        </>
    );
}
