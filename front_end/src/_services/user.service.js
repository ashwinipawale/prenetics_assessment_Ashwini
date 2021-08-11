import configData from './config.json';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getProfile,
    getGeneticResult
};

function login(email_id, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_id, password })
    };

    return fetch(`${configData.SERVER_URL}/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getProfile() {
    const token = authHeader()
    const requestOptions = {
        method: 'POST',
        headers: token
    }; 

    return fetch(`${configData.SERVER_URL}/customerInfo`, requestOptions)
        .then(handleResponse)
        .then(profile => { 
            profile["customer_name"] = profile["first_name"] + ' ' +profile["last_name"]
            profile["Date_Of_Birth"] = profile["dob"].split('T')[0]

            delete profile["password"]
            delete profile["first_name"]
            delete profile["last_name"]   
            delete profile["dob"]
            return profile;
        });
}

function getGeneticResult() {
    const token = authHeader()
    const requestOptions = {
        method: 'POST',
        headers: token
    }; 

    return fetch(`${configData.SERVER_URL}/geneticResult`, requestOptions)
        .then(handleResponse)
        .then(genResult => {         
            return genResult;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}