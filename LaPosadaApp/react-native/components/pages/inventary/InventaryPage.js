'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity, Alert} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryActions from '../../../redux/actions/InventaryActions'
import {CellInfo} from '../../cell/'

class InventaryPage extends Component {

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
      <View style={{flex:1, justifyContent:'center'}}>
        <Text style={{color:'gray', alignSelf:'center', fontSize:30}}>
        Sin datos
        </Text>
      </View>
    )
  }

  _renderList(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = ds.cloneWithRows(this.props.items)

    return(
      <ListView
        style={{flex:1, backgroundColor:'#dfdfdf'}}
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) => {
            return(
              <CellInfo
                header={'ARTICULO'}
                title={rowData.nombre}
                subtitle={rowData.descripcion}
                imageUri={rowData.imagen}
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
    )
  }

  render() {
    if (!this.props.items || this.props.items==0){
      return(this._renderNoData())
    }else{
      return(this._renderList())
    }
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {

  },
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryPage);
