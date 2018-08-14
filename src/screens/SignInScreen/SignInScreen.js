import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements';
import {ScrollView, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

import {MAIN_COLOR} from '../../../config';
import {signIn} from '../../store/actions';
import validateEmail from '../helpers/validateEmail';

class SignInScreen extends Component {
    state = {
        inputs: {
            email: {
                value: '',
                containerStyle: {}
            },
            password: {
                value: '',
                containerStyle: {}
            }
        },
        errors: {
            email: null,
            password: null
        }
    };

    formModel = {
        email: {
            label: 'Email',
            placeholder: 'Введите ваш email',
            attrs: {
                autoCapitalize: 'none',
                autoCorrect: false
            }
        },
        password: {
            label: 'Пароль',
            placeholder: 'Введите пароль',
            attrs: {
                secureTextEntry: true
            }
        },
    };

    changeInput = (key, value) => {
        this.setInputState(key, {value});

        // Validate data
        // All fields required
        if (value.trim() === '') this.setErrorState(key, 'Поле обязательно для заполнения!');
        else this.setErrorState(key, null);

        switch (key) {
            case 'email':
                this.setErrorState('email', validateEmail(value));
                break;
        }
    };

    setInputState = (key, stateSlice) => {
        this.setState(prevState => {
            return {
                ...prevState,
                inputs: {
                    ...prevState.inputs,
                    [key]: {
                        ...prevState.inputs[key],
                        ...stateSlice
                    },
                },
            };
        });
    };

    setErrorState = (key, error, callback) => {
        this.setState(prevState => {
            return {
                ...prevState,
                errors: {
                    ...prevState.errors,
                    [key]: error,
                }
            }
        }, () => {
            if (typeof callback === 'function') callback();
        })
    };

    onInputFocus = key => {
        this.setInputState(key, {
            containerStyle: styles.activeTextInputContainerStyle
        })
    };

    onInputBlur = key => {
        this.setInputState(key, {
            containerStyle: {}
        })
    };

    submitButtonPress = () => {
        let hasError = false;
        Object.keys(this.state.errors).forEach(key => {
            if (this.state.errors[key] !== null) hasError = true;
        });
        if (!hasError) this.props.signIn({
            email: this.state.inputs.email.value,
            mobile_password: this.state.inputs.password.value,
        });
    };

    render() {
        const errors = this.props.errors.map((item, index) => {
            return (
                <FormValidationMessage key={index}>{item}</FormValidationMessage>
            )
        });

        const formInputs = Object.keys(this.formModel).map(key => {
            // Label
            const label = (
                <FormLabel labelStyle={styles.labelStyle}>{this.formModel[key].label}</FormLabel>
            );
            // Validation error
            const errorMessage = (
                <FormValidationMessage>{this.state.errors[key]}</FormValidationMessage>
            );
            // Attributes
            const inputAttrs = {
                placeholder: this.formModel[key].placeholder,
                onFocus: () => this.onInputFocus(key),
                onBlur: () => this.onInputBlur(key),
                onChangeText: value => this.changeInput(key, value),
                value: this.state.inputs[key].value,
                inputStyle: styles.textInput,
                containerStyle: [this.state.inputs[key].containerStyle, styles.textInputContainerStyle],
                ...this.formModel[key].attrs,
            };
            // Form
            const inputElem = (
                <FormInput {...inputAttrs} />
            );

            return (
                <View key={key}>
                    {label}
                    {inputElem}
                    {errorMessage}
                </View>
            )
        });

        return (
            <View style={styles.container}>

                <Text style={styles.header}>Введите данные, чтобы продолжить</Text>

                <ScrollView>

                    {[errors, formInputs]}

                    <Text style={styles.spacer}/>

                    <Button title={'Войти'}
                            backgroundColor={MAIN_COLOR}
                            disabledStyle={{backgroundColor: '#888'}}
                            containerViewStyle={{marginBottom: 30}}
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
        textAlign: 'center',
        fontSize: 18
    },
    spacer: {
        marginTop: 0
    },
    labelStyle: {
        color: MAIN_COLOR
    },
    textInput: {
        color: '#000',
    },
    textInputContainerStyle: {
        borderBottomWidth: 2
    },
    activeTextInputContainerStyle: {
        borderBottomColor: MAIN_COLOR,
        borderBottomWidth: 2
    },
    ruleLink: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#0099ff'
    },
    checkboxStyle: {
        borderWidth: 0,
        margin: 0,
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.user.isProcessRequest,
        errors: state.user.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: data => dispatch(signIn(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);