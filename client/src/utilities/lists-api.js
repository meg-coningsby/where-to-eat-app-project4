import sendRequest from './send-request';

// fetch lists
export function fetchLists() {
    return sendRequest('/api/lists');
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
