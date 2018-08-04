import React, {Component} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import {signUp} from '../../store/actions';


import MaskedFormInput from '../../components/MaskedFormInput';
import openUserDefinitions from '../helpers/openUserDefinitions';

class SignUpScreen extends Component {

    state = {
        inputs: {
            first_name: '',
            email: '',
            phone: '',
        },
        errors: {
            first_name: null,
            email: null,
            phone: null,
        },
    };

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
        let hasError = false;
        Object.keys(this.state.errors).forEach(key => {
            if (this.state.errors[key] !== null) hasError = true;
        });
        if (!hasError) this.props.signUp(this.state.inputs);
    };

    render() {

        let errors = this.props.errors.map((item, index) => {
            return (
                <FormValidationMessage key={index}>{item}</FormValidationMessage>
            )
        });

        return (
            <View style={styles.container}>

                <Text h4 style={styles.header}>Введите данные, чтобы продолжить</Text>

                <ScrollView>

                    {errors}

                    <FormLabel>Имя</FormLabel>
                    <FormInput placeholder={'Введите ваше имя'}
                               onChangeText={value => this.changeInput('first_name', value)}
                               value={this.state.inputs.first_name}/>
                    <FormValidationMessage>{this.state.errors.first_name}</FormValidationMessage>

                    <FormLabel>Email</FormLabel>
                    <FormInput placeholder={'Введите ваш почтовый адрес'} keyboardType={'email-address'}
                               onChangeText={value => this.changeInput('email', value)}
                               autoCapitalize={'none'}
                               value={this.state.inputs.email}/>
                    <FormValidationMessage>{this.state.errors.email}</FormValidationMessage>

                    <FormLabel>Номер телефона</FormLabel>
                    <MaskedFormInput
                        placeholder={'Введите номер телефона'}
                        keyboardType={'phone-pad'}
                        onChangeText={(formatted, extracted) => {
                            this.changeInput('phone', extracted)
                        }}
                        mask={"+7 ([000]) [000] [00] [00]"}
                        value={this.state.inputs.phone}
                    />
                    <FormValidationMessage>{this.state.errors.phone}</FormValidationMessage>

                    <Text style={styles.spacer}/>

                    <Button title={'Зарегистрироваться'}
                            backgroundColor={'#000'}
                            disabledStyle={{backgroundColor: '#888'}}
                            onPress={this.submitButtonPress}
                            loading={this.props.isLoading}
                            disabled={this.props.isLoading}
                    />

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
        isSignedUp: state.user.isSignedUp,
        isLoading: state.user.isProcessRequest,
        errors: state.user.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: data => dispatch(signUp(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);