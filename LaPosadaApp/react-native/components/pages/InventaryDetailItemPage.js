'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, Alert, Image, TouchableOpacity} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryAction from '../../redux/actions/InventaryActions'
import {InputText} from '../widgets/'

class InventaryDetailItemPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: this.props.item.nombre,
        description: this.props.item.descripcion,
        quantity:this.props.item.cantidad
      }
    }

  _handleDelete(){
    Alert.alert(  'Eliminar medicamento',
                  '¿Estás segura de querer borrar el medicamento?',
                  [{text:'Cancelar', style: 'cancel' },
                  {text:'Borrar', onPress: this.props.deleteItem.bind(this, this.props.itemId), style: 'cancel'},]
                )
  }

    render(){
      return (
        <View style={styles.container}>

            <View style={{height:10}}/>

            <InputText
              label={'Nombre'}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}/>

            <View style={{height:10}}/>

            <InputText
              label={'Descripción'}
              onChangeText={(description) => this.setState({description})}
              value={this.state.description}/>

            <View style={{height:10}}/>

            <InputText
              label={'Cantidad'}
              keyboardType={'numeric'}
              onChangeText={(quantity) => this.setState({quantity})}
              value={this.state.quantity}/>

            <View style={{height:30}}/>


            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#DDDDDD', padding:15}}
              onPress={this._handleDelete.bind(this)}>
              <Text>Borrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#DDDDDD', padding:15}}
              onPress={this.props.updateItem.bind(this, this.props.itemId)}>
              <Text>Actualizar</Text>
            </TouchableOpacity>
        </View>
      )
    }
}

//*************************************************
// Estilos
//*************************************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40
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
    deleteItem:(itemId)=>{
      Actions.pop()
      dispatch(InventaryAction.deleteItem(itemId))
    },
    updateItem:(itemId)=>{
      let item = {
        nombre:'XXX'
      }
      Actions.pop()
      dispatch(InventaryAction.updateItem(itemId, item))
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
