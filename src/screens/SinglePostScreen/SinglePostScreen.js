import React, {Component} from 'react'
import {Alert, Animated, Platform, StyleSheet, View, WebView} from 'react-native'
import {Button, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import WebViewBridge from 'react-native-webview-bridge'

import TouchableIcon from '../../components/TouchableIcon/TouchableIcon'
import {updRelation, getRelation, sendBillRequest} from '../../store/actions'
import {MAIN_COLOR} from '../../../config'

const NAVBAR_HEIGHT = 155

class SinglePostScreen extends Component {

    // Scroll position passed from WebViewBridge
    scrollY = 0

    state = {
        scrollAnim: new Animated.Value(0)
    }

    handlePressIcon = relation => {
        this.props.updRelation(
            this.props.item.id,
            relation
        )
    }

    handleBillButtonPress = () => {
        this.props.sendBillRequest(
            this.props.item.id
            )
            .then(action => {
                if (
                    action.payload
                    && action.payload.success
                ) {
                    Alert.alert('Успешно!', 'Ваш запрос отправлен администратору.')
                }
            })
    }

    // Handle message, received from WebViewBridge
    onBridgeMessage = message => {
        this.scrollY = parseInt(message)
        Animated.event([{scrollY: this.state.scrollAnim}])(this)
    }

    componentDidMount() {
        this.props.getRelation(this.props.item.id);
    }

    render() {

        // Script for passing scroll position to Component [Android Only]
        const injectScript = `

        if (WebViewBridge) {
            window.onscroll = function() {
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;
                WebViewBridge.send(scrolled);
            }
        }

        `

        const clampedScroll = Animated.diffClamp(
            this.state.scrollAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            0,
            NAVBAR_HEIGHT
        )

        const navbarTranslate = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [0, -(NAVBAR_HEIGHT)],
            extrapolate: 'clamp',
        })

        const topOffset = clampedScroll.interpolate({
            inputRange: [0, NAVBAR_HEIGHT],
            outputRange: [NAVBAR_HEIGHT, 0],
            extrapolate: 'extend'
        })

        let relation = this.props.isAnnounce ?
            this.props.announces[this.props.item.id] ? this.props.announces[this.props.item.id].relation : null
            : null

        let voteButtons = null;
        if (this.props.isAnnounce) {
            voteButtons = (
                <Animated.View style={[
                    {
                        width: "100%",
                        position: "absolute",
                        transform: [{
                            translateY: navbarTranslate
                        }],
                        zIndex: 1
                    },
                    styles.voteContainer
                ]}>
                    <Text style={styles.callText}>Вас интересует мероприятие?</Text>

                    <View style={styles.buttonContainer}>
                        {/* Пойду */}
                        <TouchableIcon
                            text={'Да'}
                            color={'#000'}
                            active={relation === 'yes'}
                            activeColor={'#fff'}
                            activeStyle={{backgroundColor: '#3d9733'}}
                            onPress={() => this.handlePressIcon('yes')}
                            isLoading={this.props.isLoading}
                        />
                        {/* Не пойду */}
                        <TouchableIcon
                            text={'Нет'}
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
                        onPress={this.handleBillButtonPress}
                        backgroundColor={MAIN_COLOR}
                        textStyle={styles.button}
                        loading={this.props.isLoading}
                        disabled={this.props.isLoading}
                    />
                </Animated.View>
            );
        }

        return (
            <Animated.View style={[styles.container, {
                paddingTop: topOffset
            }]}>
                <WebViewBridge
                    source={this.props.item.permalink}
                    style={[styles.browser]}
                    onBridgeMessage={this.onBridgeMessage}
                    injectedJavaScript={injectScript}
                    originWhitelist={["http://.*", "https://.*"]} // https://github.com/alinz/react-native-webview-bridge/issues/265#issue-337177864
                />
                {voteButtons}
            </Animated.View>
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
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 0.6,
        elevation: 5
    },
    browser: {
        //
    },
    callText: {
        color: '#000'
    },
    button: {
        fontSize: 14
    }
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
        getRelation: announceId => dispatch(getRelation(announceId)),
        sendBillRequest: announceId => dispatch(sendBillRequest(announceId))
    }
};

SinglePostScreen.propTypes = {
    item: PropTypes.object.isRequired,
    isAnnounce: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePostScreen)