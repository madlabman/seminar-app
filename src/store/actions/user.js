import {RSAA} from 'redux-api-middleware';

import {
    REQUEST_USER,
    RECEIVE_USER,
    FAIL_GET_USER,
    REQUEST_SIGN_UP,
    RECEIVE_SIGN_UP,
    FAIL_SIGN_UP, UI_IS_LOADING, UI_STOP_LOADING, FAIL_API_REQUEST
} from './actionTypes';

import {API_BASE, DEBUG_PARAM} from '../../../config';

export const fetchUser = installation_id => {
    return {
        [RSAA]: {
            endpoint: `${API_BASE}/mobile_user/${installation_id}`,
            method: 'GET',
            types: [
                REQUEST_USER,
                RECEIVE_USER,
                FAIL_API_REQUEST
            ]
        }
    }
};

export const signUp = data => {
    return {
        [RSAA]: {
            endpoint: `${API_BASE}/create_mobile_user${DEBUG_PARAM}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            types: [
                REQUEST_SIGN_UP,
                RECEIVE_SIGN_UP,
                FAIL_SIGN_UP
            ]
        }
    }
};