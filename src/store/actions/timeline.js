import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

const signal = axios.CancelToken.source();

export const fetchTimeline = () => {
    return dispatch => {
        dispatch(fetchTimelineStart());
        return axios.get('/posts/timeline', {cancelToken: signal.token} )
            .then(res => {
                dispatch(fetchTimelineSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchTimelineFail(error));
                return error;
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
        listPost: response.data.posts
    }
};

export const fetchOwnTimeline = idUser => {
    return dispatch => {
        dispatch(fetchOwnTimelineStart());
        axios.get(`/posts/user/${idUser}`,{cancelToken: signal.token} )
            .then(res => {
                dispatch(fetchOwnTimelineSuccess(res));
            })
            .catch(error => {
                dispatch(fetchOwnTimelineFail(error));
            })
    }
};

export const fetchOwnTimelineStart = () => {
    return {
        type: actionTypes.FETCH_OWN_TIMELINE_START
    }
};

export const fetchOwnTimelineFail = error => {
    return {
        type: actionTypes.FETCH_OWN_TIMELINE_FAIL,
        errorMessage: error
    }
};

export const fetchOwnTimelineSuccess = response => {
    return {
        type: actionTypes.FETCH_OWN_TIMELINE_SUCCESS,
        listOwnPost: response.data.posts
    }
};
