import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import {eMediaType} from "../../enum/mediaType";
import {postMedia} from "./media";

export const postTweet = (content, file, postParentId) => {
    return dispatch => {
        if (file) {
            const typeFile = file.type.includes('image')
                ? eMediaType.IMAGE
                : file.type.includes('video') ? eMediaType.VIDEO : null;
            return dispatch(postMedia(file, typeFile))
                .then(res => {
                    const tweetToPost = {
                        content,
                        postId: postParentId,
                        media: {
                            id: res.headers['content-location'],
                            type: typeFile
                        }
                    };
                    return dispatch(postContent(tweetToPost));
            })
        } else {
            return dispatch(postContent({
                content,
                postId: postParentId
            }));
        }

    }
};

export const postContent = content => {
    return dispatch => {
        dispatch(postContentStart());
        return axios.post('/posts', content)
            .then(response => {
                dispatch(postContentSuccess());
                return response;
            })
            .catch(error => {
                dispatch(postContentFail(error));
                return error;
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
        return axios.get('/posts?id=' + id)
            .then(response => {
                dispatch(getPostSuccess());
                return response.data.post;
            })
            .catch(error => {
                dispatch(getPostFail(error));
                return error;
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

export const postReaction = reaction => {
    return dispatch => {
        dispatch(postReactionStart());
        return axios.post('/reactions', reaction)
            .then(response => {
                dispatch(postReactionSuccess());
                return response;
            })
            .catch(error => {
                dispatch(postReactionFail(error));
                return error;
            })
    }
};

export const postReactionStart = () => {
    return {
        type: actionTypes.POST_REACTION_START
    }
};

export const postReactionFail = error => {
    return {
        type: actionTypes.POST_REACTION_FAIL,
        errorMessage: error
    }
};

export const postReactionSuccess = () => {
    return {
        type: actionTypes.POST_REACTION_SUCCESS
    }
};

export const deleteReaction = id => {
    return dispatch => {
        dispatch(deleteReactionStart());
        axios.delete(`/reactions/${id}`)
            .then(() => {
                dispatch(deleteReactionSuccess());
            })
            .catch(error => {
                dispatch(deleteReactionFail(error));
            })
    }
};

export const deleteReactionStart = () => {
    return {
        type: actionTypes.DELETE_REACTION_START
    }
};

export const deleteReactionFail = error => {
    return {
        type: actionTypes.DELETE_REACTION_FAIL,
        errorMessage: error
    }
};

export const deleteReactionSuccess = () => {
    return {
        type: actionTypes.DELETE_REACTION_SUCCESS
    }
};

export const deletePost = id => {
    return dispatch => {
        dispatch(deletePostStart());
        axios.delete(`/posts/${id}`)
            .then(() => {
                dispatch(deletePostSuccess());
            })
            .catch(() => {
                dispatch(deletePostFail());
            })
    }
};

export const deletePostStart = () => {
    return {
        type: actionTypes.DELETE_POST_START
    }
};

export const deletePostFail = () => {
    return {
        type: actionTypes.DELETE_POST_FAIL
    }
};

export const deletePostSuccess = () => {
    return {
        type: actionTypes.DELETE_POST_SUCCESS
    }
};

export const getCommentsOfPostById = id => {
    return dispatch => {
        dispatch(getCommentsOfPostByIdStart());
        return axios.get(`/posts/comments/${id}`)
            .then(response => {
                dispatch(getCommentsOfPostByIdSuccess());
                return response.data.posts;
            })
            .catch(error => {
                dispatch(getCommentsOfPostByIdFail());
                return error;
            })
    }
};

export const getCommentsOfPostByIdStart = () => {
    return {
        type: actionTypes.GET_POST_START
    }
};

export const getCommentsOfPostByIdFail = () => {
    return {
        type: actionTypes.GET_POST_FAIL,
    }
};

export const getCommentsOfPostByIdSuccess = () => {
    return {
        type: actionTypes.GET_POST_SUCCESS
    }
};
