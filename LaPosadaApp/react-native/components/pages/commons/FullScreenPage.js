'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, View, Text} from 'react-native'
import PhotoView from 'react-native-photo-view'
import * as AppFonts from '../../../commons/Fonts'
import * as AppColors from '../../../commons/Colors'

const IPHONE6_WIDTH = 375;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const initialScale = screenWidth / IPHONE6_WIDTH

export default class FullScreenPage extends Component {

  render() {
    return(
      <View style={styles.container}>
        <PhotoView
            source={{uri: this.props.image}}
            minimumZoomScale={1}
            maximumZoomScale={5}
            androidScaleType="centerInside"
            onLoad={() => console.log("Image loaded!")}
            style={{width: screenWidth, height: screenHeight}} />
      </View>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'black'
  },
})
