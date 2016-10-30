'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Platform, Text, View, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import {InputText} from '../widgets/'
import * as InventaryAction from '../../redux/actions/InventaryActions'
import * as AppConfiguration from '../../commons/Configuration.js'

class InventaryAddItemPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        quantity:'',
        image64:null,
        imageFile:null
      }
    }

    _handlePressSave(){
      this.props.addNewItem(this.state.name,
        this.state.description,
        this.state.quantity,
        this.state.imageFile)
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
      if (this.state.image64){
        var source = {uri: 'data:image/jpeg;base64,' + this.state.image64, isStatic: true};
        return(
            <Image style={{width:100, height:100, backgroundColor:'green', alignSelf:'center'}} source={source} />
        )
      }
    }

    render() {
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

            <TouchableOpacity onPress={this._handlePressNewPhoto.bind(this)} style={{margin:20}}>
                {this._renderImage()}
                <Text style={{backgroundColor:'#DDDDDD', padding:20, width:120, alignSelf:'center'}}> + Imagen </Text>
            </TouchableOpacity>


          <View style={{height:30}}/>

          <TouchableOpacity style={{ backgroundColor:'#DDDDDD', padding:20}}
            onPress={this._handlePressSave.bind(this)}>
            <Text style={{alignSelf:'center', fontSize:20}}>Guardar</Text>
          </TouchableOpacity>


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
    addNewItem:(name, description, quantity, file)=>{
      Actions.pop()
      dispatch(InventaryAction.addNewItem(name, description, quantity, file))
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryAddItemPage);
