'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity} from 'react-native'
import Lightbox from 'react-native-lightbox'

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
        <Text style={{color:'gray', paddingLeft:15, paddingTop:15, paddingBottom:15, paddingRight:15}}> {this.props.header} </Text>
      )
    }
  }

  _renderTitle(){
    if (this.props.title){
      return(
        <Text style={{fontSize:20, fontWeight:'bold'}} numberOfLines={1}>{this.props.title}</Text>
      )
    }
  }

  _renderSubtitle(){
    if (this.props.subtitle){
      return(
        <Text style={{fontSize:14, marginTop:3}} numberOfLines={1}>{this.props.subtitle}</Text>
      )
    }
  }

  _renderInfo(){
    if (this.props.info){
      return(
        <View style={{alignSelf:'center', marginLeft:15,}}>
          <Text style={{fontSize:20, fontWeight:'bold'}} numberOfLines={1}>{this.props.info}</Text>
        </View>
      )
    }
  }

  _renderImage(){
    if (this.props.imageUri){
      return(
        <View style={{ height:50, width:50,  marginRight:5}}>
          <Lightbox underlayColor='transparent' activeProps={{flex:1, borderRadius:0}} navigator={this.props.navigator} >
            <Image
              style={{ height:50, borderRadius:25, }}
              resizeMode="cover"
              source={{ uri: this.props.imageUri }} />
          </Lightbox>
        </View>
      )
    }else{
      return(
        <View style={{ height:50, width:50, borderRadius:25,  marginRight:5, backgroundColor:'#DFDFDF'}} />
      )
    }
  }

  _renderAction(item, index){
    return(
      <TouchableOpacity key={index} style={{padding:15}} onPress={this.props.onPressAction.bind(this, index)}>
        <Text  style={{color:'#5f021f'}}> {item} </Text>
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
      <TouchableOpacity style={{flex:1, backgroundColor:'#FEFEFE', marginTop:10, marginLeft:15, marginRight:15, borderRadius:5}}
          onPress={this.props.onPress}>

          {this._renderHeader()}

          <View style={{flexDirection:'row', paddingLeft:20, paddingBottom:15, paddingRight:20 }}>

              {this._renderImage()}
              <View style={{flex:1,alignSelf:'center', marginLeft:10}}>
                {this._renderTitle()}
                {this._renderSubtitle()}
              </View>

              {this._renderInfo()}
          </View>

        <View style={{flex:1, height:1, backgroundColor:'#DFDFDF'}} />

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

  },
})
