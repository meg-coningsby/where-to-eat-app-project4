import * as React from 'react';
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
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Badge,
} from '@mui/material';
import {
    Menu as MenuIcon,
    AccountCircle,
    RestaurantMenu as RestaurantMenuIcon,
    Notifications as NotificationsIcon,
} from '@mui/icons-material';

export function NavBar({ user, setUser }) {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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
        'Search Restaurants': '/restaurants',
        Lists: '/lists',
        'Public Lists': '/lists/public',
        'Visited Restaurants': '/visited',
        Login: '/auth',
        Events: '/events',
    };

    const userActions = user
        ? {
              Profile: () => navigate('/profile'),
              Logout: handleLogout,
          }
        : { Login: () => navigate('/auth') };

    let pages = user
        ? [
              'Search Restaurants',
              'Lists',
              'Public Lists',
              'Visited Restaurants',
              'Events',
          ]
        : ['Restaurants', 'Public Lists'];

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <RouterLink
                        to='/'
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        <RestaurantMenuIcon
                            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                        />
                    </RouterLink>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href=''
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
                                    onClick={handleCloseNavMenu}>
                                    <Typography textAlign='center'>
                                        <RouterLink
                                            to={pageRoutes[page]}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'inherit',
                                            }}>
                                            {page}
                                        </RouterLink>
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
                        <Tooltip title='View notifications'>
                            <IconButton
                                component={RouterLink}
                                to='/notifications'
                                sx={{ color: 'inherit', mr: 0.5 }}>
                                <Badge badgeContent={0} color='secondary'>
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Open settings'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    <AccountCircle />
                                </Avatar>
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
                                        userActions[action]();
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
