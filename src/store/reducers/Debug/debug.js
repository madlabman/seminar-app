import {DEBUG_INCREMENT} from '../../actions/actionTypes';

const initialState = {
    open_count: 0
};

export const debugReducer = (debugState = initialState, action) => {
    switch (action.type) {
        case DEBUG_INCREMENT:
            return {
                ...debugState,
                open_count: debugState.open_count + 1
            };
        default:
            return debugState;
    }
};