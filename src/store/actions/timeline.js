import axios from "axios";
import * as actionTypes from "./actionTypes";

export const fetchTimeline = () => {
    return dispatch => {
        dispatch(fetchTimelineStart());
        axios.get('http://localhost:3000/posts/timeline')
            .then(res => {
                dispatch(fetchTimelineSuccess(res));
            })
            .catch(error => {
                dispatch(fetchTimelineFail(error));
            })
    }
};

export const fetchTimelineStart = () => {
    return {
        type: actionTypes.FETCH_TIMELINE_START
    }
};

export const fetchTimelineFail = error => {
    return {
        type: actionTypes.FETCH_TIMELINE_FAIL,
        errorMessage: error
    }
};

export const fetchTimelineSuccess = response => {
    return {
        type: actionTypes.FETCH_TIMELINE_SUCCESS,
        profileDetail: response.data
    }
};