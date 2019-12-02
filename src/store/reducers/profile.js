import * as actionTypes from "../actions/actionTypes";

const initialState = {
    profileDetail: {},
    errorMessage: null
};

const reducer = (state = initialState, action) => {
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
    return {
        ...state,
        profile: action.profile
    }
};

export default reducer;