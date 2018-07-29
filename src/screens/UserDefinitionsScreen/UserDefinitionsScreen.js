import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, ScrollView, View} from 'react-native';
import {Button, FormValidationMessage, Text} from 'react-native-elements';
import {connect} from 'react-redux';

import openMainApp from '../helpers/openMainApp';
import {fetchCities, fetchSubjects, setUserDefinitions} from '../../store/actions';
import SelectList from '../../components/SelectList';

class UserDefinitionsScreen extends Component {

    state = {
        selectedCities: [],
        selectedSubjects: [],
    };

    handleSubmitButton = () => {
        this.props.setUserDefinitions(
            this.props.user.installationId,
            {
                cities: this.state.selectedCities,
                subjects: this.state.selectedSubjects
            }
        );
    };

    onCitiesListChange = selected => {
        this.setState(prevState => (
            {
                ...prevState,
                selectedCities: selected
            }
        ))
    };

    onSubjectsListChange = selected => {
        this.setState(prevState => (
            {
                ...prevState,
                selectedSubjects: selected
            }
        ))
    };

    // TODO: change behavior
    static getDerivedStateFromProps(props, state) {
        if (props.user.isSetupCompleted) openMainApp();
        return state;
    }

    componentDidMount() {
        this.props.fetchCities();
        this.props.fetchSubjects();
    }

    render() {

        let cities = this.props.isCitiesLoading ?
            (
                <ActivityIndicator color={'#000'}/>
            ) :
            (
                <SelectList data={this.props.cities} onChange={this.onCitiesListChange}/>
            );

        let subjects = this.props.isSubjectsLoading ?
            (
                <ActivityIndicator color={'#000'}/>
            ) :
            (
                <SelectList data={this.props.subjects} onChange={this.onSubjectsListChange}/>
            );

        let errors = this.props.user.errors.map((item, index) => {
            return (
                <FormValidationMessage key={index}>{item}</FormValidationMessage>
            )
        });

        return (
            <ScrollView>

                <View style={styles.container}>
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
        setUserDefinitions: (installation_id, data) => dispatch(setUserDefinitions(installation_id, data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDefinitionsScreen);