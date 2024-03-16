import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GoogleMapsProvider } from '@ubilabs/google-maps-react-hooks';

import { AuthPage } from '../AuthPage/AuthPage';
import { getUser } from '../../utilities/users-service';
import { NavBar } from '../../components/NavBar/NavBar';
import Home from '../Home/Home';

import style from './style.module.css';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';
import RestaurantSearchDetailPage from '../RestaurantSearchDetailPage/RestaurantSearchDetailPage';
import ListIndexPage from '../ListIndexPage/ListIndexPage';
import NewListPage from '../NewListPage/NewListPage';
import ListShowPage from '../ListShowPage/ListShowPage';

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
                {user ? (
                    <>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route
                                path='/restaurant'
                                element={<RestaurantSearch />}
                            />
                            <Route
                                path='/restaurant/:id'
                                element={<RestaurantSearchDetailPage />}
                            />
                            <Route
                                path='/lists'
                                element={<ListIndexPage user={user} />}
                            />
                            <Route
                                path='/lists/new'
                                element={<NewListPage user={user} />}
                            />
                            <Route
                                path='/lists/:id'
                                element={<ListShowPage user={user} />}
                            />
                            <Route
                                path='*'
                                element={<Navigate to='/' replace />}
                            />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/restaurant'
                            element={<RestaurantSearch />}
                        />
                        <Route
                            path='/restaurant/:id'
                            element={<RestaurantSearchDetailPage />}
                        />
                        <Route
                            path='/auth'
                            element={<AuthPage setUser={setUser} />}
                        />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                )}
            </main>
            <footer></footer>
        </GoogleMapsProvider>
    );
}

export default App;
