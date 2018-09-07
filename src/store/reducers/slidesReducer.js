import {REQUEST_SLIDES, RECEIVE_SLIDES, FAIL_GET_SLIDES} from '../actions/actionTypes';

const initialState = {
    items: [],
    updatedAt: null,
    isLoading: false
};

export const slidesReducer = (slidesState = initialState, action) => {
    switch (action.type) {
        case REQUEST_SLIDES:
            return {
                ...slidesState,
                isLoading: true
            }
        case FAIL_GET_SLIDES:
            return {
                ...slidesState,
                isLoading: false
            }
        case RECEIVE_SLIDES:
            if (
                action.payload &&
                action.payload.length
            ) {
                return {
                    ...slidesState,
                    items: action.payload.map(item => {
                        return {
                            key: item.id.toString(),
                            image: {
                                uri: item.slide_image
                            },
                            link: {
                                uri: item.slide_link
                            }
                        }
                    }),
                    updatedAt: Date.now(),
                    isLoading: false
                };
            } else
                return slidesState
        default:
            return slidesState
    }
}