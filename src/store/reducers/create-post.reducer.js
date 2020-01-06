import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  errorMessage: null,
  success: false
};

const createPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_TWEET_START: return postTweetStart(state, action);
    case actionTypes.POST_TWEET_FAIL: return postTweetFail(state, action);
    case actionTypes.POST_TWEET_SUCCESS: return postTweetSuccess(state, action);
    default: return state;
  }
};

const postTweetStart = (state, action) => {
  return {
    ...state,
    loading: true,
    success: false,
  }
};

const postTweetFail = (state, action) => {
  return {
    ...state,
    errorMessage: action.errorMessage,
    loading: false
  }
};

const postTweetSuccess = (state, action) => {
  return {
    ...state,
    loading: false,
    success: true
  }
};

export default createPostReducer;
