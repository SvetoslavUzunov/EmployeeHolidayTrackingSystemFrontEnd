import * as request from '../utility/requester';
import * as userConstants from '../constants/userConstants';

const usersUrl = userConstants.UsersUrl;

export const getByIdAsync = async (userId) => {
    return await fetch(`${usersUrl}/GetById/${userId}`)
        .then(res => res.json());
};

export const getAllAsync = () => request.get(`${usersUrl}/GetAll`);

export const removeAsync = async (userId, token) => {
    return await fetch(`${usersUrl}/DeleteById/${userId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });
};

export const editAsync = (userData) => request.put(`${usersUrl}/Edit`, userData);

export const getCurrentlyLogged = async (auth) => {
    let allUsers = await getAllAsync();

    let currentlyLoggedUser = allUsers.filter(user => user.email == auth.email);

    return currentlyLoggedUser[0];
} 