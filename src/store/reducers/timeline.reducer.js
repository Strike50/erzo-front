import * as actionTypes from "../actions/actionTypes";

const initialState = {
    listPost: [],
    listOwnPost: [],
    errorMessage: null
};

const timelineReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIMELINE_START: return fetchTimelineStart(state, action);
        case actionTypes.FETCH_TIMELINE_FAIL: return fetchTimelineFail(state, action);
        case actionTypes.FETCH_TIMELINE_SUCCESS: return fetchTimelineSuccess(state, action);
        case actionTypes.FETCH_OWN_TIMELINE_START: return fetchOwnTimelineStart(state, action);
        case actionTypes.FETCH_OWN_TIMELINE_FAIL: return fetchOwnTimelineFail(state, action);
        case actionTypes.FETCH_OWN_TIMELINE_SUCCESS: return fetchOwnTimelineSuccess(state, action);
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

const fetchOwnTimelineStart = (state, action) => {
    return {
        ...state
    }
};

const fetchOwnTimelineFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchOwnTimelineSuccess = (state, action) => {
    return {
        ...state,
        listOwnPost: action.listOwnPost
    }
};

export default timelineReducer;
