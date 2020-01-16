import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";

export const searchUser = contentSearch => {
    return dispatch => {
        dispatch(searchBarStart());
        axios.get('http://localhost:3003/users/keycloak/' + contentSearch)
            .then(res => {
                dispatch(searchBarSuccess(res));
            })
            .catch(error => {
                dispatch(searchBarFail(error));
            })
    }
};

export const searchBarStart = () => {
    return {
        type: actionTypes.SEARCH_BAR_START
    }
};

export const searchBarFail = error => {
    return {
        type: actionTypes.SEARCH_BAR_FAIL,
        errorMessage: error
    }
};

export const searchBarSuccess = response => {
    return {
        type: actionTypes.SEARCH_BAR_SUCCESS,
        userList: response.data.users
    }
};
