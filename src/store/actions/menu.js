import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';
import {API_BASE} from '../../../config';

import {REQUEST_MENU, RECEIVE_MENU, FAIL_GET_MENU} from './actionTypes';

export const fetchMenu = () => {
    let queryParams = {};
    if (__DEV__) {
        queryParams = {
            ...queryParams,
            XDEBUG_SESSION_START: 'PHPSTORM'
        }
    }

    const endpoint = buildUrl(
        'http://hosthub.ru:8080/wp-json',
        {
            path: `menus/v1/menus/primary-menu`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_MENU,
                RECEIVE_MENU,
                FAIL_GET_MENU
            ]
        }
    }
};