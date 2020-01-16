import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const fetchNotifications = () => {
    return dispatch => {
        dispatch(fetchNotificationsStart());
        return axios.get('/notifications')
            .then(res => {
                dispatch(fetchNotificationsSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchNotificationsFail(error));
                return error;
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

export const putNotifications = notifications => {
    return dispatch => {
        dispatch(putNotificationsStart());
        console.log(notifications);
        axios.put('/notifications', {notifications})
            .then(res => {
                dispatch(putNotificationsSuccess(res));
            })
            .catch(error => {
                dispatch(putNotificationsFail(error));
            })
    }
};

export const putNotificationsStart = () => {
    return {
        type: actionTypes.PUT_NOTIFICATIONS_START
    }
};

export const putNotificationsFail = error => {
    return {
        type: actionTypes.PUT_NOTIFICATIONS_FAIL,
        errorMessage: error
    }
};

export const putNotificationsSuccess = response => {
    return {
        type: actionTypes.PUT_NOTIFICATIONS_SUCCESS
    }
};
