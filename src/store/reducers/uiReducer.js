import {
    FAIL_BILL,
    FAIL_GET_FEEDBACK,
    FAIL_GET_RELATION, RECEIVE_BILL, RECEIVE_FEEDBACK,
    RECEIVE_GET_RELATION, RECEIVE_UPD_RELATION, REQUEST_BILL, REQUEST_FEEDBACK,
    REQUEST_GET_RELATION, REQUEST_UPD_RELATION, UI_GET_NOTIFICATION,
    UI_IS_LOADING, UI_NOTIFICATION_OPENED, UI_STOP_LOADING
} from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    notification: null
};

export const uiReducer = (uiState = initialState, action) => {
    switch (action.type) {
        case UI_IS_LOADING:
        case REQUEST_UPD_RELATION:
        case REQUEST_GET_RELATION:
        case REQUEST_BILL:
        case REQUEST_FEEDBACK:
            return {
                ...uiState,
                isLoading: true
            };
        case UI_STOP_LOADING:
        case RECEIVE_GET_RELATION:
        case FAIL_GET_RELATION:
        case RECEIVE_FEEDBACK:
        case RECEIVE_BILL:
        case FAIL_BILL:
        case FAIL_GET_FEEDBACK:
            return {
                ...uiState,
                isLoading: false
            };
        case RECEIVE_UPD_RELATION:
            if (
                action.payload
                && action.payload.success
            ) return {
                ...uiState,
                isLoading: false
            };
            else
                return uiState;
        case UI_GET_NOTIFICATION:
            return {
                ...uiState,
                notification: action.notification
            }
        case UI_NOTIFICATION_OPENED:
            return {
                ...uiState,
                notification: null
            }
        default:
            return uiState;
    }
};