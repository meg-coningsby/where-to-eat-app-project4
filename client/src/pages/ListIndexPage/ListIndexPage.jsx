import { Link } from 'react-router-dom';

export default function ListIndexPage({user}) {
    return (
        <>
            <h1>Your Lists</h1>
            <h3>All the lists you've created and the eateries you've saved.</h3>
            <Link to={'/lists/new'}>
                <p>Add a New List</p>
            </Link>
        </>
    );
}
