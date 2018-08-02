import {RECEIVE_MENU, REQUEST_MENU} from '../actions/actionTypes';

const initialState = {
    items: [],
    updatedAt: null,
    isLoading: false
};

export const menuReducer = (menuState = initialState, action) => {
    switch (action.type) {
        case REQUEST_MENU:
            return {
                ...menuState,
                isLoading: true
            };
        case RECEIVE_MENU:
            if (
                action.payload &&
                action.payload.items.length
            ) {
                return {
                    ...menuState,
                    items: action.payload.items.map(item => {
                        return {
                            key: item.ID.toString(),
                            title: item.title,
                            link: item.guid
                        }
                    }),
                    updatedAt: Date.now(),
                    isLoading: false
                };
            } else
                return menuState;
        default:
            return menuState;
    }
};