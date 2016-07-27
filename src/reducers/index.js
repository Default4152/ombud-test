import {combineReducers} from 'redux';
import data from './dataReducer';
import complaintData from './complaintReducer';
import birthData from './birthReducer';

const rootReducer = combineReducers({
    data,
    complaintData,
    birthData
});

export default rootReducer;