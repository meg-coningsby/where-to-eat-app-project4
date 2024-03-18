import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { ThemeProvider } from '@mui/material/styles';

import { AuthPage } from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { NavBar } from '../../components/NavBar/NavBar';
import { lightTheme } from '../../themes/LightTheme';
import Home from '../Home/Home';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';
import RestaurantSearchDetailPage from '../RestaurantSearchDetailPage/RestaurantSearchDetailPage';
import ListIndexPage from '../ListIndexPage/ListIndexPage';
import NewEditListPage from '../NewEditListPage/NewEditListPage';
import ListShowPage from '../ListShowPage/ListShowPage';
import VisitedRestaurantsPage from '../VisitedRestaurantsPage/VisitedRestaurantsPage';

function App() {
    const apiKey = import.meta.env.VITE_apikey;

    const [user, setUser] = useState(() => {
        return getUser();
    });
    const [mapContainer, setMapContainer] = useState(null);

    const mapRef = useCallback((node) => {
        node && setMapContainer(node);
    }, []);

    const mapOptions = {
        center: { lat: 53.5582447, lng: 9.647645 },
        zoom: 6,
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <GoogleMapsProvider
                googleMapsAPIKey={apiKey}
                mapContainer={mapContainer}
                mapOptions={mapOptions}
                libraries={['places']}
                region='au'>
                <header>
                    <NavBar user={user} setUser={setUser} />
                </header>
                <main className='App'>
                    <Routes>
                        {user ? (
                            <>
                                {/* Routes accessible after authentication */}
                                <Route
                                    path='/'
                                    element={<Home user={user} />}
                                />
                                <Route
                                    path='/restaurants'
                                    element={<RestaurantSearch user={user} />}
                                />
                                <Route
                                    path='/restaurants/:id'
                                    element={
                                        <RestaurantSearchDetailPage
                                            user={user}
                                        />
                                    }
                                />
                                <Route
                                    path='/lists'
                                    element={<ListIndexPage user={user} />}
                                />
                                <Route
                                    path='/lists/new'
                                    element={<NewEditListPage user={user} />}
                                />
                                <Route
                                    path='/lists/public'
                                    element={<ListIndexPage user={user} />}
                                />
                                <Route
                                    path='/lists/:id'
                                    element={<ListShowPage user={user} />}
                                />
                                <Route
                                    path='/lists/:id/edit'
                                    element={<NewEditListPage user={user} />}
                                />
                                <Route
                                    path='/visited'
                                    element={
                                        <VisitedRestaurantsPage user={user} />
                                    }
                                />
                            </>
                        ) : (
                            <>
                                {/* Routes accessible without authentication */}
                                <Route path='/' element={<Home />} />
                                <Route
                                    path='/restaurants'
                                    element={<RestaurantSearch user={user} />}
                                />
                                <Route
                                    path='/restaurants/:id'
                                    element={
                                        <RestaurantSearchDetailPage
                                            user={user}
                                        />
                                    }
                                />
                                <Route
                                    path='/lists/public'
                                    element={<ListIndexPage user={user} />}
                                />
                                <Route
                                    path='/lists/:id'
                                    element={<ListShowPage user={user} />}
                                />

                                {/* Authentication Route */}
                                <Route
                                    path='/auth'
                                    element={<AuthPage setUser={setUser} />}
                                />
                            </>
                        )}

                        {/* Fallback route */}
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </main>
                <footer></footer>
            </GoogleMapsProvider>
        </ThemeProvider>
    );
}

export default App;
