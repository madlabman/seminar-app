import React, {Component} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CachedImage} from 'react-native-cached-image';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export default class MainSlider extends Component {

    state = {
        activeSlide: 0
    };

    _renderItem({item, index}) {
        return (
            <View style={styles.slide}>
                <CachedImage
                    source={item.image}
                    style={styles.image}
                />
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    _carousel = null;

    render() {
        const sliderWidth = Dimensions.get('window').width;
        const itemWidth = Dimensions.get('window').width;

        return (
            <View>
                <Carousel
                    ref={c => { this._carousel = c }}
                    data={this.props.slides}
                    renderItem={this._renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                />
                <Pagination
                    dotsLength={this.props.slides.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={{ backgroundColor: 'transparent', paddingVertical: 0 }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
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
        //
    },
    title: {
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'center'
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200
    }
});