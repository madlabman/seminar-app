import React, {Component} from 'react'
import {Alert, Platform, ScrollView, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import Communication from 'react-native-communications'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'
import buildUrl from 'build-url'

import MainSlider from '../../components/MainSlider/MainSlider'
import PushNotificationController from '../../components/PushNotificationController'
import {
    FEEDBACK_PHONE,
    MAIN_COLOR,
    ARCHIVE_LINK,
    ONLY_CONTENT_PARAM
} from '../../../config';
import {
    fetchAnnounces,
    fetchNews,
    fetchSlides,
    notificationOpened,
    updateFCM,
    getSingleAnnounce
} from '../../store/actions';

class MainScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000'
    }

    handlePostPress = (item, isAnnounce) => {
        this.props.navigator.push({
            screen: 'seminar.SinglePostScreen',
            passProps: {
                item,
                isAnnounce
            },
            animationType: Platform.OS === 'android' ? 'slide-horizontal' : ''
        })
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress')
            switch (event.id) {
                case 'menu-toggle':
                    this.props.navigator.toggleDrawer();
                    break;
                case 'account':
                    this.props.navigator.push({
                        screen: 'seminar.UserDefinitionsScreen',
                        animationType: Platform.OS === 'android' ? 'slide-horizontal' : ''
                    });
                    break;
            }
    }

    showPosts = isAnnounce => {
        this.props.navigator.push({
            screen: 'seminar.PostsScreen',
            title: isAnnounce ? 'Семинары' : 'Новости',
            passProps: {
                isAnnounce,
                posts: isAnnounce ? this.props.announces : this.props.news
            },
            animationType: Platform.OS === 'android' ? 'slide-horizontal' : ''
        })
    };

    showBrowser = item => {
        this.props.navigator.showModal({
            screen: 'seminar.BrowserScreen',
            passProps: {
                uri: item.link.uri
            },
        })
    };

    componentDidMount() {
        this.props.navigator.setStyle({navBarCustomView: 'seminar.TopBar'})
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)

        // Register device on FCM
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    // User has a device token
                    this.props.updateFCM(fcmToken);
                } else {
                    // user doesn't have a device token yet
                    console.log('Has no token');
                }
            })
            .catch(error => {
                console.log('Cannot get FCM token');
                console.log(error);
            })

        // Check permissions
        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    // user has permissions
                    console.log('[Info]: Has permissions to send notifications');
                } else {
                    // user doesn't have permission
                    firebase.messaging().requestPermission()
                        .then(() => {
                            // User has authorised
                            console.log('[Info]: User grant permission');
                        })
                        .catch(error => {
                            // User has rejected permissions
                            console.log('[Info]: User rejected');
                            Alert.alert('Внимание', 'Вы отказались от приема важных уведомлений')
                        });
                }
            })

        // App in foreground
        this.onForegroundNotification = firebase.notifications().onNotification(notification => {
            console.log('[sa-32]: application received notification in foreground with post_id', notification.data.post_id)
            this.openSingleAnnounce(notification.data.post_id)
        })

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            this.props.updateFCM(fcmToken);
        })

        // Fetch announces
        this.props.fetchAnnounces(this.props.forceUpdate)
        // Fetch news
        this.props.fetchNews()
        //Fetch slider
        this.props.fetchSlides()
    }

    handleMailButtonPress = () => {
        this.props.navigator.showModal({
            screen: 'seminar.QuestionFormScreen'
        });
    };

    handleArchiveButtonPress = () => {
        this.props.navigator.showModal({
            screen: 'seminar.BrowserScreen',
            passProps: {
                uri: buildUrl(
                    ARCHIVE_LINK,
                    {
                        queryParams: {
                            [ONLY_CONTENT_PARAM]: true
                        }
                    }
                )
            },
        })
    };

    handleCallback = () => {
        Alert.alert(
            'Связаться с нами',
            'Вы можете связаться с нами следующими способами',
            [
                {
                    text: 'Позвонить',
                    onPress: () => { Communication.phonecall(FEEDBACK_PHONE, false); }
                },
                {
                    text: 'Написать',
                    onPress: this.handleMailButtonPress
                },
                {
                    text: 'Закрыть',
                    style: 'cancel'
                }
            ],
        )
    }

    openSingleAnnounce = postId => {
        this.props.notificationOpened()
        firebase.notifications().cancelAllNotifications()
        this.props.getSingleAnnounce(postId)
            .then(announce => {
                if (announce) {
                    this.props.navigator.push({
                        screen: 'seminar.SinglePostScreen',
                        passProps: {
                            item: announce,
                            isAnnounce: true
                        },
                    })
                }
            })
    }

    componentWillUnmount() {
        this.onTokenRefreshListener()
        this.onForegroundNotification()
    }

    render() {
        const pushNotificationController = this.props.notification ?
            (<PushNotificationController onNotificationReceived={this.openSingleAnnounce} notification={this.props.notification}/>)
            : null

        return (
            <View style={styles.page}>
                <ScrollView style={styles.container}>

                    <MainSlider
                        slides={this.props.slides.items}
                        onSlidePress={this.showBrowser}
                    />

                    <Button
                        title={'Анонсы'}
                        backgroundColor={MAIN_COLOR}
                        color={'#fff'}
                        buttonStyle={styles.mainButton}
                        onPress={() => this.showPosts(true)}
                    />

                    <Button
                        title={'Прошедшие семинары'}
                        backgroundColor={MAIN_COLOR}
                        color={'#fff'}
                        buttonStyle={styles.mainButton}
                        onPress={this.handleArchiveButtonPress}
                    />

                    <Button
                        title={'Связаться с нами'}
                        backgroundColor={MAIN_COLOR}
                        color={'#fff'}
                        buttonStyle={styles.mainButton}
                        onPress={this.handleCallback}
                    />

                </ScrollView>

                {pushNotificationController}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    listHeader: {
        margin: 15,
        textAlign: 'center',
        color: MAIN_COLOR
    },
    page: {
        flex: 1
    },
    container: {
        //
    },
    mainButton: {
        marginVertical: 10,
        paddingVertical: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feedbackContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 30
    },
    feedbackButton: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5
    }
});

const mapStateToProps = state => {
    return {
        announces: state.posts.announces.recentItems,
        announcesIsLoading: state.posts.announces.isLoading,
        news: state.posts.news.recentItems,
        newsIsLoading: state.posts.news.isLoading,
        slides: state.slides,
        notification: state.ui.notification
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAnnounces: forceUpdate => dispatch(fetchAnnounces(forceUpdate)),
        fetchNews: () => dispatch(fetchNews()),
        fetchSlides: () => dispatch(fetchSlides()),
        updateFCM: token => dispatch(updateFCM(token)),
        notificationOpened: () => dispatch(notificationOpened()),
        getSingleAnnounce: postId => dispatch(getSingleAnnounce(postId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);