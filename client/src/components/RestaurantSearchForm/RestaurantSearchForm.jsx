import React, { useRef, useState, useEffect } from 'react';
import {
    useAutocomplete,
    usePlacesService,
} from '@ubilabs/google-maps-react-hooks';
import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Select,
    Container,
    Box,
} from '@mui/material';

export default function RestaurantSearchForm({
    setRestaurants,
    sortCriteria,
    sortRestaurants,
    setSearchPerformed,
    setIsLoading,
}) {
    const inputRef = useRef(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchParams, setSearchParams] = useState({
        type: 'restaurant',
        cuisine: '',
        minRating: '',
    });

    const onPlaceChanged = (place) => {
        setSelectedPlace(place);
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

    const performSearch = () => {
        if (!selectedPlace || !service) return;

        setSearchPerformed(true);
        setIsLoading(true);

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
                const sortedResults = sortRestaurants(
                    filteredResults,
                    sortCriteria
                );
                setRestaurants(sortedResults);
                setIsLoading(false);
            } else {
                console.error('Places Service failed:', status);
                setRestaurants([]);
                setIsLoading(false);
            }
        });
    };

    const handleSearch = () => {
        performSearch();
    };

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label='Suburb or Postcode'
                            name='suburbOrPostcode'
                            variant='outlined'
                            inputRef={inputRef}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            name='type'
                            value={searchParams.type}
                            onChange={handleInputChange}
                            fullWidth
                            displayEmpty
                            variant='outlined'>
                            <MenuItem value='restaurant'>Restaurant</MenuItem>
                            <MenuItem value='bakery'>Bakery</MenuItem>
                            <MenuItem value='bar'>Bar</MenuItem>
                            <MenuItem value='cafe'>Cafe</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            name='cuisine'
                            value={searchParams.cuisine}
                            onChange={handleInputChange}
                            fullWidth
                            displayEmpty
                            variant='outlined'
                            disabled={
                                searchParams.type === 'bar' ||
                                searchParams.type === 'cafe' ||
                                searchParams.type === 'bakery'
                            }>
                            <MenuItem value=''>Cuisine</MenuItem>
                            <MenuItem value='australian'>Australian</MenuItem>
                            <MenuItem value='chinese'>Chinese</MenuItem>
                            <MenuItem value='french'>French</MenuItem>
                            <MenuItem value='greek'>Greek</MenuItem>
                            <MenuItem value='indian'>Indian</MenuItem>
                            <MenuItem value='italian'>Italian</MenuItem>
                            <MenuItem value='japanese'>Japanese</MenuItem>
                            <MenuItem value='korean'>Korean</MenuItem>
                            <MenuItem value='mexican'>Mexican</MenuItem>
                            <MenuItem value='thai'>Thai</MenuItem>
                            <MenuItem value='turkish'>Turkish</MenuItem>
                            <MenuItem value='vietnamese'>Vietnamese</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Select
                            name='minRating'
                            value={searchParams.minRating}
                            onChange={handleInputChange}
                            fullWidth
                            displayEmpty
                            variant='outlined'>
                            <MenuItem value='' disabled>
                                Min. Google Rating
                            </MenuItem>
                            <MenuItem value='3'>3</MenuItem>
                            <MenuItem value='3.5'>3.5</MenuItem>
                            <MenuItem value='4'>4</MenuItem>
                            <MenuItem value='4.5'>4.5</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            onClick={handleSearch}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
