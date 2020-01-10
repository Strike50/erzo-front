import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchProfileInfo = username => {
    return dispatch => {
        dispatch(fetchProfileStart());
        axios.get(`/users${username}`)
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
export const fetchFollowing = username => {
    return dispatch => {
        dispatch(fetchFollowingStart());
        axios.get(`/users/follows${username}`)
            .then(res => {
                dispatch(fetchFollowingSuccess(res));
            })
            .catch(error => {
                dispatch(fetchFollowingFail(error));
            })
    }
};

export const fetchFollowingStart = () => {
    return {
        type: actionTypes.FETCH_FOLLOWING_START
    }
};

export const fetchFollowingFail = error => {
    return {
        type: actionTypes.FETCH_FOLLOWING_FAIL,
        errorMessage: error
    }
};

export const fetchFollowingSuccess = response => {
    return {
        type: actionTypes.FETCH_FOLLOWING_SUCCESS,
        followingDetail: response.data
    }
};
export const fetchFollowers = username => {
    return dispatch => {
        dispatch(fetchFollowersStart());
        axios.get(`/users/followers${username}`)
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
export const postFollowSomeoneStart = () => {
    return {
        type: actionTypes.POST_FOLLOWSOMEONE_START
    }
};

export const postFollowSomeoneFail = error => {
    return {
        type: actionTypes.POST_FOLLOWSOMEONE_FAIL,
        errorMessage: error
    }
};

export const postFollowSomeoneSuccess = response => {
    return {
        type: actionTypes.POST_FOLLOWSOMEONE_SUCCESS,
        followSomeoneDetail: response.data
    }
};
export const postFollowSomeone = username => {
    return dispatch => {
        dispatch(postFollowSomeoneStart());
        axios.post(`/subscriptions/${username}`)
            .then(res => {
                dispatch(postFollowSomeoneSuccess(res));
            })
            .catch(error => {
                dispatch(postFollowSomeoneFail(error));
            })
    }
};
export const postUnfollowSomeoneStart = () => {
    return {
        type: actionTypes.POST_UNFOLLOWSOMEONE_START
    }
};

export const postUnfollowSomeoneFail = error => {
    return {
        type: actionTypes.POST_UNFOLLOWSOMEONE_FAIL,
        errorMessage: error
    }
};

export const postUnfollowSomeoneSuccess = response => {
    return {
        type: actionTypes.POST_UNFOLLOWSOMEONE_SUCCESS,
        unfollowSomeoneDetail: response.data
    }
};
export const postUnfollowSomeone = username => {
    return dispatch => {
        dispatch(postUnfollowSomeoneStart());
        axios.delete(`/subscriptions/${username}`)
            .then(res => {
                dispatch(postUnfollowSomeoneSuccess(res));
            })
            .catch(error => {
                dispatch(postUnfollowSomeoneFail(error));
            })
    }
};