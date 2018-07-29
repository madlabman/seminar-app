import React, {Component} from 'react';
import {connect} from 'react-redux';
import openMainApp from '../screens/helpers/openMainApp';
import openSignUp from '../screens/helpers/openSignUp';

class SplashScreenRedirect extends Component {
    componentDidMount() {
        // Redirect based on user registration status
        if (this.props.isSignedUp) openMainApp();
        else openSignUp();
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        isSignedUp: state.user.isSignedUp
    }
};

export default connect(mapStateToProps)(SplashScreenRedirect);
