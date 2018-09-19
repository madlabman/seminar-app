import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class PushNotificationController extends Component {
    static propTypes = {
        onNotificationReceived: PropTypes.func.isRequired,
        notification: PropTypes.object.isRequired
    }

    componentDidMount() {
        console.log('Controller has been received notification')
        const notificationData = this.props.notification.data.post_id;
        this.props.onNotificationReceived(notificationData)
    }

    componentWillUnmount() {
        console.log('Controller has been viewed notification')
    }

    render() {
        return null;
    }
}