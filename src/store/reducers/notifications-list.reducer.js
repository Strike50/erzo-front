import * as actionTypes from "../actions/actionTypes";

const initialState = {
    listNotifications: [],
    errorMessage: null
};

const notificationsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NOTIFICATIONS_START: return fetchNotificationsStart(state, action);
        case actionTypes.FETCH_NOTIFICATIONS_FAIL: return fetchNotificationsFail(state, action);
        case actionTypes.FETCH_NOTIFICATIONS_SUCCESS: return fetchNotificationsSuccess(state, action);
        case actionTypes.PUT_NOTIFICATIONS_START: return putNotificationsStart(state, action);
        case actionTypes.PUT_NOTIFICATIONS_FAIL: return putNotificationsFail(state, action);
        case actionTypes.PUT_NOTIFICATIONS_SUCCESS: return putNotificationsSuccess(state, action);
        default: return state;
    }
};

const fetchNotificationsStart = (state, action) => {
    return {
        ...state
    }
};

const fetchNotificationsFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const fetchNotificationsSuccess = (state, action) => {
    return {
        ...state,
        listNotifications: action.listNotifications
    }
};

const putNotificationsStart = (state, action) => {
    return {
        ...state
    }
};

const putNotificationsFail = (state, action) => {
    return {
        ...state,
        errorMessage: action.errorMessage
    }
};

const putNotificationsSuccess = (state, action) => {
    return {
        ...state
    }
};

export default notificationsListReducer;
