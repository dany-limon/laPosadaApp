'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity,
  TextInput, Alert} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import * as InventaryActions from '../../../redux/actions/InventaryActions'
import * as AppDataActions from '../../../redux/actions/AppDataAction'
import {CellInfo} from '../../cell/'
import {SearchHeader, GotoUpButton} from '../../widgets/'
import * as AppColors from '../../../commons/Colors'
import * as AppFonts from '../../../commons/Fonts'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class InventaryPage extends Component {

  constructor(props) {
      super(props);

      this.state = {
        text: '' ,
        filter:false,
        showButtonUp:false,
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

      </View>
    )
  }

  _handleSearch(text){
    this.setState({
      text:text,
      filter:(text!='')
    })
  }

  _handleScroll(event){
    let showButtonUp = (event.nativeEvent.contentOffset.y > 100)
    if (this.state.showButtonUp != showButtonUp)
    this.setState({
      showButtonUp:showButtonUp
    })
  }

  _renderSearchHeader(){
    return(
      <SearchHeader
        placeholder = 'Filtrar por nombre o descripción'
        onPressSearch = {(text)=>{ this._handleSearch(text) }}/>
    )
  }

  _renderFooter(){
    return(<View style={{height:20}}/>)
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <CellInfo
        header={rowData.type}
        title={rowData.name}
        subtitle={rowData.description}
        imageUriMaxi={rowData.imageMaxi}
        imageUriMini={rowData.imageMini}
        info={ (rowData.quantity?rowData.quantity + ' uni.':null) }
        actionLabels={['Editar', 'Borrar']}
        onPressAction={(index)=>{
          if (index==0){
            Actions.inventaryEditItem({item:rowData, title:rowData.name})
          }else if (index==1){
            this._handleDelete(rowData)
          }
        }}
        onPress={()=>{Actions.inventaryDetailItem({item:rowData, title:rowData.name}) }}
      />
    )
  }

  _getDataSource(){
    let items = this.props.items
    let text = this.state.text
    if (this.state.filter && text != ''){
      items = _.filter(items, function(o) {
        if (o.name && o.name.toUpperCase().includes(text.toUpperCase())){
          return true
        }else if (o.description && o.description.toUpperCase().includes(text.toUpperCase())){
          return true
        }else if (o.type && o.type.toUpperCase().includes(text.toUpperCase())){
          return true
        }else{
          return false
        }
      })
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = ds.cloneWithRows(items)
    return dataSource
  }

  _renderList(){
    return(
      <View style={styles.list}>

        <ListView
          ref='_scrollView'
          style={styles.list}
          enableEmptySections={true}
          dataSource={this._getDataSource()}
          renderHeader={this._renderSearchHeader.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          renderRow={this._renderRow.bind(this)}
          onScroll={this._handleScroll.bind(this)}
        />

        <GotoUpButton
          visible={this.state.showButtonUp}
          onPress={() => { this.refs._scrollView.scrollTo({x:0,y:0,animated:true}); }}/>
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
      <View style={styles.container}>
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
    flex:1
  },
  list:{
    flex:1,
    backgroundColor:'transparent'
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
