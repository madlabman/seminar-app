import React, {Component} from 'react';
import {Alert, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Communication from 'react-native-communications';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';
import buildUrl from 'build-url';

import MainSlider from '../../components/MainSlider/MainSlider';
import {
    FEEDBACK_PHONE,
    MAIN_COLOR,
    ARCHIVE_LINK,
    ONLY_CONTENT_PARAM
} from '../../../config';
import {fetchAnnounces, fetchNews, fetchSlides, updateFCM} from '../../store/actions';

class MainScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000'
    };

    handlePostPress = (item, isAnnounce) => {
        this.props.navigator.push({
            screen: 'seminar.SinglePostScreen',
            passProps: {
                item,
                isAnnounce
            },
            animationType: Platform.OS === 'android' ? 'slide-horizontal' : ''
        })
    };

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
    };

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
        this.props.navigator.setStyle({ navBarCustomView: 'seminar.TopBar' })
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
    };

    componentWillUnmount() {
        this.onTokenRefreshListener();
    }

    render() {
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
        slides: state.slides
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAnnounces: forceUpdate => dispatch(fetchAnnounces(forceUpdate)),
        fetchNews: () => dispatch(fetchNews()),
        fetchSlides: () => dispatch(fetchSlides()),
        updateFCM: token => dispatch(updateFCM(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);