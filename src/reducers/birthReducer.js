import * as types from '../actions/actionTypes';

export default function birthReducer(state = [], action) {
    switch(action.type) {
        case types.GET_BIRTH_DATA:
            return action.birthData;
        default:
            return state;
    }
}