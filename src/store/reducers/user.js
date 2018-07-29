import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import {RECEIVE_SIGN_UP, RECEIVE_USER, REQUEST_SIGN_UP, REQUEST_USER} from '../actions/actionTypes';

const initialState = {
    name: null,
    email: null,
    installation_id: null,
    isSignedUp: false,
    isProcessRequest: false,
    errors: []
};

const userReducer = (userState = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
        case REQUEST_SIGN_UP:
            return {
                ...userState,
                isProcessRequest: true
            };
        case RECEIVE_USER:
            return {
                ...userState,
                ...action.payload,
                isProcessRequest: false
            };
        case RECEIVE_SIGN_UP: {
            let returnState = {
                installation_id: userState.installation_id,
                isSignedUp: false,
                errors: []
            };

            if (action.payload) {
                if (action.payload.success === true) {
                    returnState.installation_id = action.payload.data.installation_id;
                    returnState.isSignedUp = true;
                } else {
                    Object.keys(action.payload.data).forEach((key) => {
                        returnState.errors.push(action.payload.data[key]);
                    })
                }
            } else {
                returnState.errors = ['Ошибка сервера, повторите позднее!'];
            }

            return {
                ...userState,
                ...returnState,
                isProcessRequest: false
            };
        }
        default:
            return userState;
    }
};

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: ['errors', 'isProcessRequest']
};

export default persistReducer(persistConfig, userReducer);