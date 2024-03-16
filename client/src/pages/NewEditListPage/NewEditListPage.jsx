import { useLocation } from 'react-router-dom';
import ListForm from '../../components/ListForm/ListForm';

export default function NewEditListPage({ user }) {
    const location = useLocation();
    const isNewList = location.pathname === '/lists/new';

    return (
        <>
            <h1>{isNewList ? 'Add a New List' : 'Edit List'}</h1>
            <ListForm user={user} />
        </>
    );
}
