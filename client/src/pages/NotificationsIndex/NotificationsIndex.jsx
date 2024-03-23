import { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Alert,
} from '@mui/material';

import * as notificationsAPI from '../../utilities/notifications-api';
import NotificationDetail from '../../components/NotificationDetail/NotificationDetail';
import { usePageTitle } from '../../hooks/usePageTitle/usePageTitle';

export default function NotificationsIndex({ user }) {
    usePageTitle(`Notifications`);
    const [allNotifications, setAllNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('unread');
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        setError(null);
        try {
            const fetchedNotifications =
                await notificationsAPI.fetchNotifications();
            setAllNotifications(fetchedNotifications);
            filterNotifications(fetchedNotifications, 'unread');
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError(
                'An error occcured when fetching notifications. Please refresh the page to try again.'
            );
        }
    };

    // Setting up http polling
    const POLLING_INTERVAL = 10000; // 10 seconds

    useEffect(() => {
        fetchNotifications();

        // Set up polling
        const interval = setInterval(fetchNotifications, POLLING_INTERVAL);

        // Clean up on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        filterNotifications(allNotifications, selectedFilter);
    }, [allNotifications, selectedFilter]);

    const filterNotifications = (notifications, filter) => {
        if (filter === 'unread') {
            setFilteredNotifications(
                notifications.filter((notification) => !notification.read)
            );
        } else {
            setFilteredNotifications(notifications);
        }
    };

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) {
            setSelectedFilter(newFilter);
        }
    };

    return (
        <Container>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                mt={4}>
                <Typography variant='h4' component='h1' gutterBottom>
                    Notifications
                </Typography>
                <ToggleButtonGroup
                    value={selectedFilter}
                    exclusive
                    onChange={handleFilterChange}
                    aria-label='Filter events'
                    size='small'
                    style={{ marginBottom: '16px', marginTop: '20px' }}>
                    <ToggleButton value='unread'>Unread</ToggleButton>
                    <ToggleButton value='all'>All</ToggleButton>
                </ToggleButtonGroup>
                {filteredNotifications.map((notification, index) => (
                    <NotificationDetail
                        key={index}
                        user={user}
                        notification={notification}
                        fetchNotifications={fetchNotifications}
                    />
                ))}
            </Box>
            {error && (
                <Box mb={2}>
                    <Alert severity='error'>{error}</Alert>
                </Box>
            )}
        </Container>
    );
}
