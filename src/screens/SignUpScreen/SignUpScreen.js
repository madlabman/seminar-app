import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, ScrollView, View} from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import configureStore from '../../store/store';
import {uiStartLoading, uiStopLoading} from '../../store/actions';

import MaskedFormInput from '../../components/MaskedFormInput';
import openUserDefinitions from '../helpers/openUserDefinitions';

class SignUpScreen extends Component {

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
        },
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
        this.props.startLoading();
        setTimeout(() => {
            //this.props.stopLoading();
        }, 2000)
    };

    render() {

        let submitBlock = !this.props.isLoading ?
            (
                <Button title={'Зарегистрироваться'} backgroundColor={'#000'} onPress={this.submitButtonPress}/>
            ) :
            (
                <ActivityIndicator color={'#000'}/>
            );

        return (
            <View style={styles.container}>

                <Text h4 style={styles.header}>Введите данные, чтобы продолжить</Text>

                <ScrollView>
                    <FormLabel>Имя</FormLabel>
                    <FormInput placeholder={'Введите ваше имя'}
                               onChangeText={value => this.changeInput('name', value)}
                               value={this.state.inputs.name}/>
                    <FormValidationMessage>{this.state.errors.name}</FormValidationMessage>

                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder={'Введите ваш почтовый адрес'} keyboardType={'email-address'}
                               onChangeText={value => this.changeInput('email', value)}
                               autoCapitalize={'none'}
                               value={this.state.email}/>
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

                    <Text style={styles.spacer}/>

                    {submitBlock}
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startLoading: () => dispatch(uiStartLoading()),
        stopLoading: () => dispatch(uiStopLoading()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);