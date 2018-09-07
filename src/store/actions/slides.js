import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {REQUEST_SLIDES, RECEIVE_SLIDES, FAIL_GET_SLIDES} from './actionTypes';
import {API_BASE, WP_REST_ROUTE} from '../../../config';

let queryParams = {};
if (__DEV__) {
    queryParams = {
        ...queryParams,
        XDEBUG_SESSION_START: 'PHPSTORM'
    }
}

/**
 * Fetching main slider items.
 *
 * @returns {{}}
 */
export const fetchSlides = () => {
    const endpoint = buildUrl(
        API_BASE,
        {
            path: `${WP_REST_ROUTE}/slides`,
            queryParams
        }
    )

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_SLIDES,
                RECEIVE_SLIDES,
                FAIL_GET_SLIDES
            ]
        }
    }
};