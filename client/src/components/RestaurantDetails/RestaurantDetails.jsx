export default function RestaurantDetail({ restaurant }) {
    const apiKey = import.meta.env.VITE_apikey;
    return (
        <>
            {restaurant ? (
                <>
                    <h2>Name: {restaurant.name}</h2>
                    <p>Address: {restaurant.formatted_address}</p>
                    <iframe
                        width='600'
                        height='450'
                        style={{ border: 0 }}
                        loading='lazy'
                        allowFullScreen
                        src={`https://www.google.com/maps/embed/v1/search?key=${apiKey}&q=${encodeURIComponent(
                            restaurant.name + ' ' + restaurant.formatted_address
                        )}`}></iframe>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}
