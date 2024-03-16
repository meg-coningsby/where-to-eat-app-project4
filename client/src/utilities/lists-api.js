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

// update a list

// delete a list
