import { Link } from 'react-router-dom';

export default function ListList({ lists }) {
    return (
        <div>
            {lists.map((list) => (
                <div key={list._id}>
                    <Link to={`/lists/${list._id}`}>
                        <h3>{list.name}</h3>
                    </Link>
                    <p>Owner: {list.owner}</p>
                    <p>Public: {list.public ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
}
