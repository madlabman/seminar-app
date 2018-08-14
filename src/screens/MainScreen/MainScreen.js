import React, {Component} from 'react';
import {Alert, Platform, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Communication from 'react-native-communications';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

import PostList from '../../components/SummaryPostList';
import MainSlider from '../../components/MainSlider/MainSlider';
import {FEEDBACK_PHONE, FEEDBACK_EMAIL, FEEDBACK_SUBJECT, MAIN_COLOR} from '../../../config/index';
import {fetchAnnounces, fetchNews, updateFCM} from '../../store/actions';

class MainScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000',
        navBarCustomView: 'seminar.TopBar'
    };

    state = {
        slides: [
            {
                image: {
                    uri: 'http://seminar-pro.ru/wp-content/uploads/2018/06/АСТ-Вариант-1.png'
                },
                link: {
                    uri: 'http://seminar-pro.ru/announces/astraxan-13-avgusta-2018-goda-seminar-po-oxrane-truda-oxrana-truda-2018-chto-izmenilos-i-chto-eshhe-zhdet-vperedi/'
                }
            },
            {
                image: {
                    uri: 'http://seminar-pro.ru/wp-content/uploads/2018/07/Отзывы.png'
                },
                link: {
                    uri: 'http://seminar-pro.ru/reviews/otzyvy-ot-uchastnikov-posetivshix-nashi-seminary-vo-vtorom-polugodii-2017-goda/'
                }
            },
            {
                image: {
                    uri: 'http://seminar-pro.ru/wp-content/uploads/2018/06/Вариант-3.png'
                },
                link: {
                    uri: 'http://seminar-pro.ru/archive/'
                }
            },
            {
                image: {
                    uri: 'http://seminar-pro.ru/wp-content/uploads/2018/07/650x400-600x400.png'
                },
                link: {
                    uri: 'https://partner.tochka.com/partnership/?referer1=34mrpseminarpro'
                }
            }
        ]
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
        if (event.type === 'NavBarButtonPress'
            && event.id === 'menu-toggle') {
            this.props.navigator.toggleDrawer();
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
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

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
            });

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
            });

        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            this.props.updateFCM(fcmToken);
        });

        // Fetch announces
        this.props.fetchAnnounces();
        // Fetch news
        this.props.fetchNews();
    }

    componentWillUnmount() {
        this.onTokenRefreshListener();
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView style={styles.container}>

                    <MainSlider
                        slides={this.state.slides}
                        onSlidePress={this.showBrowser}
                    />

                    <View style={styles.buttonContainer}>
                        <Text h4 style={styles.listHeader}>Анонсы</Text>
                        <Button title={'Все анонсы'} icon={{name: 'bullhorn', type: 'font-awesome', color: '#545454'}}
                                backgroundColor={'transparent'}
                                color={'#545454'}
                                buttonStyle={styles.allPostsButton}
                                onPress={() => this.showPosts(true)}/>
                    </View>
                    <PostList
                        posts={this.props.announces}
                        onPress={this.handlePostPress}
                        isAnnounce={true}
                    />

                    <View style={styles.buttonContainer}>
                        <Text h4 style={styles.listHeader}>Новости</Text>
                        <Button title={'Все новости'}
                                icon={{name: 'web', type: 'evil-icons', color: '#545454'}}
                                backgroundColor={'transparent'}
                                color={'#545454'}
                                buttonStyle={styles.allPostsButton}
                                onPress={() => this.showPosts()}/>
                    </View>
                    <PostList
                        posts={this.props.news}
                        onPress={this.handlePostPress}
                    />

                    <Text h4 style={styles.listHeader}>Связаться с нами</Text>
                    <View style={styles.feedbackContainer}>
                        <Button title={'Позвонить'} buttonStyle={styles.feedbackButton} backgroundColor={'#3d9733'}
                                icon={{name: 'phone'}}
                                onPress={() => {
                                    Communication.phonecall(FEEDBACK_PHONE, false);
                                }}/>
                        <Button title={'Написать'} buttonStyle={styles.feedbackButton} backgroundColor={'#47698b'}
                                icon={{name: 'email'}}
                                onPress={() => {
                                    Communication.email([FEEDBACK_EMAIL], null, null, FEEDBACK_SUBJECT, null);
                                }}/>
                    </View>

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
    allPostsButton: {
        width: 180,
        borderRadius: 5,
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAnnounces: () => dispatch(fetchAnnounces()),
        fetchNews: () => dispatch(fetchNews()),
        updateFCM: token => dispatch(updateFCM(token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);