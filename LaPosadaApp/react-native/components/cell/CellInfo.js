'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity} from 'react-native'
import Lightbox from 'react-native-lightbox'
import * as AppFonts from '../../commons/Fonts'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class CellInfo extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    onPressAction: React.PropTypes.func,
    actionLabels:React.PropTypes.array,
    header: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    imageUri: React.PropTypes.string,
    info: React.PropTypes.string,
  }

  static defaultProps = {
    header:null,
    title:null,
    subtitle:null,
    imageUri:null,
    info:null,
    actionLabels:null
  }

  _renderHeader(){
    if (this.props.header){
      return(
        <Text style={styles.header}> {this.props.header} </Text>
      )
    }
  }

  _renderTitle(){
    if (this.props.title){
      return(
        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
      )
    }
  }

  _renderSubtitle(){
    if (this.props.subtitle){
      return(
        <Text style={styles.subtitle} numberOfLines={1}>{this.props.subtitle}</Text>
      )
    }
  }

  _renderInfo(){
    if (this.props.info){
      return(
        <View style={{alignSelf:'center', marginLeft:15*initialScale,}}>
          <Text style={styles.info} numberOfLines={1}>{this.props.info}</Text>
        </View>
      )
    }
  }

  _renderImage(){
    if (this.props.imageUri){
      return(
        <View style={{ height:56*initialScale, width:56*initialScale,  marginRight:5*initialScale}}>
          <Lightbox underlayColor='transparent' activeProps={{flex:1, borderRadius:0}} springConfig={{ tension: 30, friction: 3 }} onRequestClose={()=>{}}>
            <Image
              style={{ height:56*initialScale, borderRadius:28*initialScale, }}
              resizeMode="cover"
              source={{ uri: this.props.imageUri }} />
          </Lightbox>
        </View>
      )
    }else{
      return(
        <View style={{ height:56*initialScale, width:56*initialScale, borderRadius:28*initialScale,  marginRight:5*initialScale, backgroundColor:'#DFDFDF'}} />
      )
    }
  }

  _renderAction(item, index){
    return(
      <TouchableOpacity key={index} style={{padding:15*initialScale}} onPress={this.props.onPressAction.bind(this, index)}>
        <Text  style={styles.button}> {item} </Text>
      </TouchableOpacity>

    )
  }

  _renderActions(){
    if (this.props.actionLabels){
      return(
        <View style={{ justifyContent: 'space-between', flexDirection:'row'}} >
          {
            this.props.actionLabels.map(this._renderAction.bind(this))
          }
        </View>
      )
    }
  }

  render() {
    return(
      <TouchableOpacity style={styles.container}
          onPress={this.props.onPress}>

          {this._renderHeader()}

          <View style={{flexDirection:'row', paddingLeft:20*initialScale, paddingBottom:15*initialScale, paddingRight:20*initialScale }}>

              {this._renderImage()}
              <View style={{flex:1,alignSelf:'center', marginLeft:10*initialScale}}>
                {this._renderTitle()}
                {this._renderSubtitle()}
              </View>

              {this._renderInfo()}
          </View>

        <View style={{flex:1, height:1, marginTop:5*initialScale, backgroundColor:'#DFDFDF'}} />

        {this._renderActions()}

      </TouchableOpacity>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FEFEFE',
    marginTop:10*initialScale,
    marginLeft:15*initialScale,
    marginRight:15*initialScale,
    borderRadius:10*initialScale,
    borderColor:'#DFDFDF',
    borderWidth:1
  },
  title:{
    fontSize:20*initialScale,
    fontFamily:AppFonts.bold
  },
  subtitle:{
    fontSize:14*initialScale,
    marginTop:3*initialScale,
    fontFamily:AppFonts.regular
  },
  info:{
    fontSize:20*initialScale,
    fontFamily:AppFonts.medium
  },
  button:{
    color:'#722f37',
    fontSize:16*initialScale,
    fontFamily:AppFonts.light
  },
  header:{
    color:'gray',
    paddingLeft:15*initialScale,
    paddingTop:15*initialScale,
    paddingBottom:15*initialScale,
    paddingRight:15*initialScale,
    fontFamily:AppFonts.lightItalic
  }
})
