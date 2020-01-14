import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import {eMediaType} from "../../enum/MediaType";

export const postTweet = (content, file) => {
    return dispatch => {
        if (file) {
            const typeFile = file.type.includes('image')
                ? 'IMAGE'
                : file.type.includes('video') ? 'VIDEO' : null;
            return dispatch(postMedia(file, typeFile))
                .then(res => {
                    const tweetToPost = {
                        content,
                        media: {
                            id: res.headers['content-location'],
                            type: typeFile === 'IMAGE' ? eMediaType.IMAGE : eMediaType.VIDEO
                        }
                    };
                    return dispatch(postContent(tweetToPost));
            })
        } else {
            dispatch(postContent(content));
        }

    }
};

export const postMedia = (file, typeFile) => {
    return dispatch => {
        dispatch(postMediaStart());
        if (typeFile !== null) {
            const url = typeFile === 'IMAGE' ? 'images' : 'videos';
            const data = new FormData();
            data.append('file', file);
            return axios.post(url, data)
                .then(res => {
                    dispatch(postMediaSuccess());
                    return res;
                })
                .catch(error => {
                    dispatch(postMediaFail(error));
                    return error;
                })
        } else {
            dispatch(postMediaFail({message: 'Wrong file type'}));
        }
    }

};

export const postMediaStart = () => {
    return {
        type: actionTypes.POST_MEDIA_START
    }
};

export const postMediaFail = error => {
    return {
        type: actionTypes.POST_MEDIA_FAIL,
        errorMessage: error
    }
};

export const postMediaSuccess = () => {
    return {
        type: actionTypes.POST_MEDIA_SUCCESS
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
