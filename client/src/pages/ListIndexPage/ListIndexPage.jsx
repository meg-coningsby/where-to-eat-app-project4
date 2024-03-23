import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container, Box, Button, Alert } from '@mui/material';

import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';
import ListList from '../../components/ListList/ListList';
import * as listsAPI from '../../utilities/lists-api';

export default function ListIndexPage({ user }) {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

    const fetchLists = async () => {
        try {
            let lists;
            // Check the current pathname and decide which API call to make
            if (location.pathname === '/lists/public') {
                lists = await listsAPI.fetchPublicLists();
            } else {
                lists = await listsAPI.fetchLists();
            }
            setLists(lists);
        } catch (error) {
            console.error('Error fetching the lists: ', error);
            setError(
                'Error fetching the lists. Please refresh the page to try again.'
            );
        }
    };

    useEffect(() => {
        fetchLists();
    }, [location.pathname]);

    // Adjust the page title based on the path
    const pageTitle =
        location.pathname === '/lists/public' ? 'Public Lists' : 'Saved Lists';
    const pageSubTitle =
        location.pathname === '/lists/public'
            ? 'Get inspired and browse through lists other users have created.'
            : "Create lists to save all the places you'd want to visit or even just return to. You can also mark any saved restaurants as 'visited' or use them to create events to invite your friends to try something new.";

    usePageTitle(pageTitle);

    return (
        <Container maxWidth='md'>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {pageTitle}
                </Typography>
                <Typography
                    variant='h6'
                    component='h3'
                    gutterBottom
                    style={{ textAlign: 'center' }}>
                    {pageSubTitle}
                </Typography>
                {location.pathname !== '/lists/public' && user && (
                    <Link to={'/lists/new'} style={{ textDecoration: 'none' }}>
                        <Button
                            variant='contained'
                            color='secondary'
                            style={{ marginTop: '16px' }}>
                            Add a New List
                        </Button>
                    </Link>
                )}
                {error && (
                    <Box mb={2}>
                        <Alert severity='error'>{error}</Alert>
                    </Box>
                )}
                <ListList lists={lists} user={user} />
            </Box>
        </Container>
    );
}
