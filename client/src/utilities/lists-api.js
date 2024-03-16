import sendRequest from './send-request';

// fetch user's lists
export function fetchLists() {
    return sendRequest('/api/lists');
}

// fetch all public lists
export function fetchPublicLists() {
    return sendRequest('/api/lists/public');
}

// add a list
export function addAList(listData) {
    return sendRequest('/api/lists', 'POST', listData);
}

// show a list
export function fetchList(id) {
    return sendRequest(`/api/lists/${id}`);
}

// update a list
export function updateList(id, listData) {
    return sendRequest(`/api/lists/${id}`, 'PUT', listData);
}

// delete a list
export function deleteList(id) {
    return sendRequest(`/api/lists/${id}`, 'DELETE');
}
