import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PostList from '../components/SummaryPostList';
import {Text} from 'react-native-elements';

export default class PostsScreen extends Component {

    state = {
        refreshing: false,
    };

    onAnnouncePress = item => {
        this.props.navigator.push({
            screen: 'seminar.SinglePostScreen',
            passProps: {
                item
            },
        })
    };

    render() {
        const title = this.props.type === 'announce' ? 'Анонсы' : 'Новости';

        return (
            <View>
                <Text h4 style={styles.title}>{title}</Text>
                <PostList posts={this.props.posts} onPress={this.onAnnouncePress} refreshing={this.state.refreshing}/>
                <Text>Здесь будет происходить вывод записей, сохраненных в сторе с запросом обновлений при каждом открытии</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        margin: 15,
        textAlign: 'center'
    }
});