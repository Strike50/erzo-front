import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    errorMessage: null,
    success: false
};

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_MEDIA_START: return getMediaStart(state, action);
        case actionTypes.GET_MEDIA_FAIL: return getMediaFail(state, action);
        case actionTypes.GET_MEDIA_SUCCESS: return getMediaSuccess(state, action);
        case actionTypes.POST_MEDIA_START: return postMediaStart(state, action);
        case actionTypes.POST_MEDIA_FAIL: return postMediaFail(state, action);
        case actionTypes.POST_MEDIA_SUCCESS: return postMediaSuccess(state, action);
        default: return state;
    }
};

const getMediaStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
};

const getMediaFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false
    }
};

const getMediaSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        success: true
    }
};

const postMediaStart = (state, action) => {
    return {
        ...state,
        loading: true,
        success: false,
    }
};

const postMediaFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false
    }
};

const postMediaSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        success: true
    }
};

export default mediaReducer;
