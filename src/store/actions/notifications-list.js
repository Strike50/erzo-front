import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchNotifications = () => {
    return dispatch => {
        dispatch(fetchNotificationsStart());
        axios.get('/notifications')
            .then(res => {
                dispatch(fetchNotificationsSuccess(res));
            })
            .catch(error => {
                dispatch(fetchNotificationsFail(error));
            })
    }
};

export const fetchNotificationsStart = () => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_START
    }
};

export const fetchNotificationsFail = error => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_FAIL,
        errorMessage: error
    }
};

export const fetchNotificationsSuccess = response => {
    return {
        type: actionTypes.FETCH_NOTIFICATIONS_SUCCESS,
        listNotifications: response.data
    }
};
