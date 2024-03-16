export default function ListList({ lists }) {
    return (
        <div>
            {lists.map((list) => (
                <div key={list._id}>
                    <h3>{list.name}</h3>
                    <p>Public: {list.public ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
}
