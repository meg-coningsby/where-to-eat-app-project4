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
