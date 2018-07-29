import {RSAA} from 'redux-api-middleware';

import {API_BASE} from '../../../config';
import {REQUEST_CITIES, RECEIVE_CITIES, FAIL_GET_CITIES} from './actionTypes';

export const fetchCities = () => (
    {
        [RSAA]: {
            endpoint: API_BASE + '/cities',
            method: 'GET',
            types: [
                REQUEST_CITIES,
                RECEIVE_CITIES,
                FAIL_GET_CITIES
            ]
        }
    }
);