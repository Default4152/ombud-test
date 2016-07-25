import * as types from '../actions/actionTypes';

export default function dataReducer(state = [], action) {
    switch(action.type) {
        case types.GET_INITIAL_DATA:
            return action.data;
        case types.UPDATE_STATE_SUCCESS:
            return action.stateData;
        default:
            return state;
    }
}