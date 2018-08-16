import {FormInput} from 'react-native-elements';
import {TextInputMask} from 'react-native-masked-text';
import React from 'react';
import {Animated, Dimensions, Platform, StyleSheet} from 'react-native';

const { width } = Dimensions.get('window');
import normalize from '../../node_modules/react-native-elements/src/helpers/normalizeText.js';

export default class MaskedFormInput extends FormInput {
    render() {
        const {
            containerStyle,
            inputStyle,
            ...attributes
        } = this.props;
        const translateX = this.shakeAnimationValue.interpolate({
            inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
            outputRange: [0, -15, 0, 15, 0, -15, 0],
        });
        return (
            <Animated.View
                style={[
                    styles.container,
                    containerStyle && containerStyle,
                    {
                        transform: [{translateX}],
                    },
                ]}
            >
                <TextInputMask
                    {...attributes}
                    style={[
                        styles.input,
                        {fontSize: normalize(14)},
                        inputStyle && inputStyle,
                    ]}
                    ref={ref => this.maskedInput = ref}
                    type={'custom'}
                    options={{
                        mask: this.props.mask
                    }}
                    />
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
        marginRight: 15,
        ...Platform.select({
            ios: {
                borderBottomColor: '#bdc6cf',
                borderBottomWidth: 1,
                marginLeft: 20,
                marginRight: 20,
            },
        }),
    },
    input: {
        ...Platform.select({
            android: {
                minHeight: 46,
                width: width - 30,
            },
            ios: {
                minHeight: 36,
                width: width,
            },
        }),
        // breaks tests - fix before release
        // Invariant Violation: Invalid undefined `width` of type `string`
        // supplied to `StyleSheet input`, expected `number`.
        // width: '100%',
        color: '#86939e',
    },
});