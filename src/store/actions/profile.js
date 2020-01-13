import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchProfile = username => {
    return dispatch => {
        return dispatch(fetchProfileInfo(username))
            .then(res => {
                dispatch(fetchFollowing(res.data.user.id));
                return dispatch(fetchFollowers(res.data.user.id));
        });
    }
};

export const fetchProfileInfo = username => {
    return dispatch => {
        dispatch(fetchProfileStart());
        return axios.get(`/users/${username}`)
            .then(res => {
                dispatch(fetchProfileSuccess(res));
                return res
            })
            .catch(error => {
                dispatch(fetchProfileFail(error));
                return error
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

export const fetchFollowing = id => {
    return dispatch => {
        dispatch(fetchFollowingStart());
        axios.get(`/users/follows/${id}`)
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

export const fetchFollowers = id => {
    return dispatch => {
        dispatch(fetchFollowersStart());
        return axios.get(`/users/followers/${id}`)
            .then(res => {
                dispatch(fetchFollowersSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchFollowersFail(error));
                return error;
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
    console.log('action', response.data);
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

export const postFollowSomeone = id => {
    return async dispatch => {
        dispatch(postFollowSomeoneStart());
        axios.post(`/subscriptions/${id}`)
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

export const postUnfollowSomeone = id => {
    return async dispatch => {
        dispatch(postUnfollowSomeoneStart());
        axios.delete(`/subscriptions/${id}`)
            .then(res => {
                dispatch(postUnfollowSomeoneSuccess(res));
            })
            .catch(error => {
                dispatch(postUnfollowSomeoneFail(error));
            })
    }
};
export const putEditProfileStart = () => {
    return {
        type: actionTypes.PUT_EDITPROFILE_START
    }
};

export const putEditProfileFail = error => {
    return {
        type: actionTypes.PUT_EDITPROFILE_FAIL,
        errorMessage: error
    }
};

export const putEditProfileSuccess = response => {
    return {
        type: actionTypes.PUT_EDITPROFILE_SUCCESS,
        editProfileDetail: response.data
    }
};

export const putEditProfile = user => {
    return async dispatch => {
        dispatch(putEditProfileStart());
        axios.put(`/users`,user)
            .then(res => {
                dispatch(putEditProfileSuccess(res));
            })
            .catch(error => {
                dispatch(putEditProfileFail(error));
            })
    }
};