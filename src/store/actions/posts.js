import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';
import moment from 'moment';

import {
    FAIL_GET_ANNOUNCES, FAIL_GET_NEWS, FAIL_UPD_RELATION,
    RECEIVE_ANNOUNCES, RECEIVE_NEWS, RECEIVE_UPD_RELATION,
    REQUEST_ANNOUNCES, REQUEST_NEWS, REQUEST_UPD_RELATION,
} from './actionTypes';
import {API_BASE} from '../../../config';
import createStore from '../store';

export const fetchAnnounces = () => {

    const {store} = createStore();

    const updatedAt = store.getState().posts.announces.updatedAt;
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
            path: `seminars_for_mobile_user/${store.getState().user.installationId}`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_ANNOUNCES,
                RECEIVE_ANNOUNCES,
                FAIL_GET_ANNOUNCES
            ]
        }
    }
};

export const fetchNews = () => {

    const {store} = createStore();

    const updatedAt = store.getState().posts.news.updatedAt;
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
            path: `news_for_mobile_user/${store.getState().user.installationId}`,
            queryParams
        }
    );

    return {
        [RSAA]: {
            endpoint,
            method: 'GET',
            types: [
                REQUEST_NEWS,
                RECEIVE_NEWS,
                FAIL_GET_NEWS
            ]
        }
    }
};

export const updRelation = (announceId, relation) => {

    const {store} = createStore();

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
            path: `add_relation/${store.getState().user.installationId}`,
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
                seminar_id: announceId,
                relation
            }),
            types: [
                REQUEST_UPD_RELATION,
                RECEIVE_UPD_RELATION,
                FAIL_UPD_RELATION
            ]
        }
    }
};