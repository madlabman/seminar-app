import React, {Component} from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import TouchableIcon from '../../components/TouchableIcon/TouchableIcon';
import {updRelation, getRelation} from '../../store/actions';
import injectedJS from '../helpers/hideMenuBarInWebView';
import {MAIN_COLOR} from "../../../config";

class SinglePostScreen extends Component {

    handlePressIcon = relation => {
        this.props.updRelation(
            this.props.item.id,
            relation
        );
    };

    componentDidMount() {
        this.props.getRelation(this.props.item.id);
    }

    render() {

        let relation = this.props.isAnnounce ?
            this.props.announces[this.props.item.id].relation : null;

        let voteButtons = null;
        if (this.props.isAnnounce) {
            voteButtons = (
                <View style={styles.voteContainer}>
                    <Text style={styles.callText}>Вас интересует мероприятие?</Text>

                    <View style={styles.buttonContainer}>
                        {/*Пойду*/}
                        <TouchableIcon
                            name={'thumb-up'}
                            color={'#000'}
                            active={relation === 'yes'}
                            activeColor={'#fff'}
                            activeStyle={{backgroundColor: '#3d9733'}}
                            onPress={() => this.handlePressIcon('yes')}
                            isLoading={this.props.isLoading}
                        />
                        {/*Не пойду*/}
                        <TouchableIcon
                            name={'thumb-down'}
                            color={'#000'}
                            active={relation === 'no'}
                            activeColor={'#fff'}
                            activeStyle={{backgroundColor: MAIN_COLOR}}
                            onPress={() => this.handlePressIcon('no')}
                            isLoading={this.props.isLoading}
                        />
                    </View>

                    <Button
                        title={'Высылайте счет'}
                        onPress={() => console.log('checkout')}
                        backgroundColor={MAIN_COLOR}
                    />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {voteButtons}
                <WebView
                    source={this.props.item.permalink}
                    style={styles.browser}
                    injectedJavaScript={injectedJS()}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        margin: 20,
        fontSize: 16,
        textAlign: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    voteContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10
    },
    browser: {
        marginTop: 10
    },
    callText: {},
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        announces: state.posts.announces.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updRelation: (announceId, relation) => dispatch(updRelation(announceId, relation)),
        getRelation: announceId => dispatch(getRelation(announceId))
    }
};

SinglePostScreen.propTypes = {
    item: PropTypes.object.isRequired,
    isAnnounce: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostScreen)