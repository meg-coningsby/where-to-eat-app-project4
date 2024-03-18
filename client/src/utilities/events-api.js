import sendRequest from './send-request';

// fetch user's owned events
export function fetchOwnedEvent() {
    return sendRequest('/api/events');
}

// fetch all invited events
export function fetchInvitedEvent() {
    return sendRequest('/api/events/invited');
}

// create an event
export function createEvent(eventData) {
    return sendRequest('/api/events', 'POST', eventData);
}

// show an event
export function fetchEvent(id) {
    return sendRequest(`/api/events/${id}`);
}

// update an event
export function updateEvent(id, eventData) {
    return sendRequest(`/api/events/${id}`, 'PUT', eventData);
}

// delete a list
export function deleteEvent(id) {
    return sendRequest(`/api/events/${id}`, 'DELETE');
}

// accept an event
export function acceptEvent(id, userID) {
    return sendRequest(`/api/events/${id}/accept`, 'PUT', userID);
}

// decline an event
export function declineEvent(id, userID) {
    return sendRequest(`/api/events/${id}/decline`, 'PUT', userID);
}
