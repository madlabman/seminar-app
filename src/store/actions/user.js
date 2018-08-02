import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {
    REQUEST_USER, REQUEST_SIGN_UP, REQUEST_USER_UPDATE,
    RECEIVE_USER, RECEIVE_SIGN_UP, RECEIVE_USER_UPDATE,
    FAIL_GET_USER, FAIL_SIGN_UP, FAIL_USER_UPDATE
} from './actionTypes';

import {API_BASE} from '../../../config';

export const fetchUser = installation_id => {
    return {
        [RSAA]: {
            endpoint: `${API_BASE}/mobile_user/${installation_id}`,
            method: 'GET',
            types: [
                REQUEST_USER,
                RECEIVE_USER,
                FAIL_GET_USER
            ]
        }
    }
};

export const signUp = data => {
    let queryParams = {};
    if (__DEV__) {
        queryParams = {
            ...queryParams,
            XDEBUG_SESSION_START: 'PHPSTORM'
        }
    }

    const endpoint = buildUrl(
        API_BASE,
        {
            path: `create_mobile_user`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
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

export const setUserDefinitions = data => {
    return (dispatch, getState) => {
        let queryParams = {};
        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `mobile_user/${getState().user.installationId}`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cities: Object.keys(data.cities),
                    subjects: Object.keys(data.subjects)
                }),
                types: [
                    REQUEST_USER_UPDATE,
                    RECEIVE_USER_UPDATE,
                    FAIL_USER_UPDATE
                ]
            }
        });
    }
};