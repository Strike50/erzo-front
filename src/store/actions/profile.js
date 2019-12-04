import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchProfile = () => {
    return dispatch => {
        dispatch(fetchProfileStart());
        axios.get('users/2326187c-a7ed-489a-991b-53d35da2cc28')
            .then(res => {
                dispatch(fetchProfileSuccess(res));
            })
            .catch(error => {
                dispatch(fetchProfileFail(error));
            })
    }
};

export const fetchProfileStart = () => {
    return {
        type: actionTypes.FETCH_PROFILE_START
    }
};

export const fetchProfileFail = error => {
    return {
        type: actionTypes.FETCH_PROFILE_FAIL,
        errorMessage: error
    }
};

export const fetchProfileSuccess = response => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profileDetail: response.data
    }
};
