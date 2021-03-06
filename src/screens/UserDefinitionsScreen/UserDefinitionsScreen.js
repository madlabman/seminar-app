import React, {Component} from 'react'
import {ActivityIndicator, Alert, StyleSheet, ScrollView, View} from 'react-native'
import {Button, FormInput, FormLabel, FormValidationMessage, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import configureStore from '../../store/store'

import {
    fetchCities,
    fetchSubjects,
    fetchUser,
    setUserDefinitions,
    updateUserCities,
    updateUserSubjects,
} from '../../store/actions'
import SelectList from '../../components/SelectList'
import {MAIN_COLOR} from '../../../config'
import openSplashScreen from '../helpers/openSplashScreen'

class UserDefinitionsScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000'
    }

    state = {
        inn: ''
    }

    handleSubmitButton = () => {
        // Simple validation
        if (!this.props.user.cities || !this.props.user.subjects) {
            Alert.alert(
                'Ошибка!',
                'Выберите хотя бы один город и интересующую тематику'
            )
        } else {
            this.props.setUserDefinitions(
                {
                    cities: this.props.user.cities,
                    subjects: this.props.user.subjects,
                    inn: this.state.inn
                }
            );
        }
    };

    handleLogoutButton = () => {
        // Purge store
        // TODO: make it more elegant way
        const {store, persistor} = configureStore()
        persistor.purge()
            .then(() => {
                openSplashScreen(store, persistor)
            })
    }

    onCitiesListChange = selected => {
        this.props.updateUserCities(selected);
    }

    onSubjectsListChange = selected => {
        this.props.updateUserSubjects(selected);
    }

    onInnChange = value => {
        this.setState(prevState => {
            return {
                ...prevState,
                inn: value
            }
        })
    }

    componentDidMount() {
        this.props.fetchCities();
        this.props.fetchSubjects();
        this.props.fetchUser();
    }

    render() {

        let cities = this.props.isCitiesLoading ?
            (
                <ActivityIndicator color={'#000'}/>
            ) :
            (
                <SelectList data={this.props.cities} selected={this.props.user.cities} onChange={this.onCitiesListChange}/>
            );

        let subjects = this.props.isSubjectsLoading ?
            (
                <ActivityIndicator color={'#000'}/>
            ) :
            (
                <SelectList data={this.props.subjects} selected={this.props.user.subjects} onChange={this.onSubjectsListChange}/>
            );

        let errors = this.props.user.errors.map((item, index) => {
            return (
                <FormValidationMessage key={index}>{item}</FormValidationMessage>
            )
        });

        let logoutButton = this.props.user.isSetupCompleted ? (
            <Button title={'Выйти'}
                    backgroundColor={MAIN_COLOR}
                    buttonStyle={styles.button}
                    textStyle={{color: '#fff'}}
                    disabledStyle={{backgroundColor: '#888'}}
                    onPress={this.handleLogoutButton}
                    loading={this.props.user.isProcessRequest}
                    disabled={this.props.user.isProcessRequest}
            />
        ) : null

        return (
            <ScrollView style={styles.scrollContainer}>

                <View style={styles.container}>

                    <Text style={styles.userEmail}>{this.props.user.email}</Text>

                    <Text style={styles.title}>Выберите интересующие вас города и тематики</Text>

                    <Text style={styles.sectionTitle}>Города</Text>
                    {cities}

                    <View style={styles.spacer}/>

                    <Text style={styles.sectionTitle}>Тематики</Text>
                    {subjects}

                    <FormLabel labelStyle={styles.labelStyle}>ИНН организации</FormLabel>
                    <FormInput placeholder={'Для определения размера скидки'} onChangeText={this.onInnChange}
                               containerStyle={styles.textInputContainerStyle} inputStyle={styles.textInput}
                               value={this.props.user.inn}/>
                </View>

                <View style={styles.buttonContainer}>
                    {errors}
                    <Button title={'Продолжить'}
                            backgroundColor={MAIN_COLOR}
                            buttonStyle={[styles.button, {marginBottom: 0}]}
                            textStyle={{color: '#fff'}}
                            disabledStyle={{backgroundColor: '#888'}}
                            onPress={this.handleSubmitButton}
                            loading={this.props.user.isProcessRequest}
                            disabled={this.props.user.isProcessRequest || this.props.isCitiesLoading || this.props.isSubjectsLoading}
                    />
                </View>

                {logoutButton}

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5
    },
    scrollContainer: {
        backgroundColor: '#fff'
    },
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
    },
    button: {
        marginTop: 10,
        marginBottom: 20
    },
    userEmail: {
        marginTop: 10,
        textAlign: 'center',
        color: '#0099ff'
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
});

const mapStateToProps = state => {
    return {
        isCitiesLoading: state.cities.isLoading,
        isSubjectsLoading: state.subjects.isLoading,
        cities: state.cities.items,
        subjects: state.subjects.items,
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchCities: () => dispatch(fetchCities()),
        fetchSubjects: () => dispatch(fetchSubjects()),
        fetchUser: () => dispatch(fetchUser()),
        setUserDefinitions: data => dispatch(setUserDefinitions(data)),
        updateUserCities: cities => dispatch(updateUserCities(cities)),
        updateUserSubjects: subjects => dispatch(updateUserSubjects(subjects)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDefinitionsScreen);