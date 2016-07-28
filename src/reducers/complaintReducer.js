import * as types from '../actions/actionTypes';

export default function complaintReducer(state = [], action) {
    switch(action.type) {
        case types.GET_FASTEST_COMPLAINT:
            return [Object.assign({}, action.complaintData)];
        default:
            return state;
    }
}