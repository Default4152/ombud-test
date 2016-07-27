import * as types from './actionTypes';
import DataApi from '../api/dataApi';

export function getInitialData(data) {
    return {type: types.GET_INITIAL_DATA, data};
}

export function updateStateData(stateData) {
    return {type: types.UPDATE_STATE_SUCCESS, stateData};
}

export function updateComplaintData(complaintData) {
    return {type: types.GET_FASTEST_COMPLAINT, complaintData}
}

export function updateBirthData(birthData) {
    return {type: types.GET_BIRTH_DATA, birthData}
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

export function getComplaintData(complaint) {
    return function (dispatch, getState) {
        return DataApi.getComplaintData(complaint).then(complaintData => {
            return complaintData.json();
        }).then(complaintData => {
            dispatch(updateComplaintData(complaintData));
            console.log('state:::', getState());
        }).catch(error => {
            throw(error);
        });
    }
}

export function getBirthData(company) {
    return function (dispatch, getState) {
        return DataApi.getBirthData(company).then(birthData => {
            return birthData.json();
        }).then(birthData => {
            dispatch(updateBirthData(birthData));
        }).catch(error => {
            throw(error);
        });
    }
}