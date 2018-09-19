import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

import {MAIN_COLOR} from '../../../config';
import {sendFeedback} from '../../store/actions';

class QuestionFormScreen extends Component {

    state = {
        question: null,
        error: null,
        textAreaStyles: null
    };

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Закрыть', // for a textual button, provide the button title (label)
                id: 'close_modal',
                buttonColor: '#000'
            }
        ]
    };

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'
            && event.id === 'close_modal') {
            this.props.navigator.dismissModal();
        }
    };

    onTextAreaFocus = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                textAreaStyles: styles.activeTextInputContainerStyle
            }
        })
    };

    onTextAreaBlur = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                textAreaStyles: null
            }
        })
    };

    handleChangeQuestion = question => {
        this.setState(prevState => {
            return {
                ...prevState,
                question
            }
        })
    };

    submitButtonPress = () => {
        if (!this.state.question || !this.state.question.length) {
            this.setState(prevState => {
                return {
                    ...prevState,
                    error: 'Текст вопроса обязателен!'
                };
            });
        } else {
            this.props.sendFeedback(this.state.question)
                .then(success => {
                    if (success) {
                        this.setState(prevState => {
                            return {
                                ...prevState,
                                question: null
                            }
                        });
                        Alert.alert('', 'Ваш вопрос отправлен!');
                    } else {
                        Alert.alert('', 'Возникла ошибка, повторите позднее!');
                    }
                });
            this.setState(prevState => {
                return {
                    ...prevState,
                    error: null,
                }
            })
        }
    };

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>Задайте нам вопрос</Text>

                <ScrollView>

                    <FormValidationMessage>{this.state.error}</FormValidationMessage>
                    <FormLabel labelStyle={styles.labelStyle}>Введите вопрос</FormLabel>

                    <FormInput
                        multiline={true}
                        placeholder={'Ваш вопрос'}
                        containerStyle={[styles.textInputContainerStyle, this.state.textAreaStyles]}
                        inputStyle={styles.inputStyle}
                        onFocus={this.onTextAreaFocus}
                        onBlur={this.onTextAreaBlur}
                        value={this.state.question}
                        onChangeText={this.handleChangeQuestion}
                    />

                    <Button title={'Задать вопрос'}
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
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        margin: 15,
        textAlign: 'center',
        fontSize: 18
    },
    labelStyle: {
        color: MAIN_COLOR,
        textAlign: 'center'
    },
    textInputContainerStyle: {
        marginBottom: 20,
        paddingVertical: 10,
        borderBottomWidth: 2
    },
    activeTextInputContainerStyle: {
        borderBottomColor: MAIN_COLOR
    },
    inputStyle: {
        width: '100%',
        marginRight: 20,
        color: '#000'
    }
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendFeedback: question => dispatch(sendFeedback(question))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionFormScreen);
