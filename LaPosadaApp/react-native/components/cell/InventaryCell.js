'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity} from 'react-native'

export default class InventaryCell extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    item: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  render() {
    return(
      <TouchableOpacity style={{padding:20,flexDirection:'row', borderBottomWidth:1, borderBottomColor:'black'}}
          onPress={this.props.onPress}>
        <View style={{width:80, height:80, backgroundColor:'gray', alignSelf:'center'}}>
          <Image
            style={{width:80, height:80}}
            resizeMode={'cover'}
            source={{uri: this.props.item.imagen}}/>
        </View>
        <View style={{flex:1, marginLeft:20, alignSelf:'center'}}>
          <Text style={{fontSize:22}} numberOfLines={2}>{this.props.item.nombre}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {

  },
})
