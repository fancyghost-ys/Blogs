import { API } from '../../config/config'
import queryString from "query-string"

export const getArticleById = (id) => {
    return fetch(`${API}/article/getArticle/${id}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};

export const getAllArticles = () => {
    return fetch(`${API}/article/getAllArticles`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error.response.error));
};


export const searchByAuthorName = (params) => {
    const query = queryString.stringify(params);
    console.log(query)
    return fetch(`${API}/article/searchByAuthorName?${query}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
}

export const getTopArticle = () => {
    return fetch(`${API}/others/sortArticleByThumbs`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error.response.error));
};

export const searchArticleOptions = async (params) => {
    const query = queryString.stringify(params);
    console.log(query)
    return fetch(`${API}/article/searchArticle?${query}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error.response.error));
}


export const getAllAuthors = () => {
    return fetch(`${API}/author/getAllAuthors`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error.response.error));
}


export const thumbsUpArticle = async (articleId, userId) => {
    return fetch(`${API}/others/thumbsUp/${articleId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error.response.error);
        });
}


export const AddCommentToArticle = async (articleId, userId, comment) => {
    return fetch(`${API}/others/addComments/${articleId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error.response.error);
        });

}


