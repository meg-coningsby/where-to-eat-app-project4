import ListForm from '../../components/ListForm/ListForm';

export default function NewListPage({ user }) {
    return (
        <>
            <h1>Add a New List</h1>
            <ListForm user={user} />
        </>
    );
}
