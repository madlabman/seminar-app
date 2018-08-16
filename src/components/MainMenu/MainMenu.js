import React, {Component} from 'react';
import {FlatList, Linking, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import buildUrl from 'build-url';

import {ONLY_CONTENT_PARAM} from '../../../config';

export default class MainMenu extends Component {
    handlePressLink = link => {
        // Toggle menu
        // Push to link
        this.props.navigator.showModal({
            screen: 'seminar.BrowserScreen',
            passProps: {
                uri: buildUrl(
                    link,
                    {
                        queryParams: {
                            [ONLY_CONTENT_PARAM]: true
                        }
                    }
                )
            },
        });
    };

    render() {
        return (
            <FlatList
                data={this.props.items}
                renderItem={({item}) => (
                    <TouchableWithoutFeedback onPress={() => this.handlePressLink(item.link)}>
                        <View style={styles.linkContainer}>
                            <Text style={styles.link}>{item.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            />
        )
    }
}

const styles = StyleSheet.create({
    linkContainer: {
        padding: 12
    },
    link: {
        fontSize: 16
    }
});

MainMenu.propTypes = {
    items: PropTypes.array.isRequired
};