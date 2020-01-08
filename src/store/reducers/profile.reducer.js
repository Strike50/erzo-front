import * as actionTypes from "../actions/actionTypes";

const initialState = {
    profileDetail: {},
    followersDetail: [],
    followingDetail: [],
    errorMessage: null
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
        ...state
    }
};

const fetchFollowersFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchFollowersSuccess = (state, action) => {
    return {
        ...state,
        followersDetail: action.followersDetail.followers
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
export default profileReducer;