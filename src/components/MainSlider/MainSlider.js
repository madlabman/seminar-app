import React, {Component} from 'react'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import {CachedImage} from 'react-native-cached-image'
import {Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import PropTypes from 'prop-types'

export default class MainSlider extends Component {

    static propTypes = {
        slides: PropTypes.array.isRequired,
        onSlidePress: PropTypes.func.isRequired
    }

    state = {
        activeSlide: 0
    }

    _carousel = null

    render() {
        if (this.props.slides === undefined) return (<View/>)

        const sliderWidth = Dimensions.get('window').width
        const itemWidth = Dimensions.get('window').width

        return (
            <View>
                <Carousel
                    ref={c => { this._carousel = c }}
                    data={this.props.slides}
                    renderItem={({item}) =>
                        (
                            <View style={styles.slide}>
                                <TouchableWithoutFeedback onPress={() => {
                                    this.props.onSlidePress(item)
                                }}>
                                    <CachedImage
                                        source={item.image}
                                        style={styles.image}
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                <Pagination
                    dotsLength={this.props.slides.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={styles.pagination}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        marginTop: 15,
                        backgroundColor: '#000'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide: {
        alignItems: 'center'
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 16 * 9
    },
    pagination: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        marginBottom: 20
    }
})