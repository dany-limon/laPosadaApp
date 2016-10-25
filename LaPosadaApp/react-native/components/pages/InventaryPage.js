'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image, TouchableOpacity} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'


class InventaryPage extends Component {

    render() {
      if (!this.props.fbDataBase
        || !this.props.fbDataBase.inventario
        || !this.props.fbDataBase.inventario.elementos){
        return (<View/>)
      }

      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
      let dataSource = ds.cloneWithRows(this.props.fbDataBase.inventario.elementos)

      return (
        <View style={styles.container}>
          <ListView
            style={{flex:1}}
            dataSource={dataSource}
            renderRow={(rowData, sectionID, rowID, highlightRow) => {
                return(
                  <TouchableOpacity style={{padding:20,flexDirection:'row', borderBottomWidth:1, borderBottomColor:'black'}}
                      onPress={()=>{Actions.inventaryDetailItem({item:rowData, itemId:rowID}) }}>
                    <View style={{width:80, height:80, backgroundColor:'gray', alignSelf:'center'}}>
                      <Image
                        style={{width:80, height:80}}
                        resizeMode={'cover'}
                        source={{uri: rowData.imagen}}/>
                    </View>
                    <View style={{flex:1, marginLeft:20, alignSelf:'center'}}>
                      <Text>id: {rowID}</Text>
                      <Text>Nombre {rowData.nombre}</Text>
                      <Text>Descripción {rowData.descripcion}</Text>
                      <Text>Cantidad {rowData.cantidad}</Text>
                    </View>

                  </TouchableOpacity>
                )
            }}
          />
        </View>
      )
    }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})


/*
* REDUX
*/
function mapStateToProps(state) {
  return {
    fbDataBase:state.appDataState.fbDataBase,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
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
