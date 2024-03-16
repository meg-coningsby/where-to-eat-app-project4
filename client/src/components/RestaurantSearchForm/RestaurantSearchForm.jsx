import React, { useRef, useState, useEffect } from 'react';
import {
    useAutocomplete,
    usePlacesService,
} from '@ubilabs/google-maps-react-hooks';

export default function RestaurantSearchForm({ restaurants, setRestaurants }) {
    const inputRef = useRef(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchParams, setSearchParams] = useState({
        type: 'restaurant',
        cuisine: '',
        minRating: '0',
    });
    const [searchTriggered, setSearchTriggered] = useState(false);

    const onPlaceChanged = (place) => {
        setSelectedPlace(place);
        setSearchTriggered(false);
    };

    useAutocomplete({
        inputField: inputRef.current,
        onPlaceChanged,
    });

    // Initialize the mapContainerRef with a valid DOM element
    const mapContainerRef = useRef(document.createElement('div'));

    // Initialize the usePlacesService hook with the map container ref
    const service = usePlacesService({
        divElement: mapContainerRef.current,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    // Perform search when search is triggered and both place and searchParams are set
    useEffect(() => {
        if (!searchTriggered || !selectedPlace || !service) return;

        const request = {
            location: new google.maps.LatLng(
                selectedPlace.geometry.location.lat(),
                selectedPlace.geometry.location.lng()
            ),
            radius: '1000', // Radius in metres
            type: [searchParams.type],
            keyword: searchParams.cuisine,
            minPriceLevel: 0,
            maxPriceLevel: 4,
        };

        service.nearbySearch(request, (results, status) => {
            if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                results
            ) {
                const filteredResults = results.filter(
                    (result) => result.rating >= searchParams.minRating
                );
                setRestaurants(filteredResults);
            } else {
                console.error('Places Service failed:', status);
                setRestaurants([]);
            }
        });
    }, [searchTriggered, service]);

    const handleSearch = () => {
        setSearchTriggered(true);
    };

    return (
        <div>
            <input
                ref={inputRef}
                type='text'
                placeholder='Search for a place...'
            />
            <select
                name='type'
                value={searchParams.type}
                onChange={handleInputChange}>
                <option value='restaurant'>Restaurant</option>
                <option value='cafe'>Cafe</option>
                <option value='takeaway'>Takeaway</option>
            </select>
            <select
                name='cuisine'
                value={searchParams.cuisine}
                onChange={handleInputChange}>
                <option value=''>Select Cuisine</option>
                <option value='japanese'>Japanese</option>
                <option value='italian'>Italian</option>
                <option value='mexican'>Mexican</option>
                <option value='thai'>Thai</option>
            </select>
            <select
                name='minRating'
                value={searchParams.minRating}
                onChange={handleInputChange}>
                <option value='3'>3</option>
                <option value='3.5'>3.5</option>
                <option value='4'>4</option>
                <option value='4.5'>4.5</option>
            </select>
            <button onClick={handleSearch}>Search</button>
            {/* Add a div container for the map */}
            <div ref={mapContainerRef} style={{ display: 'none' }}></div>
        </div>
    );
}
