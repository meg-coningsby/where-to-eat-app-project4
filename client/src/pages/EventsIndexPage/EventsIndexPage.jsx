import { Link } from 'react-router-dom';

export default function EventsIndexPage({ user }) {
    return (
        <>
            <h1>My Events</h1>
            <Link to='/events/new'>Add a new event</Link>
        </>
    );
}
