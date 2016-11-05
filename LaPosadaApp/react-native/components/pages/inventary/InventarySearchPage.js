'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity, Alert, TextInput} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryActions from '../../../redux/actions/InventaryActions'
import * as AppDataActions from '../../../redux/actions/AppDataAction'
import {CellInfo} from '../../cell/'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import * as AppColors from '../../../commons/Colors'
var _ = require('lodash')

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class InventarySearchPage extends Component {

  constructor(props) {
      super(props);

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      let dataSource = ds.cloneWithRows(this.props.items)

      this.state = {
        text: '' ,
        dataSource:dataSource,
      };
    }

  componentDidMount() {
      this.props.initializeInventary()
  }


  _handleDelete(item){
    Alert.alert(  'Eliminar ' + item.nombre,
                  '¿Estás seguro de querer borrarlo?',
                  [{text:'Cancelar', style: 'cancel' },
                  {text:'Borrar', onPress: this.props.deleteItem.bind(this, item), style: 'cancel'},]
                )
  }

  _renderNoData(){
    return (
      <View style={{flex:1, justifyContent:'center', backgroundColor:'#ececec'}}>
        <Text style={{color:'gray', alignSelf:'center', fontSize:30}}>
        Sin datos
        </Text>
      </View>
    )
  }

  _closeKeyboard(){
    //this.refs.textInput.blur()
  }

  _handleSearch(text){
    let items = (this.props.items?this.props.items:[])

    if (text!=''){
      items = _.filter(items, function(o) { return o.nombre.toUpperCase().includes(text.toUpperCase())})
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = ds.cloneWithRows(items)
    this.setState({
      dataSource:dataSource
    })

    this._closeKeyboard()
  }


  _renderSearchHeader(){
    return(
      <View style={{backgroundColor:'#ececec', flexDirection:'row', justifyContent:'center'}}>
        <TextInput
          ref='textInput'
          style={{flex:1, borderRadius:20, marginLeft:15*initialScale, marginRight:15*initialScale, marginTop:10, paddingLeft:15, paddingRight:40, height: 45, borderColor: AppColors.graySepator, borderWidth: 1, backgroundColor:'white'}}
          onChangeText={(text) =>{
            this.setState({ text })
          }}
          onSubmitEditing={()=>{
            this._handleSearch(this.state.text)
          }}
          placeholder = 'Buscar por texto'
          returnKeyType = 'go'
          value={this.state.text}/>
          <TouchableOpacity style={{position:'absolute', right:25, top:10, bottom:0, justifyContent:'center'}} onPress={this._handleSearch.bind(this, this.state.text)}>
            <Icon name="md-search" style={{alignSelf:'center',fontSize:30, color:AppColors.main, backgroundColor:'transparent', padding:5, }} />
          </TouchableOpacity>
      </View>
    )
  }

  _renderList(){


    return(
      <View style={{flex:1, backgroundColor:'#ececec'}}>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderHeader={()=>{return this._renderSearchHeader()}}
          renderRow={(rowData, sectionID, rowID, highlightRow) => {
              return(
                <CellInfo
                  header={'ARTICULO'}
                  title={rowData.nombre}
                  subtitle={rowData.descripcion}
                  imageUriMaxi={rowData.imagenMaxi}
                  imageUriMini={rowData.imagenMini}
                  info={ (rowData.cantidad?rowData.cantidad + ' uni.':null) }
                  actionLabels={['Editar', 'Borrar']}
                  onPressAction={(index)=>{
                    if (index==0){
                      Actions.inventaryEditItem({item:rowData, title:rowData.nombre})
                    }else if (index==1){
                      this._handleDelete(rowData)
                    }
                  }}
                  onPress={()=>{Actions.inventaryDetailItem({item:rowData, title:rowData.nombre}) }}
                />
              )
          }}
        />
      </View>
    )
  }

  render() {
    let component = null
    if (!this.props.items || this.props.items==0){
      component = this._renderNoData()
    }else{
      component = this._renderList()
    }

    return(
      <View style={{flex:1}}>
        {component}
      </View>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {

  },
  actionButtonIcon: {
    fontSize: 22*initialScale,
    color: 'white',
  }
})


/*
* REDUX
*/
function mapStateToProps(state) {
  return {
    items:state.inventaryState.items,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    initializeInventary:()=>{
      dispatch(InventaryActions.initialize())
    },
    deleteItem:(item)=>{
      dispatch(InventaryActions.deleteItem(item))
    },
    closeSesion:()=>{
      dispatch(AppDataActions.closeSesion())
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventarySearchPage);
