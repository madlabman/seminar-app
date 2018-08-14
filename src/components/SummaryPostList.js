import React, {Component} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';
import {Icon, Text} from 'react-native-elements';
import moment from 'moment';
import {MAIN_COLOR} from "../../config";

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
                                        <CachedImage source={item.thumbnail} style={styles.thumbnail}/>
                                    </View>
                                    <View style={styles.innerContainer}>
                                        <View style={styles.dateContainer}>
                                            <Icon name={'md-calendar'} type='ionicon'/>
                                            <Text style={styles.date}>{moment(item.date).format('DD.MM.YYYY')}</Text>
                                        </View>
                                        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
                                    </View>
                                </View>
                                <View style={styles.excerptContainer}>
                                    <Text style={styles.excerpt} numberOfLines={4}>{item.excerpt}</Text>
                                </View>
                                <View style={styles.learnMoreContainer}>
                                    <Text style={styles.learnMore}>Читать подробнее</Text>
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
        marginHorizontal: 10
    },
    innerContainer: {
        flex: 1,
        marginHorizontal: 10
    },
    excerptContainer: {
        paddingHorizontal: 15
    },
    learnMoreContainer: {
        alignItems: 'flex-end',
        paddingRight: 20,
        paddingTop: 8
    },
    learnMore: {
        paddingBottom: 8,
        color: MAIN_COLOR
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