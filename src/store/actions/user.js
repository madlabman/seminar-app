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
    FAIL_SIGN_IN
} from './actionTypes';

import {API_BASE} from '../../../config';
import openUserDefinitions from '../../screens/helpers/openUserDefinitions';
import openMainApp from '../../screens/helpers/openMainApp';

let queryParams = {};
if (__DEV__) {
    queryParams = {
        ...queryParams,
        XDEBUG_SESSION_START: 'PHPSTORM'
    }
}

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
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `create_mobile_user`,
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
                body: JSON.stringify(data),
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

export const signIn = data => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `mobile_user_log_in`,
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
                body: JSON.stringify(data),
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

export const setUserDefinitions = data => {
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
        })
            .then(() => {
                // Check state
                if (getState().user.isSetupCompleted)
                    openMainApp();
            });
    }
};

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

export const addFCMToken = token => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `add_fcm_token/${getState().user.installationId}`,
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
                    token
                }),
                types: [
                    REQUEST_FCM_ADD,
                    RECEIVE_FCM_ADD,
                    FAIL_FCM_ADD
                ]
            }
        });
    }
};

export const updateFCMToken = (oldToken, newToken) => {
    const endpoint = buildUrl(
        API_BASE,
        {
            path: `replace_fcm_token/${getState().user.installationId}`,
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
            body: JSON.stringify({
                old_token: oldToken,
                new_token: newToken
            }),
            types: [
                REQUEST_FCM_UPDATE,
                RECEIVE_FCM_UPDATE,
                FAIL_FCM_UPDATE
            ]
        }
    }
};

export const updateFCMTokenInStore = token => {
    return {
        type: UPDATE_FCM_TOKEN,
        token
    }
};