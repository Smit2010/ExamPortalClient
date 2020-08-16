import { combineReducers } from 'redux';
import auth from './auth'
import drawer from './drawer'
import question from './question'

export default combineReducers({
    auth,
    drawer,
    question
});
