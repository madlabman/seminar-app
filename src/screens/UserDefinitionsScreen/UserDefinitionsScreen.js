import React, {Component} from 'react';
import {ActivityIndicator, Alert, StyleSheet, ScrollView, View} from 'react-native';
import {Button, FormValidationMessage, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import openMainApp from '../helpers/openMainApp';
import {
    fetchCities,
    fetchSubjects,
    fetchUser,
    setUserDefinitions,
    updateUserCities,
    updateUserSubjects
} from '../../store/actions';
import SelectList from '../../components/SelectList';

class UserDefinitionsScreen extends Component {

    static navigatorStyle = {
        navBarTitleTextCentered: true,
        navBarButtonColor: '#000',
        navBarCustomView: 'seminar.TopBar'
    };

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
                    subjects: this.props.user.subjects
                }
            );
        }
    };

    onCitiesListChange = selected => {
        this.props.updateUserCities(selected);
    };

    onSubjectsListChange = selected => {
        this.props.updateUserSubjects(selected);
    };

    componentDidMount() {
        this.props.fetchCities();
        this.props.fetchSubjects();
        // this.props.fetchUser();
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
                </View>

                <View style={styles.buttonContainer}>
                    {errors}
                    <Button title={'Продолжить'}
                            backgroundColor={'#000'}
                            buttonStyle={styles.button}
                            textStyle={{color: '#fff'}}
                            disabledStyle={{backgroundColor: '#888'}}
                            onPress={this.handleSubmitButton}
                            loading={this.props.user.isLoading}
                            disabled={this.props.user.isLoading || this.props.isCitiesLoading || this.props.isSubjectsLoading}
                    />
                </View>

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
    }
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