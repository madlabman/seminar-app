import {RECEIVE_CITIES} from '../actions/actionTypes';

const initialState = {
    items: [],
    updated_at: null
};

export const citiesReducer = (citiesState = initialState, action) => {
    switch (action.type) {
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
                updated_at: Date.now()
            };
        default: return citiesState;
    }
};