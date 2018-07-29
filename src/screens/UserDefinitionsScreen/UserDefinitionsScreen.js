import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Divider, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import openMainApp from '../helpers/openMainApp';

class UserDefinitionsScreen extends Component {

    state = {
        checked: false
    };

    handleCheckboxPress = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                checked: !prevState.checked,
            }
        })
    };

    handleSubmitButton = () => {
        openMainApp();
    };

    render() {

        let cities = this.props.isCitiesLoading ?
            (
                <ActivityIndicator color={'#000'} />
            ) :
            (
                <View>
                    <CheckBox
                        title='Астрахань'
                        checked={this.state.checked}
                        onPress={this.handleCheckboxPress}
                    />
                    <CheckBox
                        title='Москва'
                        checked={this.state.checked}
                        onPress={this.handleCheckboxPress}
                    />
                </View>
            );

        let subjects = this.props.isSubjectsLoading ?
            (
                <ActivityIndicator color={'#000'} />
            ) :
            (
                <View>
                    <CheckBox
                        title='Рыбная ловля'
                        checked={this.state.checked}
                        onPress={this.handleCheckboxPress}
                    />
                    <CheckBox
                        title='Карпы'
                        checked={this.state.checked}
                        onPress={this.handleCheckboxPress}
                    />
                </View>
            );

        return (
            <View>

                <Text style={styles.title}>Выберите интересующие вас города и тематики</Text>

                <Text style={styles.sectionTitle}>Города</Text>
                {cities}

                <View style={styles.spacer}/>

                <Text style={styles.sectionTitle}>Тематики</Text>
                {subjects}

                <Button title={'Продолжить'} backgroundColor={'transparent'} textStyle={{color: '#000'}}
                        onPress={this.handleSubmitButton}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginVertical: 15,
        marginHorizontal: 50,
        textAlign: 'center',
        fontSize: 16
    },
    sectionTitle: {
        marginLeft: 15,
        marginBottom: 10
    },
    spacer: {
        height: 10
    }
});

const mapStateToProps = state => {
    return {
        isCitiesLoading: state.cities.isLoading,
        isSubjectsLoading: state.subjects.isLoading
    }
};

export default connect(mapStateToProps)(UserDefinitionsScreen);