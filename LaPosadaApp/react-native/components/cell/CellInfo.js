'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity} from 'react-native'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'
import {Actions} from 'react-native-router-flux'


const IPHONE6_WIDTH = 375;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const initialScale = screenWidth / IPHONE6_WIDTH

export default class CellInfo extends Component {

  static propTypes = {
    onPress: React.PropTypes.func,
    onPressAction: React.PropTypes.func,
    actionLabels:React.PropTypes.array,
    header: React.PropTypes.string,
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    imageUriMaxi: React.PropTypes.string,
    imageUriMini: React.PropTypes.string,
    info: React.PropTypes.string,
  }

  static defaultProps = {
    header:null,
    title:null,
    subtitle:null,
    imageUriMaxi:null,
    imageUriMini:null,
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
    if (this.props.imageUriMaxi && this.props.imageUriMini){
      let image = this.props.imageUriMaxi
      let title = (this.props.title?this.props.title:'')
      return(
        <TouchableOpacity
          style={[styles.imageHeight, styles.imageWidth, {marginRight:5*initialScale}]}
          onPress={()=>{Actions.fullScreenPage({image:image, title:title})}}>
          <Image
            style={[styles.imageHeight, styles.imageBorderRadius]}
            resizeMode="cover"
            source={{ uri: this.props.imageUriMini }} />
        </TouchableOpacity>
      )
    }else{
      return(
        <View style={[styles.imageHeight, styles.imageWidth, styles.imageBorderRadius, { marginRight:5*initialScale, backgroundColor:'#DFDFDF'}]} />
      )
    }
  }

  _renderAction(item, index){
    return(
      <TouchableOpacity key={index} style={styles.actionContainer} onPress={this.props.onPressAction.bind(this, index)}>
        <Text style={styles.button}> {item} </Text>
      </TouchableOpacity>

    )
  }

  _renderActions(){
    if (this.props.actionLabels){
      return(
        <View style={{ justifyContent: 'space-between', flexDirection:'row'}} >
          {this.props.actionLabels.map(this._renderAction.bind(this))  }
        </View>
      )
    }
  }

  render() {
    return(
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
          {this._renderHeader()}
          <View style={styles.mainContainer}>
              {this._renderImage()}
              <View style={styles.centerContainer}>
                {this._renderTitle()}
                {this._renderSubtitle()}
              </View>
              {this._renderInfo()}
          </View>
        <View style={styles.separator} />
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
    backgroundColor:AppColors.white,
    marginTop:10*initialScale,
    marginLeft:15*initialScale,
    marginRight:15*initialScale,
    borderRadius:10*initialScale,
    borderColor:AppColors.graySepator,
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
    color:AppColors.main,
    fontSize:16*initialScale,
    fontFamily:AppFonts.light
  },
  header:{
    color:AppColors.gray,
    paddingLeft:15*initialScale,
    paddingTop:15*initialScale,
    paddingBottom:15*initialScale,
    paddingRight:15*initialScale,
    fontFamily:AppFonts.lightItalic
  },
  actionContainer:{
    padding:15*initialScale
  },
  imageHeight:{
    height:56*initialScale
  },
  imageWidth:{
    width:56*initialScale
  },
  imageBorderRadius:{
    borderRadius:28*initialScale
  },
  separator:{
    flex:1,
    height:1,
    marginTop:5*initialScale,
    backgroundColor:AppColors.graySepator
  },
  centerContainer:{
    flex:1,
    alignSelf:'center',
    marginLeft:10*initialScale
  },
  mainContainer:{
    flexDirection:'row',
    paddingLeft:20*initialScale,
    paddingBottom:15*initialScale,
    paddingRight:20*initialScale
  }
})
