'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity, Platform, ScrollView, Switch} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import * as InventaryAction from '../../../redux/actions/InventaryActions'
import {InputText} from '../../widgets/'
import Lightbox from 'react-native-lightbox'


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

  _renderImage(){
    if (this.props.item.imagen){
      return(
        <View style={{ height:200, width:200, marginTop:30,  alignSelf:'center'}}>
          <Lightbox underlayColor='transparent' activeProps={{flex:1, borderRadius:0, borderWidth:0}} navigator={this.props.navigator} >
            <Image
              style={{ height:200, borderRadius:100,}}
              resizeMode="cover"
              source={{ uri: this.props.item.imagen }} />
          </Lightbox>
        </View>
      )
    }
  }

  _renderQuantity(){
    if (this.state.quantity){
      return(
        <Text style={{flex:1, fontSize:16, alignSelf:'center', marginTop:15, textAlign:'left', color:'black'}}>
          {this.state.quantity} uni.
        </Text>
      )
    }
  }
  render(){
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator ={false}>

          {this._renderImage()}

          <Text style={{fontSize:25, alignSelf:'center', marginTop:40, textAlign:'center', color:'black', fontWeight:'bold'}}>
            {this.state.name.toUpperCase()}
          </Text>

          <Text style={{fontSize:16, alignSelf:'center', marginTop:10, textAlign:'center', color:'#000000AA'}}>
            {this.state.description}
          </Text>

          <View style={{flex:1, height:1, backgroundColor:'black', marginTop:30}} />

          <View style={{flexDirection:'row'}}>
            {this._renderQuantity()}

            <Text style={{flex:1, fontSize:16, alignSelf:'center', marginTop:15, textAlign:'right', color:'black'}}>
              {(this.state.outside?'Se':'No se')} puede sacar
            </Text>
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
    paddingLeft:40,
    paddingRight:40,
    backgroundColor:'#F0F0F0'
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
