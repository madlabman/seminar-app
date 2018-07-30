import {RECEIVE_CITIES, REQUEST_CITIES} from '../actions/actionTypes';

const initialState = {
    items: [],
    updatedAt: null,
    isLoading: false
};

export const citiesReducer = (citiesState = initialState, action) => {
    switch (action.type) {
        case REQUEST_CITIES:
            return {
                ...citiesState,
                isLoading: true
            };
        case RECEIVE_CITIES:
            return {
                ...citiesState,
                items: action.payload.map(item => {
                    return {
                        key: item.id,
                        title: item.slug,
                        name: item.name
                    }
                }),
                updatedAt: Date.now(),
                isLoading: false
            };
        default:
            return citiesState;
    }
};