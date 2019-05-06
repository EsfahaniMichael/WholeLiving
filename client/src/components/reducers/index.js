import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import searchReducer from './searchReducer.js';

const rootReducer = combineReducers({
    search: searchReducer,
    form: formReducer
});


export default rootReducer;