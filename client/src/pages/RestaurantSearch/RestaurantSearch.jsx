import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function RestaurantSearch() {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handlePlaceSelected = (place) => {
        setSelectedPlace(place);
    };

    return (
        <div>
            <h1>Restaurant Search</h1>
            <Autocomplete
                apiKey={import.meta.env.VITE_REACT_APP_apikey}
                onPlaceSelected={handlePlaceSelected}
                options={{
                    types: ['geocode'], // Specify the type of place data to return
                    fields: [
                        'address_components',
                        'geometry',
                        'formatted_address',
                    ], // Specify the fields to be returned
                }}
                language='en'
            />
            {selectedPlace && (
                <div>
                    <h2>Selected Place</h2>
                    <p>Address: {selectedPlace.formatted_address}</p>
                </div>
            )}
        </div>
    );
}
