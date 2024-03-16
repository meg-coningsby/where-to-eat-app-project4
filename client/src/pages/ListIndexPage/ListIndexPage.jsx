import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ListList from '../../components/ListList/ListList';
import * as listsAPI from '../../utilities/lists-api';

export default function ListIndexPage({ user }) {
    const [lists, setLists] = useState([]);

    const fetchLists = async () => {
        try {
            const lists = await listsAPI.fetchLists();
            setLists(lists);
        } catch (error) {
            console.error('Error fetching the notes: ', error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, []);

    return (
        <>
            <h1>Your Lists</h1>
            <h3>All the lists you've created and the eateries you've saved.</h3>
            <Link to={'/lists/new'}>
                <p>Add a New List</p>
            </Link>
            <ListList lists={lists} />
        </>
    );
}
