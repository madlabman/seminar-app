import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';

import MaskedFormInput from '../../components/MaskedFormInput';
import openUserDefinitions from '../helpers/openUserDefinitions';

export default class SignUpScreen extends Component {

    state = {
        inputs: {
            name: '',
            email: '',
            phone: '',
        },
        errors: {
            name: null,
            email: null,
            phone: null,
        }
    };

    input = {};

    changeInput = (key, value) => {
        this.setState(prevState => {
            return {
                ...prevState,
                inputs: {
                    ...prevState.inputs,
                    [key]: value,
                },
            };
        });

        // Validate data
        // All fields required
        if (value.trim() === '') this.setError(key, 'Поле обязательно для заполнения!');
        else this.setError(key, null);

        switch (key) {
            case 'email':
                this.validateEmail(value);
                break;
        }
    };

    validateEmail = value => {
        let error = null;

        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) error = 'Неверный адрес электронной почты!';

        this.setError('email', error);
    };

    setError = (key, error) => {
        this.setState(prevState => {
            return {
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [key]: error,
                }
            }
        })
    };

    submitButtonPress = () => {
        openUserDefinitions();
    };

    render() {
        return (
            <View style={styles.container}>

                <Text h4 style={styles.header}>Введите данные, чтобы продолжить</Text>

                <ScrollView>
                    <FormLabel>Имя</FormLabel>
                    <FormInput placeholder={'Введите ваше имя'}
                               onChangeText={value => this.changeInput('name', value)}/>
                    <FormValidationMessage>{this.state.errors.name}</FormValidationMessage>

                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder={'Введите ваш почтовый адрес'} keyboardType={'email-address'}
                               onChangeText={value => this.changeInput('email', value)}
                               autoCapitalize={'none'}/>
                    <FormValidationMessage>{this.state.errors.email}</FormValidationMessage>

                    <FormLabel>Номер телефона</FormLabel>
                    <MaskedFormInput
                        placeholder={'Введите номер телефона'}
                        keyboardType={'phone-pad'}
                        onChangeText={(formatted, extracted) => {
                            this.changeInput('phone', extracted)
                        }}
                        mask={"+7 ([000]) [000] [00] [00]"}/>
                    <FormValidationMessage>{this.state.errors.phone}</FormValidationMessage>

                    <Text style={styles.spacer}></Text>

                    <Button title={'Зарегистрироваться'} backgroundColor={'#000'} onPress={this.submitButtonPress}/>
                </ScrollView>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        margin: 15,
        textAlign: 'center'
    },
    spacer: {
        marginTop: 10
    }
});