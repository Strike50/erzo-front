import * as actionTypes from "../actions/actionTypes";

const initialState = {
    profileDetail: {},
    followersDetail: [],
    followingDetail: [],
    followSomeoneDetail: {},
    unfollowSomeoneDetail: {},
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
export default profileReducer;