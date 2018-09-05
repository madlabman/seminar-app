import React, {Component} from 'react'
import {StyleSheet, View, WebView} from 'react-native'
import PropTypes from 'prop-types'

export default class BrowserScreen extends Component {
    static propTypes = {
        uri: PropTypes.string.isRequired
    }

    static navigatorButtons = {
        rightButtons: [
            {
                title: 'Закрыть', // for a textual button, provide the button title (label)
                id: 'close_modal',
                buttonColor: '#000'
            }
        ]
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress'
            && event.id === 'close_modal') {
            this.props.navigator.dismissModal()
        }
    }

    componentDidMount() {
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    }

    render() {
        const setCookieJS = `
function setCookie(name, value, props) {
    props = props || {}
    var exp = props.expires
    if (typeof exp == "number" && exp) {
        var d = new Date()
        d.setTime(d.getTime() + exp*1000)
        exp = props.expires = d
    }
    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }
    value = encodeURIComponent(value)
    var updatedCookie = name + "=" + value
    for(var propName in props){
        updatedCookie += "; " + propName
        var propValue = props[propName]
        if(propValue !== true){ updatedCookie += "=" + propValue }
    }
    document.cookie = updatedCookie
}

setCookie('show_only_content', true)`

        return (
            <View style={styles.container}>
                <WebView
                    source={{uri: this.props.uri}}
                    injectedJavaScript={setCookieJS}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})