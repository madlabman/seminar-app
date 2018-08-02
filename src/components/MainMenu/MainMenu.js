import React, {Component} from 'react';
import {FlatList, Linking, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class MainMenu extends Component {
    handlePressLink = link => {
        Linking.openURL(link);
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