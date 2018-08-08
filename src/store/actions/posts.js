import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';
import moment from 'moment';

import {
    FAIL_GET_ANNOUNCES, FAIL_GET_NEWS, FAIL_GET_RELATION, FAIL_UPD_RELATION,
    RECEIVE_ANNOUNCES, RECEIVE_GET_RELATION, RECEIVE_NEWS, RECEIVE_UPD_RELATION,
    REQUEST_ANNOUNCES, REQUEST_GET_RELATION, REQUEST_NEWS, REQUEST_UPD_RELATION,
} from './actionTypes';
import {API_BASE} from '../../../config';

export const fetchAnnounces = () => {
    return (dispatch, getState) => {
        const updatedAt = getState().posts.announces.updatedAt;
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
                path: `seminars_for_mobile_user/${getState().user.installationId}`,
                queryParams
            }
        );

        return dispatch({
            [RSAA]: {
                endpoint,
                method: 'GET',
                types: [
                    REQUEST_ANNOUNCES,
                    RECEIVE_ANNOUNCES,
                    FAIL_GET_ANNOUNCES
                ]
            }
        });
    }
};

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
                path: `news_for_mobile_user/${getState().user.installationId}`,
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

export const updRelation = (announceId, relation) => {
    return (dispatch, getState) => {
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
                path: `add_relation/${getState().user.installationId}`,
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
                    seminar_id: announceId,
                    relation
                }),
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

export const getRelation = announceId => {
    return (dispatch, getState) => {
        let queryParams = {
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
                path: `relation/${getState().user.installationId}`,
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