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
    case actionTypes.DELETE_REACTION_START: return deleteReactionStart(state, action);
    case actionTypes.DELETE_REACTION_FAIL: return deleteReactionFail(state, action);
    case actionTypes.DELETE_REACTION_SUCCESS: return deleteReactionSuccess(state, action);
    case actionTypes.DELETE_POST_START: return deletePostStart(state, action);
    case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
    case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
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

const deleteReactionStart = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
  }
};

const deleteReactionFail = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
    loading: false
  }
};

const deleteReactionSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true
  }
};

const deletePostStart = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
  }
};

const deletePostFail = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
    loading: false
  }
};

const deletePostSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true
  }
};

export default createPostReducer;
