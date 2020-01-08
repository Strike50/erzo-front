import * as actionTypes from "../actions/actionTypes";

const initialState = {
    listPost: [],
    errorMessage: null
};

const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIMELINE_START: return fetchTimelineStart(state, action);
        case actionTypes.FETCH_TIMELINE_FAIL: return fetchTimelineFail(state, action);
        case actionTypes.FETCH_TIMELINE_SUCCESS: return fetchTimelineSuccess(state, action);
        default: return state;
    }
};

const fetchTimelineStart = (state, action) => {
    return {
        ...state
    }
};

const fetchTimelineFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchTimelineSuccess = (state, action) => {
    return {
        ...state,
        listPost: action.listPost
    }
};
export default timelineReducer;
