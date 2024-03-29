import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
    Badge,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';

import * as notificationsAPI from '../../utilities/notifications-api';

export function NavBar({ user, setUser, themeMode, toggleTheme }) {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

    const themeToggleLabel =
        themeMode === 'dark' ? 'Change to Light Mode' : 'Change to Dark Mode';

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        handleCloseUserMenu();
        navigate('/');
    };

    const pageRoutes = {
        Search: '/restaurants',
        Lists: '/lists',
        'Public Lists': '/lists/public',
        Visited: '/visited',
        Login: '/auth',
        Events: '/events',
    };

    const userActions = user
        ? {
              Profile: () => navigate('/profile'),
              [themeToggleLabel]: toggleTheme,
              Logout: handleLogout,
          }
        : { Login: () => navigate('/auth') };

    let pages = user
        ? ['Search', 'Lists', 'Public Lists', 'Visited', 'Events']
        : ['Search', 'Public Lists'];

    // Setting up http polling
    const POLLING_INTERVAL = 10000; // 10 seconds

    useEffect(() => {
        // If there's no user logged in, do not fetch notifications
        if (!user) {
            return;
        }

        const fetchUnreadNotifications = async () => {
            try {
                const fetchedNotifications =
                    await notificationsAPI.fetchNotifications();
                const unreadCount = fetchedNotifications.filter(
                    (notification) => !notification.read
                ).length;
                setUnreadNotificationsCount(unreadCount);
            } catch (error) {
                console.error('Error fetching unread notifications:', error);
            }
        };

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchUnreadNotifications();
            }
        };

        // Fetch unread notifications initially
        fetchUnreadNotifications();

        // Set up polling
        const intervalId = setInterval(
            fetchUnreadNotifications,
            POLLING_INTERVAL
        );

        // Add event listener for visibility change (if the tab is hidden or not viewed)
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Clean up on component unmount
        return () => {
            clearInterval(intervalId);
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
        };
    }, [user]);

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={RouterLink}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        WHERE TO EAT
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}>
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        navigate(pageRoutes[page]);
                                        handleCloseNavMenu();
                                    }}>
                                    <Typography textAlign='center'>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                }}>
                                <RouterLink
                                    to={pageRoutes[page]}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}>
                                    {page}
                                </RouterLink>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {user && (
                            <Tooltip title='View notifications'>
                                <IconButton
                                    component={RouterLink}
                                    to='/notifications'
                                    sx={{ color: 'inherit', mr: 0.5 }}>
                                    <Badge
                                        badgeContent={unreadNotificationsCount}
                                        color='secondary'>
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        )}
                        <Tooltip title='Open settings'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0, color: 'inherit' }}>
                                <AccountCircle />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id='menu-appbar'
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {Object.keys(userActions).map((action) => (
                                <MenuItem
                                    key={action}
                                    onClick={() => {
                                        if (action === themeToggleLabel) {
                                            toggleTheme();
                                        } else {
                                            userActions[action]();
                                        }
                                        handleCloseUserMenu();
                                    }}>
                                    <Typography textAlign='center'>
                                        {action}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
