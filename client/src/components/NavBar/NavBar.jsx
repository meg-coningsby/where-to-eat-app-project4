import { Link } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

export function NavBar({ user, setUser }) {
    return (
        <nav>
            {user ? (
                <>
                    <Link to='/restaurantsearch'>Search Restaurants</Link>
                    <Link to=''>Saved Lists</Link>
                    <Link to=''>Friends</Link>
                    <Link to=''>Profile</Link>
                    <Link
                        to=''
                        onClick={() => {
                            logout();
                            setUser(null);
                        }}>
                        Logout
                    </Link>
                </>
            ) : (
                <Link to='/login'>Login</Link>
            )}
        </nav>
    );
}
