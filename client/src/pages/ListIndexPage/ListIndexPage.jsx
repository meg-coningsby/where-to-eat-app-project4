import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Typography, Container, Box, Button } from '@mui/material';

import ListList from '../../components/ListList/ListList';
import * as listsAPI from '../../utilities/lists-api';

export default function ListIndexPage({ user }) {
    const [lists, setLists] = useState([]);
    const location = useLocation();

    const fetchLists = async () => {
        try {
            let lists;
            // Check the current pathname and decide which API call to make
            if (location.pathname === '/lists/public') {
                lists = await listsAPI.fetchPublicLists();
                // Optionally, set the page title or make other UI adjustments here
            } else {
                lists = await listsAPI.fetchLists(); // User's private lists
            }
            setLists(lists);
        } catch (error) {
            console.error('Error fetching the lists: ', error);
        }
    };

    useEffect(() => {
        fetchLists();
    }, [location.pathname]); // Re-fetch lists if the path changes

    // Adjust the page title based on the path
    const pageTitle =
        location.pathname === '/lists/public' ? 'Public Lists' : 'Your Lists';
    const pageSubTitle =
        location.pathname === '/lists/public'
            ? 'Browse all public lists.'
            : "All the lists you've created and the eateries you've saved.";

    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    {pageTitle}
                </Typography>
                <Typography variant='h6' component='h3' gutterBottom>
                    {pageSubTitle}
                </Typography>
                {location.pathname !== '/lists/public' && (
                    <Link to={'/lists/new'} style={{ textDecoration: 'none' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{ marginTop: '16px' }}>
                            {' '}
                            Add a New List
                        </Button>
                    </Link>
                )}
                <ListList lists={lists} />
            </Box>
        </Container>
    );
}
