import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import {eMediaType} from "../../enum/mediaType";

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
