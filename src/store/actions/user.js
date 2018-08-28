import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {
    REQUEST_USER,
    REQUEST_SIGN_UP,
    REQUEST_USER_UPDATE,
    RECEIVE_USER,
    RECEIVE_SIGN_UP,
    RECEIVE_USER_UPDATE,
    FAIL_GET_USER,
    FAIL_SIGN_UP,
    FAIL_USER_UPDATE,
    UPDATE_FCM_TOKEN,
    REQUEST_FCM_ADD,
    RECEIVE_FCM_ADD,
    FAIL_FCM_ADD,
    REQUEST_FCM_UPDATE,
    RECEIVE_FCM_UPDATE,
    FAIL_FCM_UPDATE,
    REQUEST_SIGN_IN,
    RECEIVE_SIGN_IN,
    FAIL_SIGN_IN,
    UPDATE_USER_CITIES,
    UPDATE_USER_SUBJECTS
} from './actionTypes';

import {API_BASE, SPP_REST_ROUTE} from '../../../config';
import openUserDefinitions from '../../screens/helpers/openUserDefinitions';
import openMainApp from '../../screens/helpers/openMainApp';
import {fetchAnnounces} from './index';

let queryParams = {};
if (__DEV__) {
    queryParams = {
        ...queryParams,
        XDEBUG_SESSION_START: 'PHPSTORM'
    }
}

export const fetchUser = () => {
    return (dispatch, getState) => {
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
                method: 'GET',
                types: [
                    REQUEST_USER,
                    RECEIVE_USER,
                    FAIL_GET_USER
                ]
            }
        });
    }
};

/**
 * Register user
 *
 * @param data
 * @returns {function(*, *): (*|Promise<any>|PromiseLike<T | never>|Promise<T | never>)}
 */
export const signUp = data => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/create_mobile_user`,
                queryParams: {
                    ...queryParams,
                    ...data
                }
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_SIGN_UP,
                    RECEIVE_SIGN_UP,
                    FAIL_SIGN_UP
                ]
            }
        })
            .then(() => {
                // Check state
                if (getState().user.isSignedUp)
                    openUserDefinitions();
            });
    };
};

/**
 * Login user
 *
 * @param data
 * @returns {function(*, *): (*|Promise<any>|PromiseLike<T | never>|Promise<T | never>)}
 */
export const signIn = data => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/log_in`,
                queryParams: {
                    ...queryParams,
                    ...data
                }
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_SIGN_IN,
                    RECEIVE_SIGN_IN,
                    FAIL_SIGN_IN
                ]
            }
        })
            .then(() => {
                // Check state
                if (getState().user.isSignedUp)
                    openUserDefinitions();
            });
    };
};

/**
 * Update user information
 *
 * @param data
 * @returns {function(*, *): (*|Promise<any>|PromiseLike<T | never>|Promise<T | never>)}
 */
export const setUserDefinitions = data => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user`,
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
                    installation_id: getState().user.installationId,
                    cities: Object.keys(data.cities),
                    subjects: Object.keys(data.subjects)
                }),
                types: [
                    REQUEST_USER_UPDATE,
                    RECEIVE_USER_UPDATE,
                    FAIL_USER_UPDATE
                ]
            }
        })
            .then(() => {
                // Check state
                if (getState().user.isSetupCompleted) {
                    openMainApp({forceUpdate: true});
                }
            });
    }
};

/**
 * Dispatch update or create Firebase token actions
 *
 * @param token
 * @returns {function(*, *): *}
 */
export const updateFCM = token => {
    return (dispatch, getState) => {
        const storedToken = getState().user.fcmToken;
        if (storedToken === null) {
            // Add newly created token
            dispatch(addFCMToken(token));
        } else if (storedToken !== token) {
            // Update token on server with old value
            dispatch(updateFCMToken(storedToken, token));
        }
        // Save in store
        return dispatch(updateFCMTokenInStore(token))
    }
};

/**
 * Send new token to the backend
 *
 * @param token
 * @returns {function(*, *): *}
 */
export const addFCMToken = token => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/fcm_tokens/add`,
                queryParams: {
                    ...queryParams,
                    installation_id: getState().user.installationId,
                    token
                }
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_FCM_ADD,
                    RECEIVE_FCM_ADD,
                    FAIL_FCM_ADD
                ]
            }
        });
    }
};

/**
 * Send token for replace on the backend
 *
 * @param oldToken
 * @param newToken
 * @returns {function(*, *): *}
 */
export const updateFCMToken = (oldToken, newToken) => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/fcm_tokens/replace`,
                queryParams: {
                    ...queryParams,
                    installation_id: getState().user.installationId,
                    old_token: oldToken,
                    new_token: newToken
                }
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_FCM_UPDATE,
                    RECEIVE_FCM_UPDATE,
                    FAIL_FCM_UPDATE
                ]
            }
        })
    }
};

export const updateFCMTokenInStore = token => {
    return {
        type: UPDATE_FCM_TOKEN,
        token
    }
};

export const updateUserCities = cities => {
    return {
        type: UPDATE_USER_CITIES,
        cities
    }
};

export const updateUserSubjects = subjects => {
    return {
        type: UPDATE_USER_SUBJECTS,
        subjects
    }
};