import types from './types';
import axios from 'axios';

export const getSearchResult = () => {
    return {
        type: types.GET_SEARCH_RESULT
    }
}

export const submitSearch = data => async dispatch => {
    try {
        const resp = await axios.get(`/api/getGooglePlacesData?city=${data.city}&&gymType=${data.gymType}`)
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: resp.data
        })
    } catch (error) {
        dispatch({
            type: types.SUBMIT_SEARCH,
            payload: error.message
        })
        console.log('yeah, you got here',error);                    
    }
}