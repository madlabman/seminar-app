import {UI_IS_LOADING, UI_STOP_LOADING} from './actionTypes';

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