'use strict'

import React, { Component, } from 'react'
import {Dimensions, StyleSheet, Text, View, Alert, Image, TouchableOpacity, Platform, ScrollView, Switch} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-spinkit'
import * as InventaryAction from '../../../redux/actions/InventaryActions'
import {InputText} from '../../widgets/'
import * as AppConfiguration from '../../../commons/Configuration'
import * as AppFonts from '../../../commons/Fonts'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class InventaryEditItemPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: (this.props.item?this.props.item.name:null),
        description:  (this.props.item?this.props.item.description:null),
        quantity: (this.props.item?this.props.item.quantity:null),
        image: (this.props.item?this.props.item.image:null),
        outside: (this.props.item?this.props.item.outside:false),
        type:(this.props.item?this.props.item.type:'OTROS'),
        image64:null,
        imageFile:null
      }
    }

  _handlePressNewPhoto() {
      ImagePicker.showImagePicker(AppConfiguration.imageCaptureOptions, (response) => {
        //console.log('Response = ', response);
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
        <View style={{width:200*initialScale, height:200*initialScale}}>
          <Image style={{width:200*initialScale, height:200*initialScale, borderRadius:100*initialScale}} source={source} />
        </View>
      )
    }else{
      return(
        <View style={{width:200*initialScale, height:200*initialScale}}>
          <View style={{width:200*initialScale, height:200*initialScale, borderRadius:100*initialScale, backgroundColor:'#DDDDDD'}} />
          <View style={{position :'absolute', bottom:0, left:0, right:0, top:0, justifyContent:'center'}}>
            <Text style={{fontFamily:AppFonts.regular, textAlign:'center', padding:5*initialScale, alignSelf:'center', backgroundColor:'transparent'}}> Nueva imagen </Text>
          </View>
        </View>
      )
    }
  }

  _renderImageSection(){
    return(
      <View style={{marginTop:30*initialScale, alignSelf:'center'}}>
        <TouchableOpacity onPress={this._handlePressNewPhoto.bind(this)} style={{}}>
            {this._renderImage()}
        </TouchableOpacity>
      </View>
    )
  }

  _renderAceptButton(){
    if (!this.props.uploadingItem){
      return(
        <View style={{flexDirection:'row', marginBottom:60*initialScale}}>
          <TouchableOpacity style={{flex:1, backgroundColor:'#722f37', padding:15*initialScale, borderRadius:15*initialScale}}
            onPress={()=>{

              if (!this.state.name || this.state.name==''){
                Alert.alert( 'Faltan datos', 'Debes escribir al menos un nombre.', [ {text: 'Aceptar'}, ] )
                return
              }

              if(this.props.item){
                this.props.updateItem(this.props.item, this.state )
              }else{
                this.props.addNewItem(this.state )
              }
            }}>
            <Text style={{alignSelf:'center', fontSize:20*initialScale, color:'white', fontFamily:AppFonts.medium}}>
              {(this.props.item?'Actualizar':'Guardar')}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }else{
      return(
        <Spinner style={{alignSelf:'center'}} type='FadingCircleAlt' color={AppColors.main} size={50*initialScale}/>
      )
    }
  }
  render(){
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator ={false}>

          {this._renderImageSection()}

          <View style={{height:40*initialScale}}/>
          <InputText
            label={'Nombre'}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}/>

          <View style={{height:20*initialScale}}/>
          <InputText
            label={'Descripción'}
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}/>

          <View style={{height:20*initialScale}}/>
          <InputText
            label={'Tipo'}
            onChangeText={(type) => this.setState({type})}
            value={this.state.type}/>


          <View style={{height:20*initialScale}}/>
          <InputText
            label={'Cantidad'}
            keyboardType={'numeric'}
            onChangeText={(quantity) => this.setState({quantity})}
            value={this.state.quantity}/>

          <View style={{marginTop:40*initialScale, flexDirection:'row', alignSelf:'center'}}>
            <Text style={{fontSize:20*initialScale, flex:1 , fontFamily:AppFonts.regular, color:'black'}}>Se puede sacar de la peña</Text>
            <Switch
              onValueChange={(value) => this.setState({outside: value})}
              style={{marginLeft: 10*initialScale, alignSelf:'center'}}
              value={this.state.outside} />
          </View>

          <View style={{height:40*initialScale}}/>
          {this._renderAceptButton()}


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
    marginLeft:40*initialScale,
    marginRight:40*initialScale
  },
})


//*************************************************
// Redux
//*************************************************
function mapStateToProps(state) {
  return {
    fbDataBase:state.appDataState.fbDataBase,
    uploadingItem:state.inventaryState.fbDataBase,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    updateItem:(item, stateObj)=>{
      Actions.pop()
      dispatch(InventaryAction.updateItem(item, stateObj))
    },
    addNewItem:(stateObj)=>{
      Actions.pop()
      dispatch(InventaryAction.addNewItem(stateObj))
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryEditItemPage);
