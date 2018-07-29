import {RSAA} from 'redux-api-middleware';

import {REQUEST_SUBJECTS, RECEIVE_SUBJECTS, FAIL_GET_SUBJECTS} from './actionTypes';
import {API_BASE, DEBUG_PARAM} from '../../../config';

export const fetchSubjects = () => {
    return {
        [RSAA]: {
            endpoint: `${API_BASE}/subjects${DEBUG_PARAM}`,
            method: 'GET',
            types: [
                REQUEST_SUBJECTS,
                RECEIVE_SUBJECTS,
                FAIL_GET_SUBJECTS
            ]
        }
    }
};