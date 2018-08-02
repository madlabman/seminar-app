import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PostList from '../../components/SummaryPostList';
import PropTypes from 'prop-types';

export default class PostsScreen extends Component {
    handlePostPress = item => {
        this.props.navigator.push({
            screen: 'seminar.SinglePostScreen',
            passProps: {
                item,
                isAnnounce: this.props.isAnnounce
            },
        })
    };

    render() {
        return (
            <View style={styles.container}>
                <PostList
                    posts={this.props.posts}
                    onPress={this.handlePostPress}
                    isLoading={this.props.isLoading}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20
    },
    title: {
        margin: 15,
        textAlign: 'center'
    }
});

PostsScreen.propTypes = {
    posts: PropTypes.array.isRequired,
    isAnnounce: PropTypes.bool
};