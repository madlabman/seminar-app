import {
    FAIL_GET_RELATION,
    RECEIVE_GET_RELATION, RECEIVE_UPD_RELATION,
    REQUEST_GET_RELATION, REQUEST_UPD_RELATION,
    UI_IS_LOADING, UI_STOP_LOADING
} from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

export const uiReducer = (uiState = initialState, action) => {
    switch (action.type) {
        case UI_IS_LOADING:
        case REQUEST_UPD_RELATION:
        case REQUEST_GET_RELATION:
            return {
                ...uiState,
                isLoading: true
            };
        case UI_STOP_LOADING:
        case RECEIVE_GET_RELATION:
        case FAIL_GET_RELATION:
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
        default:
            return uiState;
    }
};