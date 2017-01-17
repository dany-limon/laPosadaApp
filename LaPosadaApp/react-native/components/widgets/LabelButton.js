'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, TouchableOpacity} from 'react-native'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class LabelButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    label: React.PropTypes.string,
  }

  static defaultProps = {
    label: ''
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Text
          style={styles.label}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    )
  }
}

//*************************************************
// Estilos
//*************************************************
const styles = StyleSheet.create({
  container: {
    marginTop:15
  },
  label:{
    alignSelf:'center',
    padding:10,
    color:AppColors.main,
    fontSize:16,
    fontFamily:AppFonts.regular
  }
})
