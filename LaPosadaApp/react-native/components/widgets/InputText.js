'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Hoshi} from 'react-native-textinput-effects'

export default class InputText extends Component {

  static propTypes = {
    onChangeText: React.PropTypes.func,
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    keyboardType: React.PropTypes.string,
  }

  static defaultProps = {
    label: '',
    value: '',
    keyboardType: 'default'
  }

    render() {
      return (
        <Hoshi
          label={this.props.label}
          borderColor={'black'}
          onChangeText={this.props.onChangeText}
          inputStyle={{ color: 'black' }}
          labelStyle={{color:'gray'}}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
        />
      )
    }
}
