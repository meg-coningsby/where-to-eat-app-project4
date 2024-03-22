import sendRequest from './send-request';

const BASE_URL = `/api/users`;

export async function allButCurrentUser() {
    return sendRequest(BASE_URL);
}

// create a new user
export async function createUser(userData) {
    return sendRequest(BASE_URL, 'POST', userData);
}

// login a user
export async function login(userData) {
    return sendRequest(`${BASE_URL}/login`, 'POST', userData);
}

// check a user's token
export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}
