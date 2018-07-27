import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Communication from 'react-native-communications';
import firebase from 'react-native-firebase';

import PostList from '../../components/SummaryPostList';
import {feedbackPhone, feedbackEmail, feedbackSubject} from '../../../config/index';

export default class MainScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000',
    };

    state = {
        posts: [
            {
                key: '1',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Охрана труда – 2018: что изменилось и что еще ждет впереди',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...',
                permalink: {
                    uri: 'http://seminar-pro.ru/announces/volgograd-2-avgusta-2018-goda-seminar-po-oxrane-truda-oxrana-truda-2018-chto-izmenilos-i-chto-eshhe-zhdet-vperedi/',
                }
            },
            {
                key: '2',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/217114/pexels-photo-217114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Заголовок 2',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...',
                permalink: {
                    uri: 'http://seminar-pro.ru/archive/28-maya-2018-goda-v-gorode-volgograd-sostoyalsya-buxgalterskij-seminar-nalogovyj-kontrol-v-2018-godu-novye-trendy-sposoby-zashhity-interesov-nalogoplatelshhika-2/',
                }
            },
            {
                key: '3',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/36985/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Заголовок 3',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...'
            },
            {
                key: '4',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/108792/pexels-photo-108792.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Заголовок 4',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...'
            },
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
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>

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
                                            type: 'announce'
                                        }
                                    })
                                }}/>
                    </View>
                    <PostList posts={this.state.posts} onPress={this.onItemPress} type={'announce'}/>

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
                                            type: 'news'
                                        }
                                    })
                                }}/>
                    </View>
                    <PostList posts={this.state.posts} onPress={this.onItemPress} type={'news'}/>

                    <Text h4 style={styles.listHeader}>Связаться с нами</Text>
                    <View style={styles.feedbackContainer}>
                        <Button title={'Позвонить'} buttonStyle={styles.feedbackButton} backgroundColor={'#3d9733'}
                                icon={{name: 'phone'}}
                                onPress={() => {
                                    Communication.phonecall(feedbackPhone, false);
                                }}/>
                        <Button title={'Написать'} buttonStyle={styles.feedbackButton} backgroundColor={'#47698b'}
                                icon={{name: 'email'}}
                                onPress={() => {
                                    Communication.email([feedbackEmail], null, null, feedbackSubject, null);
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