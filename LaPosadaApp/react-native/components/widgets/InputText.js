'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, TouchableOpacity} from 'react-native'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Hoshi} from 'react-native-textinput-effects'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class InputText extends Component {

  static propTypes = {
    onChangeText: React.PropTypes.func,
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    keyboardType: React.PropTypes.string,
    secureTextEntry: React.PropTypes.bool,
  }

  static defaultProps = {
    label: '',
    value: '',
    keyboardType: 'default',
    secureTextEntry : false
  }

  render() {
    return (
      <Hoshi
        label={this.props.label}
        borderColor={AppColors.main}
        onChangeText={this.props.onChangeText}
        inputStyle={styles.inputStyle}
        labelStyle={styles.labelStyle}
        value={this.props.value}
        secureTextEntry={this.props.secureTextEntry}
        keyboardType={this.props.keyboardType}
      />
    )
  }
}

//*************************************************
// Estilos
//*************************************************
const styles = StyleSheet.create({
  inputStyle: {
    color: AppColors.black,
    fontSize:20,
    fontFamily:AppFonts.regular
  },
  labelStyle:{
    color:AppColors.gray,
    fontSize:16,
    fontFamily:AppFonts.light
  }
})
