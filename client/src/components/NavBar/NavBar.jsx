import { Link } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

export function NavBar({ user, setUser }) {
    return (
        <nav>
            {user ? (
                <>
                    <Link to='/'>Home</Link>
                    &nbsp; | &nbsp;
                    <Link to='/restaurants'>Search Restaurants</Link>
                    &nbsp; | &nbsp;
                    <Link to='/lists'>My Lists</Link>
                    &nbsp; | &nbsp;
                    <Link to='/lists/public'>Public Lists</Link>
                    &nbsp; | &nbsp;
                    <Link to='/visited'>My Visits</Link>
                    &nbsp; | &nbsp;
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
                <>
                    <Link to='/auth'>Login</Link>
                    &nbsp; | &nbsp;
                    <Link to='/restaurants'>Search Restaurants</Link>
                    &nbsp; | &nbsp;
                    <Link to='/lists/public'>Public Lists</Link>
                </>
            )}
        </nav>
    );
}
