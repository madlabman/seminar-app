import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {CheckBox} from "react-native-elements";

export default class SelectList extends Component {

    state = {
        items: {}
    };

    componentDidMount() {
        // Init items
        if (this.props.selected) {
            let items = this.state.items;
            Object.keys(this.props.selected).forEach(item => {
                items = {
                    ...items,
                    [item]: true
                }
            });
            this.setState(prevState => {
                return {
                    ...prevState,
                    items: items
                }
            })
        }
    }

    handleCheckboxPress = key => {
        this.setState(prevState => {
            return {
                ...prevState,
                items: {
                    ...prevState.items,
                    [key]: !prevState.items[key]
                }
            }
        }, () => {
            this.props.onChange(
                // Pass only selected items
                Object.keys(this.state.items)
                    .filter(key => this.state.items[key])
                    .reduce((obj, key) => {
                        obj[key] = this.state.items[key];
                        return obj;
                    }, {})
            );
        });
    };

    render() {
        let list = this.props.data.map(item => {
            return (
                <CheckBox
                    key={item.title}
                    title={item.name}
                    checked={this.state.items[item.title]}
                    onPress={() => this.handleCheckboxPress(item.title)}
                />
            )
        });

        return (
            <View>{list}</View>
        )
    }
}