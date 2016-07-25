import * as types from './actionTypes';
import DataApi from '../api/dataApi';

export function getInitialData(data) {
    return {type: types.GET_INITIAL_DATA, data};
}

export function updateStateData(stateData) {
    return {type: types.UPDATE_STATE_SUCCESS, stateData};
}

export function loadInitialData() {
    return function(dispatch, getState) {
        return DataApi.getInitialData().then(data => {
            return data.json();
        }).then(data => {
            dispatch(getInitialData(data));
        }).catch(error => {
            throw(error);
        });
    };
}

export function getStateData(state) {
    return function (dispatch, getState) {
        return DataApi.getStateComplaintData(state).then(stateData => {
            return stateData.json();
        }).then(stateData => {
            dispatch(updateStateData(stateData));
        }).catch(error => {
            throw(error);
        });
    }
}