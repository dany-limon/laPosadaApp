'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class GotoUpButton extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
  }

  static defaultProps = {

  }

    render() {
      if (this.props.visible){
        return (
          <TouchableHighlight
            style={styles.container}
            underlayColor='#CCCCCC'
            onPress={this.props.onPress}>
            <Icon name={'angle-double-up'} size={20} color='#999999' />
          </TouchableHighlight>
        )
      }else{
        return (<View/>)
      }
    }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container:{
    position:'absolute',
    right:20,
    top:15,
    height:36,
    width:36,
    backgroundColor:'#CCCCCC77',
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center'
  },
})
