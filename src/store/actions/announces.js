import {RSAA} from 'redux-api-middleware';

import {FAIL_GET_ANNOUNCES, RECEIVE_ANNOUNCES, REQUEST_ANNOUNCES, SET_CURRENT_ANNOUNCE} from './actionTypes';
import {API_BASE, DEBUG_PARAM} from '../../../config';

export const setCurrentAnnounce = post => {
    return {
        type: SET_CURRENT_ANNOUNCE,
        post
    }
};

export const fetchAnnounces = (needFetchOld = false) => {
    return {
        [RSAA]: {
            endpoint: `${API_BASE}/seminars${DEBUG_PARAM}`,
            method: 'GET',
            types: [
                REQUEST_ANNOUNCES,
                RECEIVE_ANNOUNCES,
                FAIL_GET_ANNOUNCES
            ]
        }
    }
};