import { API } from '../../../config/config';

export const createUser = user => {
    console.log(API)
    return fetch(`${API}/user/createUser`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json();
    })
        .catch(error => {
            console.log(error.response.error);
        });
};

export const signin = user => {
    return fetch(`${API}/user/signInUser`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error.response.error);
        });
};



export const setData = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('data', JSON.stringify(data));
        next();
    }
};


export const isExist = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('data')) {
        return JSON.parse(localStorage.getItem('data'));
    } else {
        return false;
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('data');
        next();
    }
};