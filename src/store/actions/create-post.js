import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import {eMediaType} from "../../enum/mediaType";
import {postMedia} from "./media";

export const postTweet = (content, file) => {
    return dispatch => {
        if (file) {
            const typeFile = file.type.includes('image')
                ? eMediaType.IMAGE
                : file.type.includes('video') ? eMediaType.VIDEO : null;
            return dispatch(postMedia(file, typeFile))
                .then(res => {
                    const tweetToPost = {
                        content,
                        media: {
                            id: res.headers['content-location'],
                            type: typeFile
                        }
                    };
                    return dispatch(postContent(tweetToPost));
            })
        } else {
            dispatch(postContent(content));
        }

    }
};

export const postContent = content => {
    return dispatch => {
        dispatch(postContentStart());
        axios.post('/posts', content)
            .then(() => {
                dispatch(postContentSuccess());
            })
            .catch(error => {
                dispatch(postContentFail(error));
            })
    }
};

export const postContentStart = () => {
  return {
    type: actionTypes.POST_CONTENT_START
  }
};

export const postContentFail = error => {
  return {
    type: actionTypes.POST_CONTENT_FAIL,
    errorMessage: error
  }
};

export const postContentSuccess = () => {
  return {
    type: actionTypes.POST_CONTENT_SUCCESS
  }
};

export const getPostById = id => {
    return dispatch => {
        dispatch(getPostStart());
        return axios.get('http://localhost:3003/posts?id=' + id)
            .then(response => {
                dispatch(getPostSuccess());
                return response.data.post;
            })
            .catch(error => {
                dispatch(getPostFail(error));
            })
    }
};

export const getPostStart = () => {
    return {
        type: actionTypes.GET_POST_START
    }
};

export const getPostFail = error => {
    return {
        type: actionTypes.GET_POST_FAIL,
        errorMessage: error
    }
};

export const getPostSuccess = () => {
    return {
        type: actionTypes.GET_POST_SUCCESS
    }
};
