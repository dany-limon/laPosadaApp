'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity, Alert} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryActions from '../../../redux/actions/InventaryActions'
import * as AppDataActions from '../../../redux/actions/AppDataAction'
import {CellInfo} from '../../cell/'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import * as AppColors from '../../../commons/Colors'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

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
      <View style={{flex:1, justifyContent:'center', backgroundColor:'#ececec'}}>
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
      <View style={{flex:1, backgroundColor:'#ececec'}}>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
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

  _renderActionButton(){
    return(
      <ActionButton buttonColor={AppColors.main} bgColor={'#00000044'} btnOutRange={'gray'} hideShadow={true}>
            <ActionButton.Item buttonColor={AppColors.main} title='Nuevo elemento'
             onPress={()=>{ Actions.inventaryEditItem({title:'Nuevo elemento'}) }}>
                <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>

      </ActionButton>
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
        {this._renderActionButton()}
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryPage);
