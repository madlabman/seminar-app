import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import {
    RECEIVE_SIGN_UP,
    RECEIVE_USER,
    RECEIVE_USER_UPDATE,
    REQUEST_SIGN_UP,
    REQUEST_USER,
    REQUEST_USER_UPDATE,
    UPDATE_FCM_TOKEN
} from '../actions/actionTypes';

const initialState = {
    name: null,
    email: null,
    installationId: null,
    isSignedUp: false,
    isSetupCompleted: false,
    isProcessRequest: false,
    fcmToken: null,
    errors: []
};

const userReducer = (userState = initialState, action) => {
    switch (action.type) {
        case REQUEST_USER:
        case REQUEST_SIGN_UP:
        case REQUEST_USER_UPDATE:
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
                ...userState,
                errors: []
            };
            if (action.payload) {
                if (action.payload.success === true) {
                    returnState.installationId = action.payload.data.installation_id;
                    returnState.isSignedUp = true;
                } else if (action.payload.data !== undefined) {
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
        case RECEIVE_USER_UPDATE: {
            let returnState = {
                ...userState,
                errors: []
            };
            if (action.payload) {
                if (action.payload.success === true) {
                    returnState.isSetupCompleted = true;
                } else if (action.payload.data !== undefined) {
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
        case UPDATE_FCM_TOKEN:
            return {
                ...userState,
                fcmToken: action.token
            };
        default:
            return {...userState, fcmToken: null};

    }
};

const persistConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: ['errors', 'isProcessRequest']
};

export default persistReducer(persistConfig, userReducer);