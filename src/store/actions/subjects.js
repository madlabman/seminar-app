import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {REQUEST_SUBJECTS, RECEIVE_SUBJECTS, FAIL_GET_SUBJECTS} from './actionTypes';
import {API_BASE} from '../../../config';

/**
 * Get all subjects
 *
 * @returns {{}}
 */
export const fetchSubjects = () => {
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
            path: `/wp/v2/subjects`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_SUBJECTS,
                RECEIVE_SUBJECTS,
                FAIL_GET_SUBJECTS
            ]
        }
    }
};