import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  errorMessage: null,
  success: false
};

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_CONTENT_START: return postContentStart(state, action);
    case actionTypes.POST_CONTENT_FAIL: return postContentFail(state, action);
    case actionTypes.POST_CONTENT_SUCCESS: return postContentSuccess(state, action);
    case actionTypes.POST_REACTION_START: return postReactionStart(state, action);
    case actionTypes.POST_REACTION_FAIL: return postReactionFail(state, action);
    case actionTypes.POST_REACTION_SUCCESS: return postReactionSuccess(state, action);
    default: return state;
  }
};

const postContentStart = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
  }
};

const postContentFail = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
    loading: false
  }
};

const postContentSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true
  }
};

const postReactionStart = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
  }
};

const postReactionFail = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
    loading: false
  }
};

const postReactionSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true
  }
};

export default createPostReducer;
