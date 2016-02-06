import fetch from 'isomorphic-fetch'
import {
    REQUEST_LOADING_SIMILAR, RECEIVE_SIMILAR, OFFER_MOVIE
} from './actionTypes'

export function requestLoadingSimilar(movieId) {
    return {
        type: REQUEST_LOADING_SIMILAR,
        movieId
    }
}

export function receiveSimilar(json) {
    console.log(json);
    return {
        type: RECEIVE_SIMILAR,
        movies: json.results,
        base_url: json.base_url,
        poster_size: json.poster_size
    }
}

export function offerMovie() {
    return {
        type: OFFER_MOVIE
    }
}

export function loadSimilar(movieId) {
    return function (dispatch) {
        dispatch(requestLoadingSimilar(movieId));

        return fetch(`/api/discover?id=${movieId}`)
            .then(response => response.json())
            .then(json => dispatch(receiveSimilar(json)));
    }
}