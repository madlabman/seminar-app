import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {connect} from 'react-redux';

import logo from '../../../assets/img/logo-seminar.png';
import MainMenu from '../../components/MainMenu/MainMenu';
import {fetchMenu} from '../../store/actions';

class MenuScreen extends Component {
    componentDidMount() {
        this.props.fetchMenu()
    }

    render() {
        return (
            <View style={styles.menuContainer}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
                <MainMenu
                    items={this.props.items}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    menuContainer: {
        paddingTop: 30,
        paddingHorizontal: 20,
        width: Dimensions.get('window').width * 0.85,
        flex: 1,
        backgroundColor: '#fff'
    },
    logo: {
        width: 146,
        height: 24,
        marginBottom: 20
    }
});

const mapStateToProps = state => {
    return {
        items: state.menu.items
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchMenu: () => dispatch(fetchMenu())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)