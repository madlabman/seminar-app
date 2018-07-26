import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CachedImage} from 'react-native-cached-image';
import {Text} from 'react-native-elements';

export default class SummaryPostList extends Component {
    render() {
        return (
            <View>
                <FlatList
                    data={this.props.posts}
                    renderItem={
                        ({item}) => (
                            <TouchableOpacity onPress={() => this.props.onPress(item, this.props.type)}>
                                <View style={styles.container}>
                                    <View>
                                        <Text style={styles.date}>27.07.2018</Text>
                                        <CachedImage source={item.thumbnail} style={styles.thumbnail}/>
                                    </View>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.title}>{item.title}</Text>
                                        <Text style={styles.excerpt}>{item.excerpt}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    {...this.props}
                />
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
        textAlign: 'center',
        fontWeight: 'bold'
    }
});