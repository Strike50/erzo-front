import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

const signal = axios.CancelToken.source();

export const fetchProfile = username => {
    return dispatch => {
        return dispatch(fetchProfileInfoByUsername(username))
            .then(res => {
                dispatch(fetchFollowing(res.data.user.id));
                dispatch(fetchFollowers(res.data.user.id));
                return res;
        });
    }
};

export const fetchProfileInfoByUsername = username => {
    return dispatch => {
        dispatch(fetchProfileStart());
        return axios.get(`/users?username=${username}`, {cancelToken: signal.token})
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

export const fetchProfileInfoById = id => {
    return dispatch => {
        dispatch(fetchProfileStart());
        return axios.get(`/users?id=${id}`, {cancelToken: signal.token})
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
        axios.get(`/users/follows/${id}`, {cancelToken: signal.token})
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
        return axios.get(`/users/followers/${id}`, {cancelToken: signal.token})
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
    return {
        type: actionTypes.FETCH_FOLLOWERS_SUCCESS,
        followersDetail: response.data
    }
};

export const postFollowSomeone = id => {
    return async dispatch => {
        dispatch(postFollowSomeoneStart());
        return axios.post(`/subscriptions/${id}`, null, {cancelToken: signal.token})
            .then(res => {
                dispatch(postFollowSomeoneSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(postFollowSomeoneFail(error));
                return error;
            })
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

export const postUnfollowSomeone = id => {
    return async dispatch => {
        dispatch(postUnfollowSomeoneStart());
        return axios.delete(`/subscriptions/${id}`, {cancelToken: signal.token})
            .then(res => {
                dispatch(postUnfollowSomeoneSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(postUnfollowSomeoneFail(error));
                return error;
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

export const putEditProfile = user => {
    return dispatch => {
        dispatch(putEditProfileStart());
        return axios.put(`/users`, user, {cancelToken: signal.token})
            .then(res => {
                dispatch(putEditProfileSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(putEditProfileFail(error));
                return error;
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
        editProfileDetail: response.status
    }
};

export const patchTheme = theme => {
    return dispatch => {
        dispatch(patchThemeStart());
        axios.patch(`/users/theme`, {theme}, {cancelToken: signal.token})
            .then(res => {
                dispatch(patchThemeSuccess(res));
            })
            .catch(error => {
                dispatch(patchThemeFail(error));
            })
    }
};

export const patchThemeStart = () => {
    return {
        type: actionTypes.PATCH_THEME_START
    }
};

export const patchThemeFail = error => {
    return {
        type: actionTypes.PATCH_THEME_FAIL,
        errorMessage: error
    }
};

export const patchThemeSuccess = response => {
    return {
        type: actionTypes.PATCH_THEME_SUCCESS,
        patchThemeDetail: response.data
    }
};

export const patchPicture = picture => {
    return dispatch => {
        dispatch(patchPictureStart());
        axios.patch(`/users/media`, picture, {cancelToken: signal.token})
            .then(res => {
                dispatch(patchPictureSuccess(res));
            })
            .catch(error => {
                dispatch(patchPictureFail(error));
            })
    }
};

export const patchPictureStart = () => {
    return {
        type: actionTypes.PATCH_PICTURE_START
    }
};

export const patchPictureFail = error => {
    return {
        type: actionTypes.PATCH_PICTURE_FAIL,
        errorMessage: error
    }
};

export const patchPictureSuccess = response => {
    return {
        type: actionTypes.PATCH_PICTURE_SUCCESS,
        patchPictureDetail: response.data
    }
};

export const resetProfile = () => {
    return {
        type: actionTypes.RESET_PROFILE,
    }
};
