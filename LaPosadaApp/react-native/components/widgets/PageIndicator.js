'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'

export default class PagerIndicator extends Component {

  static propTypes = {
    index: React.PropTypes.number,
    total: React.PropTypes.number,
  }

  static defaultProps = {
    index:0,
    total:0
  }

    render() {
      return(
        <View style={{position:'absolute', bottom:10, right:10,left:10, backgroundColor:'transparent'}}>
          <View style={{flexDirection:'row', alignSelf:'center', backgroundColor:'#FFFFFFCC', paddingLeft:10, paddingRight:10, borderColor:'black', borderWidth:1, borderRadius:15}}>
            <Text style={{fontFamily:AppFonts.bold, fontSize:22, textAlign:'center'}}>{this.props.index+1}</Text>
            <Text style={{fontFamily:AppFonts.regular, fontSize:22, textAlign:'center'}}>{'/'}</Text>
            <Text style={{fontFamily:AppFonts.regular, fontSize:22, textAlign:'center'}}>{this.props.total}</Text>
          </View>
        </View>
      )
    }
}
