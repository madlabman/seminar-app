import {RSAA} from 'redux-api-middleware'
import buildUrl from 'build-url'

import {REQUEST_MENU, RECEIVE_MENU, FAIL_GET_MENU} from './actionTypes'
import {API_BASE} from '../../../config'

export const fetchMenu = () => {
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
            path: `menus/v1/menus/side-menu`,   // Route defined by plugin
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