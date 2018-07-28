import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, CheckBox, Text} from 'react-native-elements';

import openMainApp from '../helpers/openMainApp';

export default class UserDefinitionsScreen extends Component {

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
        return (
            <View>

                <Text style={styles.title}>Выберите интересующие вас города и тематики</Text>

                <Text style={styles.sectionTitle}>Города</Text>

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

                <View style={styles.spacer}/>

                <Text style={styles.sectionTitle}>Тематики</Text>
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