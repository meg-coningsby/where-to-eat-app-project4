import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from '../AuthPage';
import { getUser } from '../../utilities/users-service';
import { NavBar } from '../../components/NavBar/NavBar';
import Home from '../Home/Home';

import style from './style.module.css';
import RestaurantSearch from '../RestaurantSearch/RestaurantSearch';

function App() {
    const [user, setUser] = useState(() => {
        return getUser();
    });

    return (
        <>
            <main className='App'>
                {user ? (
                    <>
                        <header>
                            <NavBar user={user} setUser={setUser} />
                        </header>
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Navigate to='/restaurantsearch' replace />
                                }
                            />
                            <Route
                                path='/orders/new'
                                element={<NewOrderPage />}
                            />
                            <Route
                                path='/orders'
                                element={<OrderHistoryPage />}
                            />
                            <Route
                                path='/restaurantsearch'
                                element={<RestaurantSearch />}
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
                            path='/restaurantsearch'
                            element={<RestaurantSearch />}
                        />
                        <Route path='/auth' element={<AuthPage />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                )}
            </main>
            <footer></footer>
        </>
    );
}

export default App;
