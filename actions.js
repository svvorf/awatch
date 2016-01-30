import fetch from 'isomorphic-fetch'
export const REQUEST_SEARCH = 'REQUEST_SEARCH';
function requestSearch(query) {
    return {
        type: REQUEST_SEARCH,
        query
    }
}

export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
function receiveSearchResult(json) {
    return {
        type: RECEIVE_SEARCH_RESULT,
        movies: json.results,
        base_url: json.base_url,
        poster_size: json.poster_size
    }
}


export function performSearch(query) {
    return function (dispatch) {
        dispatch(requestSearch(query));

        return fetch(`/api/search/?query=${query}`)
            .then(response => response.json())
            .then(json =>
                dispatch(receiveSearchResult(json))
            )
    }
}
