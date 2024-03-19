import sendRequest from './send-request';

// fetch user's owned events
export function fetchOwnedEvent() {
    return sendRequest('/api/events');
}

// fetch all invited events
export function fetchInvitedEvent() {
    return sendRequest('/api/events/invited');
}

// fetch all owned & invited events
export function fetchOwnedAndInvitedEvent() {
    return sendRequest('/api/events/allevents');
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

// delete an event
export function deleteEvent(id) {
    return sendRequest(`/api/events/${id}`, 'DELETE');
}

// accept an event
export function acceptEvent(id, userID) {
    const payload = { userId: userID }; // Adjust this line
    return sendRequest(`/api/events/${id}/accept`, 'PUT', payload);
}

// decline an event
export function declineEvent(id, userID) {
    const payload = { userId: userID }; // And this one
    return sendRequest(`/api/events/${id}/decline`, 'PUT', payload);
}
