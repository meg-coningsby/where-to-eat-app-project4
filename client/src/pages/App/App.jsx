import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../themes/LightTheme';
import { darkTheme } from '../../themes/DarkTheme';
import CssBaseline from '@mui/material/CssBaseline';

import { getUser } from '../../utilities/users-service';

import { NavBar } from '../../components/NavBar/NavBar';
import Home from '../Home/Home';
import AuthPage from '../AuthPage/AuthPage';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';
import RestaurantSearchDetailPage from '../RestaurantSearchDetailPage/RestaurantSearchDetailPage';
import ListIndexPage from '../ListIndexPage/ListIndexPage';
import NewEditListPage from '../NewEditListPage/NewEditListPage';
import ListShowPage from '../ListShowPage/ListShowPage';
import VisitedRestaurantsPage from '../VisitedRestaurantsPage/VisitedRestaurantsPage';
import EventsIndexPage from '../EventsIndexPage/EventsIndexPage';
import EventsShowPage from '../EventsShowpage/EventsShowPage';
import NewEditEventPage from '../NewEditEventPage/NewEditEventPage';
import NotificationsIndex from '../NotificationsIndex/NotificationsIndex';
import Profile from '../Profile/Profile';

function App() {
    const apiKey = import.meta.env.VITE_apikey;

    const [user, setUser] = useState(() => {
        return getUser();
    });
    const [mapContainer, setMapContainer] = useState(null);
    const [themeMode, setThemeMode] = useState('light');

    const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const mapRef = useCallback((node) => {
        node && setMapContainer(node);
    }, []);

    const mapOptions = {
        center: { lat: 53.5582447, lng: 9.647645 },
        zoom: 6,
    };

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <GoogleMapsProvider
                googleMapsAPIKey={apiKey}
                mapContainer={mapContainer}
                mapOptions={mapOptions}
                libraries={['places']}
                region='au'>
                <header>
                    <NavBar
                        user={user}
                        setUser={setUser}
                        themeMode={themeMode}
                        toggleTheme={toggleTheme}
                    />
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
                                <Route
                                    path='/events'
                                    element={<EventsIndexPage user={user} />}
                                />
                                <Route
                                    path='/events/new'
                                    element={<NewEditEventPage user={user} />}
                                />
                                <Route
                                    path='/events/:id'
                                    element={<EventsShowPage user={user} />}
                                />
                                <Route
                                    path='/events/:id/edit'
                                    element={<NewEditEventPage user={user} />}
                                />
                                <Route
                                    path='/notifications'
                                    element={<NotificationsIndex user={user} />}
                                />
                                <Route
                                    path='/profile'
                                    element={<Profile user={user} />}
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

                        {/* Fallback Route */}
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </main>
                <footer></footer>
            </GoogleMapsProvider>
        </ThemeProvider>
    );
}

export default App;
