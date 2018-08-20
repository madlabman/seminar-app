import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {FAIL_GET_FEEDBACK, RECEIVE_FEEDBACK, REQUEST_FEEDBACK} from './actionTypes';
import {API_BASE, SPP_REST_ROUTE} from '../../../config';

let queryParams = {};
if (__DEV__) {
    queryParams = {
        ...queryParams,
        XDEBUG_SESSION_START: 'PHPSTORM'
    }
}

/**
 * Send question to administrator
 *
 * @param question
 * @returns {function(*, *): (*|Promise<any>|PromiseLike<T | never>|Promise<T | never>)}
 */
export const sendFeedback = question => {
    return (dispatch, getState) => {
        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/send_question`,
                queryParams: {
                    ...queryParams,
                    installation_id: getState().user.installationId,
                    question
                }
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
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