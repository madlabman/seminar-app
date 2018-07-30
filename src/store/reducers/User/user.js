import {persistReducer} from 'redux-persist';
import {AsyncStorage} from 'react-native';

import {
    RECEIVE_SIGN_UP,
    RECEIVE_USER,
    RECEIVE_USER_UPDATE,
    REQUEST_SIGN_UP,
    REQUEST_USER,
    REQUEST_USER_UPDATE
} from '../../actions/actionTypes';

const initialState = {
    name: null,
    email: null,
    installationId: null,
    isSignedUp: false,
    isSetupCompleted: false,
    isProcessRequest: false,
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