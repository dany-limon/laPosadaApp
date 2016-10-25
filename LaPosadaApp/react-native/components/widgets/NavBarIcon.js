'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class NavBarIcon extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
  }

  static defaultProps = {
  }

    render() {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon name="plus" size={25}  />
        </TouchableOpacity>
      )
    }
}
