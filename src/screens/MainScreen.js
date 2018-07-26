import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Communication from 'react-native-communications';

import PostList from '../components/SummaryPostList';
import {feedbackPhone, feedbackEmail, feedbackSubject} from '../../config';

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
                title: 'Заголовок',
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
    }

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>

                    <Text h4 style={styles.listHeader}>Анонсы</Text>
                    <PostList posts={this.state.posts} onPress={this.onItemPress} type={'announce'}/>
                    <View style={styles.buttonContainer}>
                        <Button title={'Все анонсы'} icon={{name: 'bullhorn', type: 'font-awesome'}}
                                backgroundColor={'#000'} buttonStyle={styles.allPostsButton}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'seminar.PostsScreen',
                                        passProps: {
                                            type: 'announce'
                                        }
                                    })
                                }}/>
                    </View>

                    <Text h4 style={styles.listHeader}>Новости</Text>
                    <PostList posts={this.state.posts} onPress={this.onItemPress} type={'news'}/>
                    <View style={styles.buttonContainer}>
                        <Button title={'Все новости'} icon={{name: 'web', type: 'evil-icons'}}
                                backgroundColor={'#000'}
                                buttonStyle={styles.allPostsButton}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'seminar.PostsScreen',
                                        passProps: {
                                            type: 'news'
                                        }
                                    })
                                }}/>
                    </View>

                    <Text h4 style={styles.listHeader}>Связаться с нами</Text>
                    <View style={styles.feedbackContainer}>
                        <Button title={'Позвонить'} buttonStyle={styles.feedbackButton} backgroundColor={'#57d648'}
                                icon={{name: 'phone'}}
                                onPress={() => {
                                    Communication.phonecall(feedbackPhone, false);
                                }}/>
                        <Button title={'Написать'} buttonStyle={styles.feedbackButton} backgroundColor={'#0265bd'}
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
        borderRadius: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    feedbackContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    feedbackButton: {
        borderRadius: 5
    }
});