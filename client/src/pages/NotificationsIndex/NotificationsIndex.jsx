import { useEffect, useState } from 'react';
import {
    Typography,
    Container,
    Box,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';

import * as notificationsAPI from '../../utilities/notifications-api';
import NotificationDetail from '../../components/NotificationDetail/NotificationDetail';

export default function NotificationsIndex({ user }) {
    const [allNotifications, setAllNotifications] = useState([]);
    const [filteredNotifications, setFilteredNotifications] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('unread');

    const fetchNotifications = async () => {
        try {
            const fetchedNotifications =
                await notificationsAPI.fetchNotifications();
            setAllNotifications(fetchedNotifications);
            filterNotifications(fetchedNotifications, 'unread');
        } catch (error) {
            console.error('Error fetching notifications:', error);
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
        </Container>
    );
}
