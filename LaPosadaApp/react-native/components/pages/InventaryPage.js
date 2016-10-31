'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'
import * as InventaryActions from '../../redux/actions/InventaryActions'
import {InventaryCell} from '../cell/'

class InventaryPage extends Component {

  componentDidMount() {
      this.props.initializeInventary()
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
        style={{flex:1}}
        enableEmptySections={true}
        dataSource={dataSource}
        renderRow={(rowData, sectionID, rowID, highlightRow) => {
            return(
              <InventaryCell
                item={rowData}
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
