import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';

import PostList from '../components/SummaryPostList';

export default class MainScreen extends Component {

    state = {
        posts: [
            {
                key: '1',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Заголовок',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...'
            },
            {
                key: '2',
                thumbnail: {
                    uri: 'https://images.pexels.com/photos/217114/pexels-photo-217114.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                },
                title: 'Заголовок 2',
                excerpt: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому...'
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

    onAnnouncePress = key => {
        console.log(key);
    };

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>

                    <Text h4 style={styles.listHeader}>Анонсы</Text>
                    <PostList posts={this.state.posts} onPress={this.onAnnouncePress}/>
                    <View style={styles.buttonContainer}>
                        <Button title={'Все анонсы'} icon={{name: 'bullhorn', type: 'font-awesome'}}
                                backgroundColor={'#000'} buttonStyle={styles.allPostsButton}/>
                    </View>

                    <Text h4 style={styles.listHeader}>Новости</Text>
                    <PostList posts={this.state.posts} onPress={this.onAnnouncePress}/>
                    <View style={styles.buttonContainer}>
                        <Button title={'Все новости'} icon={{name: 'web', type: 'evil-icons'}}
                                backgroundColor={'#000'}
                                buttonStyle={styles.allPostsButton}/>
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
        width: 200
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
});