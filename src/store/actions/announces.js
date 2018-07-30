import {SET_CURRENT_ANNOUNCE} from './actionTypes';

export const setCurrentAnnounce = post => {
    return {
        type: SET_CURRENT_ANNOUNCE,
        post
    }
};