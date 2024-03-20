import sendRequest from './send-request';

// see all my restaurant visits
export function fetchVisits() {
    return sendRequest('/api/visited');
}

// add restaurant from your lists to visited
export function addRestaurantToVisited(visitedData) {
    return sendRequest(`/api/visited`, 'POST', visitedData);
}

// add restaurant from search to visited
export function addRestaurantFromSearchToVisited(visitedData) {
    return sendRequest(`/api/visited/search`, 'POST', visitedData);
}

// delete a restaurant from visited
export function deleteRestaurantFromVisited(restaurantId) {
    return sendRequest(`/api/visited/${restaurantId}`, 'DELETE');
}
