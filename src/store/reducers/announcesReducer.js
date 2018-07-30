import {SET_CURRENT_ANNOUNCE} from '../actions/actionTypes';

const initialState = {
    items: [],
    recentItems: [],
    currentPost: null,
    updatedAt: null,
    isLoading: false
};

export const announcesReducer = (announcesState = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_ANNOUNCE:
            return {
                ...announcesState,
                currentPost: action.post
            };
        default:
            return announcesState;
    }
};