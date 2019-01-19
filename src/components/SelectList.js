import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {CheckBox} from "react-native-elements";

export default class SelectList extends Component {

    handleCheckboxPress = key => {
        let selectedItems = this.props.selected || []
        const indexOfItem = selectedItems.indexOf(key)
        indexOfItem !== -1 ? selectedItems.splice(indexOfItem, 1) : selectedItems.push(key)
        const availableItems = this.props.data.map(item => item.title)
        selectedItems = selectedItems.filter(item => availableItems.indexOf(item) >= 0)
        this.props.onChange(selectedItems)
    }

    render() {
        // Init items
        let selectedItems = {}

        if (this.props.data && this.props.selected) {
            this.props.data.forEach(item => {
                const isSelected = this.props.selected.indexOf(item.title) >= 0
                selectedItems = {
                    ...selectedItems,
                    [item.title]: isSelected
                }
            })
        }

        const list = this.props.data.map(item => {
            return (
                <CheckBox
                    key={item.title}
                    title={item.name}
                    checked={selectedItems[item.title]}
                    onPress={() => this.handleCheckboxPress(item.title)}
                />
            )
        })

        return (
            <View>{list}</View>
        )
    }
}