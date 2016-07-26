import {combineReducers} from 'redux';
import data from './dataReducer';
import complaintData from './complaintReducer';

const rootReducer = combineReducers({
    data,
    complaintData
});

export default rootReducer;