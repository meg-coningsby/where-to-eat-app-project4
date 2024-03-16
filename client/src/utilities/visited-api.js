import sendRequest from './send-request';

// add restaurant to visited
export function addRestaurantToVisited(visitedData) {
    return sendRequest(`/api/visited`, 'POST', visitedData);
}

// delete a restaurant from visited
export function deleteRestaurantFromVisited(restaurantId) {
    return sendRequest(`/api/visited/${restaurantId}`, 'DELETE');
}
