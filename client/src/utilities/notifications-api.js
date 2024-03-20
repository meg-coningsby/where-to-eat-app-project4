import sendRequest from './send-request';

const BASE_URL = '/api/notifications';

export function fetchNotifications() {
    return sendRequest(`${BASE_URL}/`);
}

export function markNotificationAsRead(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT');
}
