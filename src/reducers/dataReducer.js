import * as types from '../actions/actionTypes';

export default function dataReducer(state = [], action) {
    switch(action.type) {
        case types.GET_INITIAL_DATA:
            return [Object.assign({}, {value: action.data})];
        case types.UPDATE_STATE_SUCCESS:
            return [Object.assign({}, {value: action.stateData})];
        default:
            return state;
    }
}