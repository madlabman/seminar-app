import {RECEIVE_SUBJECTS, REQUEST_SUBJECTS} from '../actions/actionTypes';

const initialState = {
    items: [],
    updatedAt: null,
    isLoading: false
};

export const subjectsReducer = (subjectsState = initialState, action) => {
    switch (action.type) {
        case REQUEST_SUBJECTS:
            return {
                ...subjectsState,
                isLoading: true
            };
        case RECEIVE_SUBJECTS:
            return {
                ...subjectsState,
                items: action.payload.map(item => {
                    return {
                        key: item.id,
                        title: item.slug,
                        name: item.name
                    }
                }),
                updatedAt: Date.now()
            };
        default: return subjectsState;
    }
};