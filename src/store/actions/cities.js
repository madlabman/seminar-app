import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';

import {API_BASE} from '../../../config';
import {REQUEST_CITIES, RECEIVE_CITIES, FAIL_GET_CITIES} from './actionTypes';

/**
 * Get all cities
 *
 * @returns {{}}
 */
export const fetchCities = () => {
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
            path: `/wp/v2/cities`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_CITIES,
                RECEIVE_CITIES,
                FAIL_GET_CITIES
            ]
        }
    }
};