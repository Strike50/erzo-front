import * as actionTypes from "../actions/actionTypes";

const initialState = {
    profileDetail: {},
    followersDetail: [],
    followingDetail: [],
    followSomeoneDetail: {},
    unfollowSomeoneDetail: {},
    editProfileDetail: {},
    patchThemeDetail: {},
    patchPictureDetail: {},
    errorMessage: null,
    loading: false,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);

        case actionTypes.FETCH_FOLLOWERS_START: return fetchFollowersStart(state, action);
        case actionTypes.FETCH_FOLLOWERS_FAIL: return fetchFollowersFail(state, action);
        case actionTypes.FETCH_FOLLOWERS_SUCCESS: return fetchFollowersSuccess(state, action);

        case actionTypes.FETCH_FOLLOWING_START: return fetchFollowingStart(state, action);
        case actionTypes.FETCH_FOLLOWING_FAIL: return fetchFollowingFail(state, action);
        case actionTypes.FETCH_FOLLOWING_SUCCESS: return fetchFollowingSuccess(state, action);

        case actionTypes.POST_FOLLOWSOMEONE_START: return postFollowSomeoneStart(state, action);
        case actionTypes.POST_FOLLOWSOMEONE_FAIL: return postFollowSomeoneFail(state, action);
        case actionTypes.POST_FOLLOWSOMEONE_SUCCESS: return postFollowSomeoneSuccess(state, action);

        case actionTypes.POST_UNFOLLOWSOMEONE_START: return postUnfollowSomeoneStart(state, action);
        case actionTypes.POST_UNFOLLOWSOMEONE_FAIL: return postUnfollowSomeoneFail(state, action);
        case actionTypes.POST_UNFOLLOWSOMEONE_SUCCESS: return postUnfollowSomeoneSuccess(state, action);

        case actionTypes.PUT_EDITPROFILE_START: return putEditProfileStart(state, action);
        case actionTypes.PUT_EDITPROFILE_FAIL: return putEditProfileFail(state, action);
        case actionTypes.PUT_EDITPROFILE_SUCCESS: return putEditProfileSuccess(state, action);

        case actionTypes.PATCH_THEME_START: return patchThemeStart(state, action);
        case actionTypes.PATCH_THEME_FAIL: return patchThemeFail(state, action);
        case actionTypes.PATCH_THEME_SUCCESS: return patchThemeSuccess(state, action);

        case actionTypes.PATCH_PICTURE_START: return patchPictureStart(state, action);
        case actionTypes.PATCH_PICTURE_FAIL: return patchPictureFail(state, action);
        case actionTypes.PATCH_PICTURE_SUCCESS: return patchPictureSuccess(state, action);

        case actionTypes.RESET_PROFILE: return resetProfile(state);

        default: return state;
    }
};

const fetchProfileStart = (state, action) => {
    return {
        ...state
    }
};

const fetchProfileFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchProfileSuccess = (state, action) => {
    return {
        ...state,
        profileDetail: action.profileDetail.user
    }
};
const fetchFollowersStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
};

const fetchFollowersFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false,
    }
};

const fetchFollowersSuccess = (state, action) => {
    return {
        ...state,
        followersDetail: action.followersDetail.followers,
        loading: false,
    }
};
const fetchFollowingStart = (state, action) => {
    return {
        ...state
    }
};

const fetchFollowingFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchFollowingSuccess = (state, action) => {
    return {
        ...state,
        followingDetail: action.followingDetail.follows
    }
};
const postFollowSomeoneStart = (state, action) => {
    return {
        ...state
    }
};

const postFollowSomeoneFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const postFollowSomeoneSuccess = (state, action) => {
    return {
        ...state,
        followSomeoneDetail: action.followSomeoneDetail
    }
};
const postUnfollowSomeoneStart = (state, action) => {
    return {
        ...state
    }
};

const postUnfollowSomeoneFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const postUnfollowSomeoneSuccess = (state, action) => {
    return {
        ...state,
        unfollowSomeoneDetail: action.unfollowSomeoneDetail
    }
};

const putEditProfileStart = (state, action) => {
    return {
        ...state
    }
};

const putEditProfileFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const putEditProfileSuccess = (state, action) => {
    return {
        ...state,
        editProfileDetail: action.editProfileDetail
    }
};
const patchThemeStart = (state, action) => {
    return {
        ...state
    }
};

const patchThemeFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const patchThemeSuccess = (state, action) => {
    return {
        ...state,
        patchThemeDetail: action.patchThemeDetail
    }
};

const patchPictureStart = (state, action) => {
    return {
        ...state
    }
};

const patchPictureFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const patchPictureSuccess = (state, action) => {
    return {
        ...state,
        patchPictureDetail: action.patchPictureDetail
    }
};

const resetProfile = state => {
    return {
        ...state,
        profileDetail: {},
        followersDetail: [],
        followingDetail: []
    }
};

export default profileReducer;
