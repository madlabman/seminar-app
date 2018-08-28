import React, {Component} from 'react';
import {StyleSheet, ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import {Button, CheckBox, FormLabel, FormInput, FormValidationMessage, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import {signUp} from '../../store/actions';
import MaskedFormInput from '../../components/MaskedFormInput';
import {MAIN_COLOR, PDN_RULES_LINK} from '../../../config';
import validateEmail from '../helpers/validateEmail';

class SignUpScreen extends Component {

    state = {
        inputs: {
            first_name: {
                value: '',
                containerStyle: {},
            },
            email: {
                value: '',
                containerStyle: {},
            },
            password: {
                value: '',
                containerStyle: {},
            },
            phone: {
                value: '',
                containerStyle: {},
            },
        },
        errors: {
            first_name: null,
            email: null,
            phone: null,
            confirmation: null,
        },
        confirmation: false
    };

    formModel = {
        first_name: {
            label: 'Ваше имя',
            placeholder: 'Введите ваше имя',
            attrs: {}
        },
        email: {
            label: 'Email',
            placeholder: 'Введите ваш почтовый адрес',
            attrs: {
                autoCapitalize: 'none',
                autoCorrect: false
            }
        },
        password: {
            label: 'Пароль',
            placeholder: 'Придумайте пароль',
            attrs: {
                secureTextEntry: true
            }
        },
        phone: {
            label: 'Номер телефона',
            placeholder: '8 (123) 456-78-90',
            attrs: {
                keyboardType: 'phone-pad',
                mask: '8 ([000]) [000]-[00]-[00]'
            }
        }
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

    submitButtonPress = () => {
        let hasError = false;
        if (!this.state.confirmation) {
            this.setErrorState('confirmation', 'Согласие обязательно!');
        }
        else {
            this.setErrorState('confirmation', null, () => {
                Object.keys(this.state.errors).forEach(key => {
                    if (this.state.errors[key] !== null) hasError = true;
                });
                if (!hasError) this.props.signUp({
                    first_name: this.state.inputs.first_name.value,
                    email: this.state.inputs.email.value,
                    mobile_password: this.state.inputs.password.value,
                    phone_number: this.state.inputs.phone.value,
                })
                    .then(() => {
                        this.scrollView.scrollTo({ x: 0, y: 0, animated: true})
                    });
            });
        }
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

    handleLinkPress = () => {
        this.props.navigator.showModal({
            screen: 'seminar.BrowserScreen',
            passProps: {
                uri: PDN_RULES_LINK
            },
        })
    };

    handlePhoneInputChange = (formatted, extracted) => {
        console.log(`formatted: ${formatted}`, `extracted: ${extracted}`);
        this.setInputState('phone', { value: formatted });
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
                containerStyle: [styles.textInputContainerStyle, this.state.inputs[key].containerStyle],
                ...this.formModel[key].attrs,
            };
            // Form
            const inputElem = key === 'phone' ? (
                <MaskedFormInput {...inputAttrs} />
            ) : (
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

                <ScrollView ref={ref => this.scrollView = ref}>

                    {[errors, formInputs]}

                    <CheckBox
                        title={'Подтверждаю согласие на обработку персональных данных'}
                        containerStyle={styles.checkboxStyle}
                        checked={this.state.confirmation}
                        onPress={() => this.setState(prevState => {
                            return {
                                ...prevState,
                                confirmation: !prevState.confirmation
                            }
                        })}
                    />
                    <FormValidationMessage>{this.state.errors.confirmation}</FormValidationMessage>

                    <Text style={styles.spacer}/>

                    <TouchableWithoutFeedback onPress={() => this.handleLinkPress()}>
                        <Text style={styles.ruleLink}>Политика обработки персональных данных</Text>
                    </TouchableWithoutFeedback>


                    <Button title={'Зарегистрироваться'}
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
        borderBottomWidth: 2,
        borderBottomColor: '#adadad'
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