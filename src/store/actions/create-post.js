import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const postTweet = (content, media) => {
    return dispatch => {
        dispatch(postTweetStart());
        const data = new FormData();
        data.append('content', content);
        data.append('file', media);
        axios.post('/posts', data)
            .then(() => {
                dispatch(postTweetSuccess());
            })
            .catch(error => {
                dispatch(postTweetFail(error));
            })
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

export const postTweetSuccess = () => {
  return {
    type: actionTypes.POST_TWEET_SUCCESS
  }
};
