import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as notificationsAPI from '../../utilities/notifications-api';

export default function NotificationDetail({
    user,
    notification,
    fetchNotifications,
}) {
    const navigate = useNavigate();
    console.log(notification);

    const eventDate = new Date(notification.event.date).toLocaleDateString(
        'en-AU',
        {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }
    );

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationsAPI.markNotificationAsRead(notificationId);
            fetchNotifications();
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const renderNotificationContent = () => {
        switch (notification.type) {
            case 'invite':
                return `You have been invited to ${notification.event.title} at ${notification.event.location.name} on ${eventDate}.`;
            case 'inviteAccepted':
                return `One of your invitees has accepted your invite to ${notification.event.title}.`;
            case 'inviteDecline':
                return `One of your invitees has declined your invite to ${notification.event.title}.`;
            default:
                return '';
        }
    };

    return (
        <Card
            variant='outlined'
            style={{ width: '100%', marginBottom: '16px' }}>
            <CardContent>
                <Typography variant='body1' color='textPrimary'>
                    {renderNotificationContent()}
                </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    size='small'
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/events/${notification.event._id}`);
                    }}>
                    {' '}
                    View Event
                </Button>
                {!notification.read && (
                    <Button
                        size='small'
                        color='error'
                        onClick={() => handleMarkAsRead(notification._id)}>
                        Mark as Read
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}
