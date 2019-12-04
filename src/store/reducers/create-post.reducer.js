const initialState = {
  loading: false
};

const createPostReducer = (state = initialState, action) => {

};

const postTweetStart = (state, action) => {
  return {
    ...state,
    loading: true
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
    loading: false
  }
};

export default createPostReducer;
