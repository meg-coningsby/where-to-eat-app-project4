import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { logout } from '../../utilities/users-service';

// Material UI Components | Start
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AccountCircle from '@mui/icons-material/AccountCircle';
// Material UI Components | End

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
        Restaurants: '/restaurants',
        'My Lists': '/lists',
        'Public Lists': '/lists/public',
        'My Visits': '/visited',
        Login: '/auth',
    };

    const userActions = user
        ? { Logout: handleLogout }
        : { Login: () => navigate('/auth') };

    let pages = user
        ? ['Restaurants', 'My Lists', 'Public Lists', 'My Visits']
        : ['Restaurants', 'Public Lists'];

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
                    />
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
                    <AdbIcon
                        sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
                    />
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
                        <Tooltip title='Open settings'>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}>
                                <Avatar sx={{ bgcolor: 'secondary.main' }}>
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
// <nav>
//     {user ? (
//         <>
//             <Link to='/'>Home</Link>
//             &nbsp; | &nbsp;
//             <Link to='/restaurants'>Search Restaurants</Link>
//             &nbsp; | &nbsp;
//             <Link to='/lists'>My Lists</Link>
//             &nbsp; | &nbsp;
//             <Link to='/lists/public'>Public Lists</Link>
//             &nbsp; | &nbsp;
//             <Link to='/visited'>My Visits</Link>
//             &nbsp; | &nbsp;
//             <Link
//                 to=''
//                 onClick={() => {
//                     logout();
//                     setUser(null);
//                 }}>
//                 Logout
//             </Link>
//         </>
//     ) : (
//         <>
//             <Link to='/auth'>Login</Link>
//             &nbsp; | &nbsp;
//             <Link to='/restaurants'>Search Restaurants</Link>
//             &nbsp; | &nbsp;
//             <Link to='/lists/public'>Public Lists</Link>
//         </>
//     )}
// </nav>
