import * as authenticationConstants from '../constants/authenticationConstants';

const localUserInfo = 'userName';
const authenticationUrl = authenticationConstants.AuthenticationUrl;

export const registerAsync = async (userName, email, password) => {
    let response = await fetch(`${authenticationUrl}/Register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ userName, email, password })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
}

export const loginAsync = async (email, password) => {
    let response = await fetch(`${authenticationUrl}/Login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await response.json();

    if (!response.ok) {
        throw jsonResult.errors;
    } else {
        return jsonResult;
    }
}

export const logoutAsync = async (refreshToken) => {
    return await fetch(`${authenticationUrl}/Logout`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': refreshToken,
        },
        body: JSON.stringify(refreshToken)
    });
}

export const getUser = () => localStorage.getItem(localUserInfo);

export const isAuthenticated = () => Boolean(getUser());