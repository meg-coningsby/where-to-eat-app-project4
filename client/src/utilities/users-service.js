import { createUser, login as loginAPI } from './users-api';

export async function signUp(userData) {
    // Use the users API to create a new user
    const token = await createUser(userData);

    localStorage.setItem('token', token);

    return getUser();
}

export async function login(userData) {
    const token = await loginAPI(userData);

    localStorage.setItem('token', token);

    return getUser();
}

export function logout() {
    // What does this function do? // think about it
    localStorage.removeItem('token');
}

// When the page first loads
export function getToken() {
    // getItem returns null if there's no string
    const token = localStorage.getItem('token');
    if (!token) return null;
    // Obtain the payload of the token
    const payload = JSON.parse(atob(token.split('.')[1]));

    // A JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken();
    // If there's a token, return the user in the payload, otherwise return null
    return token ? JSON.parse(atob(token.split('.')[1])) : null;
}
