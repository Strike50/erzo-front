import * as actionTypes from "./actionTypes";

export const postTweet = () => {
  return dispatch => {
    dispatch()
  }
};

export const postTweetStart = () => {
  return {
    type: actionTypes.POST_TWEET_START
  }
};

export const postTweetFail = error => {
  return {
    type: actionTypes.POST_TWEET_FAIL,
    errorMessage: error
  }
};

export const postTweetSuccess = response => {
  return {
    type: actionTypes.POST_TWEET_SUCCESS,
    profileDetail: response.data
  }
};
