import sendRequest from './send-request';

const BASE_URL = '/api/notifications';

// fetch all a user's notifications
export function fetchNotifications() {
    return sendRequest(`${BASE_URL}/`);
}

// mark a user's notification as read
export function markNotificationAsRead(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT');
}
