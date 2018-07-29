import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import {incrementDebugOpenCounter, fetchCities} from '../../store/actions';

class DebugScreen extends Component {
    componentDidMount() {
        this.props.debugIncrement();
    }

    render() {
        return (
            <View>
                <Text style={styles.pageTitle}>Здесь будет отладка разного рода</Text>
                <Text style={styles.defaultText}>Отладка была открыта (раз): {this.props.open_count}</Text>

                <Button title={'Fetch cities'} onPress={() => this.props.fetchCities()} buttonStyle={styles.defaultButton} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageTitle: {
        marginVertical: 20,
        textAlign: 'center'
    },
    defaultText: {
        marginHorizontal: 10
    },
    defaultButton: {
        marginVertical: 10,
        marginHorizontal: 0,
        width: 150
    }
});

const mapStateToProps = state => {
    return {
        open_count: state.debug.open_count
    }
};

const mapDispatchToProps = dispatch => {
    return {
        debugIncrement: () => dispatch(incrementDebugOpenCounter()),
        fetchCities: () => dispatch(fetchCities()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DebugScreen);