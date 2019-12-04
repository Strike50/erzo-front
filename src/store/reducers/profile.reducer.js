import * as actionTypes from "../actions/actionTypes";

const initialState = {
    profileDetail: {},
    errorMessage: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PROFILE_START: return fetchProfileStart(state, action);
        case actionTypes.FETCH_PROFILE_FAIL: return fetchProfileFail(state, action);
        case actionTypes.FETCH_PROFILE_SUCCESS: return fetchProfileSuccess(state, action);
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
    console.log(action.profileDetail.users);
    return {
        ...state,
        profileDetail: action.profileDetail.users
    }
};
export default profileReducer;
