import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import {eMediaType} from "../../enum/mediaType";

export const getMedia = (id, typeFile, token) => {
    return dispatch => {
        dispatch(getMediaStart());
        const url = typeFile === eMediaType.IMAGE ? `/images/${id}` : `/videos/${id}`;
        return fetch(`http://localhost:3002${url}`, {
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            }),
            method: 'GET'
        })
            .then(response => {
                return response.blob()
                    .then((downloadedImg) => {
                    dispatch(getMediaSuccess());
                    return URL.createObjectURL(downloadedImg).toString()
                })
            })
            .catch(error => {
                dispatch(getMediaFail(error));
            })
    }
};

export const getMediaStart = () => {
    return {
        type: actionTypes.GET_MEDIA_START
    }
};

export const getMediaFail = error => {
    return {
        type: actionTypes.GET_MEDIA_FAIL,
        errorMessage: error
    }
};

export const getMediaSuccess = () => {
    return {
        type: actionTypes.GET_MEDIA_SUCCESS,
    }
};

export const postMedia = (file, typeFile) => {
    return dispatch => {
        dispatch(postMediaStart());
        if (typeFile !== null) {
            const url = typeFile === eMediaType.IMAGE ? '/images' : '/videos';
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
