import types from '../actions/types';

const DEFAULT_STATE = {
    locationList: null
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.SUBMIT_SEARCH:
            return { ...state, locationList: action };
        case types.GET_SEARCH_RESULT:
        default:
            return state;
    }
}