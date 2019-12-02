import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchProfile = () => {
    console.log('oui');
    return dispatch => {
        console.log('azeaze');
        dispatch(fetchProfileStart());
        console.log('non');
        return axios.get('http://localhost:3000/users/2326187c-a7ed-489a-991b-53d35da2cc28')
            .then(res => {
                console.log(res);
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

export const fetchProfileSuccess = profile => {
    return {
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile: profile
    }
};