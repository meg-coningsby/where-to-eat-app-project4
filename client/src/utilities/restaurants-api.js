import sendRequest from './send-request';

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

    // Call sendRequest with the updated parameters and body
    return sendRequest(`/api/myrestaurants/${restaurantId}`, 'PUT', body);
}
