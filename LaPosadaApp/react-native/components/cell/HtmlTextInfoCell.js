'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image,
  TouchableOpacity, ScrollView} from 'react-native'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'
import HTMLView from '../../lib/react-native-htmlview'

const IPHONE6_WIDTH = 375;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const initialScale = screenWidth / IPHONE6_WIDTH

export default class HtmlTextInfoCell extends Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  static defaultProps = {
    data:{
      title:'',
      header:'',
      text:''
    },
  }

  render() {
    let data = this.props.data

    return(
      <View style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.header}>{data.header} </Text>
          <Text style={styles.title}>{data.title} </Text>
          <View style={styles.separator} />
          <View style={styles.textContainer}>
            <HTMLView value={data.text} />
          </View>
        </View>
      </View>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  page:{
    backgroundColor:'transparent'
  },
  container:{
    margin:10*initialScale,
    backgroundColor:'white',
    padding:25*initialScale,
    borderRadius:10*initialScale,
    borderColor:AppColors.graySepator,
    borderWidth:1
  },
  header:{
    marginBottom:5,
    fontFamily:AppFonts.bold,
    fontSize:20*initialScale,
    textAlign:'center'
  },
  title:{
    fontFamily:AppFonts.lightItalic,
    fontSize:18*initialScale,
    textAlign:'center'
  },
  separator:{
    height:1,
    backgroundColor:AppColors.graySepator,
    marginTop:20*initialScale
  },
  textContainer:{
    marginTop:20*initialScale,
  }
})
