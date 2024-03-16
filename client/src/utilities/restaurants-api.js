import sendRequest from './send-request';

// add restaurant to a list
export function addRestaurantToList(listId, googlePlaceId) {
    return sendRequest(`/api/myrestaurants`, 'POST', {
        listId,
        googlePlaceId,
    });
}

// show a restaurant from a list
// export function fetchRestaurantFromList(restaurantId) {
//     // If the API endpoint remains the same for fetching restaurant details
//     return sendRequest(`/api/restaurants/${restaurantId}`);
// }

// delete a restaurant from a list
export function deleteRestaurantFromList(listId, restaurantId) {
    return sendRequest(`/api/myrestaurants/${restaurantId}`, 'DELETE', {
        listId,
    });
}
