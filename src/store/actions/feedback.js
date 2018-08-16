import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {FAIL_GET_FEEDBACK, RECEIVE_FEEDBACK, REQUEST_FEEDBACK} from './actionTypes';
import {API_BASE} from '../../../config';

let queryParams = {};
if (__DEV__) {
    queryParams = {
        ...queryParams,
        XDEBUG_SESSION_START: 'PHPSTORM'
    }
}

export const sendFeedback = question => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `send_question`,
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
                    question
                }),
                types: [
                    REQUEST_FEEDBACK,
                    RECEIVE_FEEDBACK,
                    FAIL_GET_FEEDBACK
                ]
            }
        })
            .then(action => {
                return action.payload && action.payload.success;
            });
    }
};