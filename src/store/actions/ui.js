import {UI_GET_NOTIFICATION, UI_IS_LOADING, UI_NOTIFICATION_OPENED, UI_STOP_LOADING} from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_IS_LOADING
    }
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    }
};

export const receivedNotification = notification => {
    return {
        type: UI_GET_NOTIFICATION,
        notification
    }
}

export const notificationOpened = () => {
    return {
        type: UI_NOTIFICATION_OPENED
    }
}