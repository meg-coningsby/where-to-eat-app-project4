import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';

export default function RestaurantSearch() {
    const [selectedPlace, setSelectedPlace] = useState(null);

    const handlePlaceSelected = (place) => {
        setSelectedPlace(place);
    };

    const apiKey = import.meta.env.VITE_apikey;

    return (
        <div>
            <h1>Restaurant Search</h1>
            <Autocomplete
                apiKey={apiKey}
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
