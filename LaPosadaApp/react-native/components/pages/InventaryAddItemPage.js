'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'

import {InputText} from '../widgets/'
import * as InventaryAction from '../../redux/actions/InventaryActions'

class InventaryAddItemPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name: '',
        description: '',
        quantity:''
      }
    }

    _handlePressSave(){
      let item = {
        nombre:this.state.name,
        descripcion:this.state.description,
        cantidad:this.state.quantity
      }
      this.props.addNewItem(item)
    }

    render() {
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
            onPress={this._handlePressSave.bind(this)}>
            <Text>Guardar</Text>
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
    addNewItem:(item)=>{
      Actions.pop()
      dispatch(InventaryAction.addNewItem(item))
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
