'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, View, Text} from 'react-native'
import * as AppFonts from '../../commons/Fonts'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class StatutesPage extends Component {

  render() {
    return(
      <View style={styles.container}>
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
    backgroundColor:'white'
  },
})
