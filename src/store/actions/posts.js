import {RSAA} from 'redux-api-middleware'
import buildUrl from 'build-url'
import moment from 'moment'

import {
    FAIL_BILL,
    FAIL_GET_ANNOUNCES, FAIL_GET_FEEDBACK, FAIL_GET_NEWS, FAIL_GET_RELATION, FAIL_UPD_RELATION,
    RECEIVE_ANNOUNCES, RECEIVE_BILL, RECEIVE_FEEDBACK, RECEIVE_GET_RELATION, RECEIVE_NEWS, RECEIVE_UPD_RELATION,
    REQUEST_ANNOUNCES, REQUEST_BILL, REQUEST_FEEDBACK, REQUEST_GET_RELATION, REQUEST_NEWS, REQUEST_UPD_RELATION,
} from './actionTypes';
import {API_BASE, ONLY_CONTENT_PARAM, SPP_REST_ROUTE, WP_REST_ROUTE} from '../../../config';

/**
 * Get announces related for user
 *
 * @param force
 * @returns {function(*, *): *}
 */
export const fetchAnnounces = (force = false) => {
    return (dispatch, getState) => {
        const updatedAt = getState().posts.announces.updatedAt;
        const updatedAtMoment = (updatedAt === null || force) ?
            moment().subtract(1, 'y') :
            moment(updatedAt);

        let queryParams = {
            since_date: updatedAtMoment.format('X'),
            installation_id: getState().user.installationId,
            exclude_tax: 'subjects'
        };

        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/seminars`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_ANNOUNCES,
                    {
                        type: RECEIVE_ANNOUNCES,
                        meta: {
                            forceUpdate: force
                        }
                    },
                    FAIL_GET_ANNOUNCES
                ]
            }
        });
    }
};

/**
 * Get all news
 *
 * @returns {function(*, *): *}
 */
export const fetchNews = () => {
    return (dispatch, getState) => {
        const updatedAt = getState().posts.news.updatedAt;
        const updatedAtMoment = updatedAt === null ?
            moment().subtract(1, 'y') :
            moment(updatedAt);

        let queryParams = {
            since_date: updatedAtMoment.format('X'),
        };

        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/news`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_NEWS,
                    RECEIVE_NEWS,
                    FAIL_GET_NEWS
                ]
            }
        });
    }
};

/**
 * Update relation between announce and user
 *
 * @param announceId
 * @param relation
 * @returns {function(*, *): *}
 */
export const updRelation = (announceId, relation) => {
    return (dispatch, getState) => {
        let queryParams = {
            seminar_id: announceId,
            installation_id: getState().user.installationId,
            relation
        };
        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/add_relation`,
                queryParams
            }
        );

        dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_UPD_RELATION,
                    {
                        type: RECEIVE_UPD_RELATION,
                        meta: {
                            announceId,
                            relation
                        }
                    },
                    FAIL_UPD_RELATION
                ]
            }
        });
    }
};

/**
 * Get relation for announce
 *
 * @param announceId
 * @returns {function(*, *): *}
 */
export const getRelation = announceId => {
    return (dispatch, getState) => {
        let queryParams = {
            installation_id: getState().user.installationId,
            seminar_id: announceId
        };

        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/relation`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_GET_RELATION,
                    {
                        type: RECEIVE_GET_RELATION,
                        meta: {
                            announceId
                        }
                    },
                    FAIL_GET_RELATION
                ]
            }
        });
    }
};

/**
 * Send request for getting PDF bill by email
 *
 * @param announceId
 * @returns {function(*, *): *}
 */
export const sendBillRequest = announceId => {
    return (dispatch, getState) => {
        let queryParams = {
            installation_id: getState().user.installationId,
            seminar_id: announceId
        };

        if (__DEV__) {
            queryParams = {
                ...queryParams,
                XDEBUG_SESSION_START: 'PHPSTORM'
            }
        }

        const endpoint = buildUrl(
            API_BASE,
            {
                path: `${SPP_REST_ROUTE}/mobile_user/send_email`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_BILL,
                    RECEIVE_BILL,
                    FAIL_BILL
                ]
            }
        });
    }
}

export const getSingleAnnounce = postId => {
    return dispatch => {

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
                path: `${SPP_REST_ROUTE}/seminar`,
                queryParams: {
                    ...queryParams,
                    seminar_id: postId
                }
            }
        )

        return fetch(endpoint)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.success) {
                    const item = responseJson.data
                    if (item) {
                        return {
                            id: item.ID,
                            key: item.post_name,
                            date: moment.unix(item.seminar_date_time),
                            thumbnail: {
                                uri: item.post_thumbnail
                            },
                            title: item.post_title,
                            excerpt: item.post_excerpt,
                            permalink: {
                                uri: buildUrl(
                                    item.association_post_url,
                                    {
                                        queryParams: {
                                            [ONLY_CONTENT_PARAM]: true
                                        }
                                    }
                                )
                            },
                            relation: 'none'
                        }
                    }
                }

                return null;
            })
    }
}