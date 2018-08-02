import {
    RECEIVE_UPD_RELATION, REQUEST_UPD_RELATION,
    UI_IS_LOADING, UI_STOP_LOADING
} from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

export const uiReducer = (uiState = initialState, action) => {
    switch (action.type) {
        case UI_IS_LOADING:
        case REQUEST_UPD_RELATION:
            return {
                ...uiState,
                isLoading: true
            };
        case UI_STOP_LOADING:
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