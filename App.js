import {Provider} from 'react-redux'
import firebase from 'react-native-firebase'
import {AsyncStorage} from 'react-native'

import openSplashScreen from './src/screens/helpers/openSplashScreen'
import {registerScreens} from './src/screens'
import configureStore from './src/store/store'
import {receivedNotification} from './src/store/actions';

export default class App {
    constructor() {
        // Create store
        const {store, persistor} = configureStore()

        // Build a channel
        const channel = new firebase.notifications.Android.Channel('seminar_pro_notification', 'Seminar PRO Channel',
            firebase.notifications.Android.Importance.Default)
            .setDescription('Seminar PRO application channel');
        // Create the channel
        firebase.notifications().android.createChannel(channel);

        // App closed or in background
        firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            // const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification;
            console.log('[sa-32]: application received notification in background with post_id', notification.data.post_id)
            // Dispatch action
            // Notification duplicates every time app is openings.
            // For avoiding this issue store last seen notification ID and compare with fired.
            const notificationIDkey = 'seminar@last_notification_id'
            AsyncStorage.getItem(notificationIDkey)
                .then(notificationId => {
                    if (notification._notificationId !== notificationId) {
                        AsyncStorage.setItem(notificationIDkey, notification._notificationId)
                            .then(() => {
                                store.dispatch(receivedNotification(notification))
                            })
                    }
                })
        })

        // Start app
        registerScreens(store, Provider)
        openSplashScreen(store, persistor)
    }
}