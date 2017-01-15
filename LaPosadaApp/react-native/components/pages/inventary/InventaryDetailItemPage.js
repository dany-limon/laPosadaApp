'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Platform, Dimensions, Text, View, Alert, Image, TouchableOpacity,  ScrollView, Switch} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import * as InventaryAction from '../../../redux/actions/InventaryActions'
import {InputText} from '../../widgets/'
import Lightbox from 'react-native-lightbox'
import PhotoView from 'react-native-photo-view'
import * as AppFonts from '../../../commons/Fonts'
import * as AppColors from '../../../commons/Colors'

const IPHONE6_WIDTH = 375;
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const initialScale = screenWidth / IPHONE6_WIDTH

class InventaryDetailItemPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: this.props.item.name,
        description: this.props.item.description,
        quantity:this.props.item.quantity,
        image:this.props.item.image,
        outside:this.props.item.outside,
        type:this.props.item.type,
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
    if (this.props.item.image){
      let image = (this.props.item.imageMaxi?this.props.item.imageMaxi:this.props.item.image)
      let title = (this.state.name?this.state.name:'')
      console.log(image);
      return(
        <TouchableOpacity style={styles.imageContainer}
          onPress={()=>{Actions.fullScreenPage({image:image, title:title})}}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: this.props.item.image }} />
        </TouchableOpacity>
      )
    }
  }

  _renderQuantity(){
    if (this.state.quantity){
      return(
        <Text style={styles.quantity}>
          {this.state.quantity} uni.
        </Text>
      )
    }
  }
  render(){
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator ={false}>

          {this._renderImage()}

          <View style={styles.infoContainer}>
            <Text style={styles.name}>
              {(this.state.name?this.state.name.toUpperCase():'')}
            </Text>

            <Text style={[styles.type, {color:AppColors.getColorFromType(this.state.type)}]}>
              {(this.state.type?this.state.type.toUpperCase():'')}
            </Text>

            <Text style={styles.description}>
              {this.state.description}
            </Text>

            <View style={styles.separator} />

            <View style={{flexDirection:'row'}}>
              {this._renderQuantity()}

              <Text style={styles.outside}>
                {(this.state.outside?'Se':'No se')} puede sacar
              </Text>
            </View>
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
    paddingLeft:40*initialScale,
    paddingRight:40*initialScale,
    backgroundColor:'white'
  },
  infoContainer:{
     marginTop:40*initialScale,
     marginBottom:40*initialScale
  },
  imageContainer:{
    height:200*initialScale,
    width:200*initialScale,
    marginTop:30*initialScale,
    alignSelf:'center'
  },
  image:{
    height:200*initialScale,
    borderRadius:100*initialScale
  },
  imageFull:{

  },
  quantity:{
    fontFamily:AppFonts.light,
    fontSize:20*initialScale,
    alignSelf:'center',
    marginTop:15*initialScale,
    textAlign:'left',
    color:'black'
  },
  outside:{
    flex:1,
    fontFamily:AppFonts.light,
    fontSize:20*initialScale,
    alignSelf:'center',
    marginTop:15*initialScale,
    textAlign:'right',
    color:'black'
  },
  separator:{
    flex:1,
    height:1,
    backgroundColor:'#DFDFDF',
    marginTop:40*initialScale
  },
  description:{
    fontFamily:AppFonts.regular,
    fontSize:18*initialScale,
    alignSelf:'center',
    marginTop:10*initialScale,
    textAlign:'center',
    color:'#000000AA'
  },
  type:{
    fontFamily:AppFonts.regular,
    fontSize:18*initialScale,
    alignSelf:'center',
    marginTop:10*initialScale,
    textAlign:'center',
    color:'#000000AA'
  },
  name:{
    fontFamily:AppFonts.bold,
    fontSize:25*initialScale,
    alignSelf:'center',
    textAlign:'center',
    color:'black'
  }
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
