import { API } from '../../../config/config';

export const createAuthor = author => {
    console.log(API)
    return fetch(`${API}/author/createAuthor`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
    }).then(response => {
        return response.json();
    })
        .catch(error => {
            console.log(error.response.error);
        });
};

export const signinAuthor = user => {
    return fetch(`${API}/author/signInAuthor`, {
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

