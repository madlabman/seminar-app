import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';
import {Icon, Text} from 'react-native-elements';
import moment from 'moment';

export default class SummaryPostList extends Component {
    render() {

        const postList = this.props.posts && this.props.posts.length ?
            (
                <FlatList
                    data={this.props.posts}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity onPress={() => this.props.onPress(item, this.props.isAnnounce)}>
                                <View style={styles.container}>
                                    <View>
                                        <View style={styles.dateContainer}>
                                            <Icon name={'md-calendar'} type='ionicon'/>
                                            <Text style={styles.date}>{moment(item.date).format('DD.MM.YYYY')}</Text>
                                        </View>
                                        <CachedImage source={item.thumbnail} style={styles.thumbnail}/>
                                    </View>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                        <Text style={styles.excerpt} numberOfLines={4}>{item.excerpt}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    {...this.props}
                />
            ) :
            (
                <Text style={styles.infoText}>Нет записей!</Text>
            );

        const activityIndicator = this.props.isLoading ? (<ActivityIndicator style={styles.activityIndicator}/>) : null;

        return (
            <View>
                {activityIndicator}
                {postList}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    thumbnail: {
        width: 100,
        height: 67
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    innerContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
    },
    excerpt: {
        color: '#545454',
    },
    date: {
        marginLeft: 5,
        color: '#000',
        textAlign: 'left',
        fontWeight: 'bold'
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoText: {
        textAlign: 'center'
    },
    activityIndicator: {
        marginBottom: 20
    }
});