import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Communication from 'react-native-communications';
import firebase from 'react-native-firebase';
import {connect} from 'react-redux';

import PostList from '../../components/SummaryPostList';
import MainSlider from '../../components/MainSlider/MainSlider';
import {FEEDBACK_PHONE, FEEDBACK_EMAIL, FEEDBACK_SUBJECT} from '../../../config/index';
import {setCurrentAnnounce, fetchAnnounces} from '../../store/actions';

class MainScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000',
    };

    state = {
        slides: [
            {
                title: 'Скриншот из игры. Описание по ссылке.',
                image: {
                    uri: 'https://images.alphacoders.com/109/109601.jpg'
                }
            },
            {
                title: 'А это скриншот из одноименного фильма.',
                image: {
                    uri: 'https://www.slantmagazine.com/images/made/assets/film/alienvspredatorrequiem_1130_430_90_s_c1.jpg'
                }
            }
        ]
    };

    onItemPress = (item, type) => {
        this.props.navigator.push({
            screen: 'seminar.SinglePostScreen',
            passProps: {
                item,
                type
            },
        })
    };

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'
            && event.id === 'menu-toggle') {
            this.props.navigator.toggleDrawer();
        }
    };

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);

        // Register device on FCM
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    // user has a device token
                    console.log(fcmToken);
                } else {
                    // user doesn't have a device token yet
                    console.log('Has no token');
                }
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
                        });
                }
            });

        // Fetch announces
        this.props.fetchAnnounces(
            this.props.announces.updatedAt === null // fetch old announces
        );
    }

    render() {
        return (
            <View style={styles.page}>
                <ScrollView style={styles.container}>

                    <MainSlider slides={this.state.slides}/>

                    <View style={styles.buttonContainer}>
                        <Text h4 style={styles.listHeader}>Анонсы</Text>
                        <Button title={'Все анонсы'} icon={{name: 'bullhorn', type: 'font-awesome', color: '#545454'}}
                                backgroundColor={'transparent'}
                                color={'#545454'}
                                buttonStyle={styles.allPostsButton}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'seminar.PostsScreen',
                                        title: 'Анонсы',
                                        passProps: {
                                            type: 'announce',
                                            posts: this.props.announces
                                        }
                                    })
                                }}/>
                    </View>
                    <PostList
                        posts={this.props.announces}
                        onPress={this.onItemPress}
                        type={'announce'}
                        isLoading={this.props.announcesIsLoading}
                    />

                    <View style={styles.buttonContainer}>
                        <Text h4 style={styles.listHeader}>Новости</Text>
                        <Button title={'Все новости'} icon={{name: 'web', type: 'evil-icons', color: '#545454'}}
                                backgroundColor={'transparent'}
                                color={'#545454'}
                                buttonStyle={styles.allPostsButton}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'seminar.PostsScreen',
                                        title: 'Новости',
                                        passProps: {
                                            type: 'news',
                                            posts: this.props.news
                                        }
                                    })
                                }}/>
                    </View>
                    <PostList
                        posts={this.props.news}
                        onPress={this.onItemPress}
                        type={'news'}
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
        textAlign: 'center'
    },
    page: {
        flex: 1
    },
    container: {
        marginBottom: 30
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
        justifyContent: 'center'
    },
    feedbackButton: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5
    }
});

const mapStateToProps = state => {
    return {
        announces: state.announces.recentItems,
        announcesIsLoading: state.announces.isLoading,
        news: state.news.recentItems,
        newsIsLoading: state.news.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentAnnounce: post => dispatch(setCurrentAnnounce(post)),
        fetchAnnounces: needFetchOld => dispatch(fetchAnnounces(needFetchOld)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);