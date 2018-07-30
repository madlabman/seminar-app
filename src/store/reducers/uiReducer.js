import {UI_IS_LOADING, UI_STOP_LOADING} from '../actions/actionTypes';

const initialState = {
    isLoading: false
};

export const uiReducer = (uiState = initialState, action) => {
    switch (action.type) {
        case UI_IS_LOADING:
            return {
                ...uiState,
                isLoading: true
            };
        case UI_STOP_LOADING:
            return {
                ...uiState,
                isLoading: false
            };
        default:
            return uiState;
    }
};