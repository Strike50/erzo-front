import * as actionTypes from "../actions/actionTypes";

const initialState = {
    loading: false,
    userList: []
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_BAR_START: return searchBarStart(state, action);
        case actionTypes.SEARCH_BAR_FAIL: return searchBarFail(state, action);
        case actionTypes.SEARCH_BAR_SUCCESS: return searchBarSuccess(state, action);
        case actionTypes.RESET_SEARCH_LIST: return resetSearchList(state, action);
        default: return state;
    }
};

const searchBarStart = (state, action) => {
    return {
        ...state,
        loading: true,
    }
};

const searchBarFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage,
        loading: false
    }
};

const searchBarSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        userList: action.userList
    }
};

const resetSearchList = (state, action) => {
    return {
        ...state,
        userList: []
    }
};

export default searchReducer;
