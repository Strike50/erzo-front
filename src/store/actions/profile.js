import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchProfile = () => {
    return dispatch => {
        dispatch(fetchProfileStart());
        axios.get('/users/me')
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
export const fetchFollowers = () => {
    return dispatch => {
        dispatch(fetchFollowersStart());
        axios.get('/users/followers/')
            .then(res => {
                dispatch(fetchFollowersSuccess(res));
            })
            .catch(error => {
                dispatch(fetchFollowersFail(error));
            })
    }
};

export const fetchFollowersStart = () => {
    return {
        type: actionTypes.FETCH_FOLLOWERS_START
    }
};

export const fetchFollowersFail = error => {
    return {
        type: actionTypes.FETCH_FOLLOWERS_FAIL,
        errorMessage: error
    }
};

export const fetchFollowersSuccess = response => {
    return {
        type: actionTypes.FETCH_FOLLOWERS_SUCCESS,
        followersDetail: response.data
    }
};