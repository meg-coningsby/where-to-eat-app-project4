import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>Where To Eat</h1>
            <h3>Never be stumped with where to eat again.</h3>
            <button>Sign up</button>
            <button>Login</button>
            <Link to={'/restaurantsearch'}>
                <p>Jump straight to search</p>
            </Link>
        </>
    );
}
