'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, Platform, ScrollView, Switch} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryAction from '../../redux/actions/InventaryActions'
import {InputText} from '../widgets/'
import ImagePicker from 'react-native-image-picker'
import * as AppConfiguration from '../../commons/Configuration.js'

class InventaryDetailItemPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: this.props.item.nombre,
        description: this.props.item.descripcion,
        quantity:this.props.item.cantidad,
        image:this.props.item.imagen,
        outside:this.props.item.exterior,
        image64:null,
        imageFile:null
      }
    }

  _handleDelete(){
    Alert.alert(  'Eliminar ' + this.state.name,
                  '¿Estás seguro de querer borrarlo?',
                  [{text:'Cancelar', style: 'cancel' },
                  {text:'Borrar', onPress: this.props.deleteItem.bind(this, this.props.item), style: 'cancel'},]
                )
  }

  _handlePressNewPhoto() {
      ImagePicker.showImagePicker(AppConfiguration.imageCaptureOptions, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) { console.log('User cancelled photo picker'); }
        else if (response.error) { console.log('ImagePicker Error: ', response.error); }
        else if (response.customButton) { console.log('User tapped custom button: ', response.customButton); }
        else {
          const source64 = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
          const uri = (Platform.OS === 'ios'?response.uri.replace('file://', ''):response.uri)

          this.setState({
            image64:response.data,
            imageFile:uri
          })
        }
      })
    }

  _renderImage(){

    var source = null
    if (this.state.image64){
      source = {uri: 'data:image/jpeg;base64,' + this.state.image64, isStatic: true};
    }else if (this.state.image){
      source = {uri: this.state.image};
    }

    if (source){
      return(
        <Image style={{width:100, height:100, backgroundColor:'#DDDDDD', alignSelf:'center'}} source={source} />
      )
    }else{
      return(
        <Text style={{backgroundColor:'#DDDDDD', padding:20, width:120, alignSelf:'center'}}> + Imagen </Text>
      )
    }
  }

  render(){
    return (
      <ScrollView style={styles.container}>

          <View style={{height:15}}/>

          <InputText
            label={'Nombre'}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}/>

          <View style={{height:15}}/>

          <InputText
            label={'Descripción'}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}/>

          <View style={{height:15}}/>

          <InputText
            label={'Cantidad'}
            keyboardType={'numeric'}
            onChangeText={(quantity) => this.setState({quantity})}
            value={this.state.quantity}/>

          <View style={{height:15}}/>

          <View style={{marginTop:20, flexDirection:'row', alignSelf:'center'}}>
            <Text style={{fontSize:20}}>Exterior</Text>
            <Switch
              onValueChange={(value) => this.setState({outside: value})}
              style={{marginLeft: 10}}
              value={this.state.outside} />
          </View>

          <TouchableOpacity onPress={this._handlePressNewPhoto.bind(this)} style={{margin:20}}>
              {this._renderImage()}

          </TouchableOpacity>

          <View style={{height:30}}/>


          <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={{flex:1, backgroundColor:'#DDDDDD', padding:15}}
              onPress={this._handleDelete.bind(this)}>
              <Text style={{alignSelf:'center', fontSize:20}}>Borrar</Text>
            </TouchableOpacity>

            <View style={{width:20}} />

            <TouchableOpacity style={{flex:1, backgroundColor:'#DDDDDD', padding:15}}
              onPress={this.props.updateItem.bind(this, this.props.item, this.state )}>
              <Text style={{alignSelf:'center', fontSize:20}}>Actualizar</Text>
            </TouchableOpacity>
          </View>

      </ScrollView>
    )
  }
}

//*************************************************
// Estilos
//*************************************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:40,
    marginRight:40
  },
})


//*************************************************
// Redux
//*************************************************
function mapStateToProps(state) {
  return {
    fbDataBase:state.appDataState.fbDataBase,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    deleteItem:(item)=>{
      Actions.pop()
      dispatch(InventaryAction.deleteItem(item))
    },
    updateItem:(item, stateObj)=>{
      Actions.pop()
      dispatch(InventaryAction.updateItem(item, stateObj))
    },
    dispatch:dispatch
  };
}

let mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {dispatch} = dispatchProps;

  let actions = {
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...actions,
    ...ownProps
  }
}

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryDetailItemPage);
