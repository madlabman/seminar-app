import {RSAA} from 'redux-api-middleware';
import buildUrl from 'build-url';
import moment from 'moment';

import {
    FAIL_GET_ANNOUNCES, FAIL_GET_NEWS,
    RECEIVE_ANNOUNCES, RECEIVE_NEWS,
    REQUEST_ANNOUNCES, REQUEST_NEWS,
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