import sendRequest from './send-request';

// fetch all a user's restaurants
export function fetchRestaurants() {
    return sendRequest('/api/myrestaurants');
}

// add restaurant to a list
export function addRestaurantToList(listId, googlePlaceId, name, address) {
    return sendRequest(`/api/myrestaurants`, 'POST', {
        listId,
        googlePlaceId,
        name,
        address,
    });
}

// delete a restaurant from a list
export function deleteRestaurantFromList(listId, restaurantId) {
    return sendRequest(
        `/api/myrestaurants/${listId}/${restaurantId}`,
        'DELETE'
    );
}

// update a restaurant to visited
export function toggleVisited(restaurantId, visited) {
    const body = {
        visited: !visited, // Toggle the visited status
    };
    return sendRequest(`/api/myrestaurants/${restaurantId}`, 'PUT', body);
}
