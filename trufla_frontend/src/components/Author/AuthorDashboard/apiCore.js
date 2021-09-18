import { API } from '../../../config/config';


export const createArticle = article => {
    console.log(article)
    return fetch(`${API}/article/createArticle`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error.response.error);
        });
};

