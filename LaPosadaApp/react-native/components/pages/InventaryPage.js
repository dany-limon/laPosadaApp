'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'


class InventaryPage extends Component {

  constructor(props) {
      super(props)
    }

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
                  <View style={{padding:20,flexDirection:'row', backgroundColor:'#EFEFEF', borderBottomWidth:1, borderBottomColor:'black'}}>
                    <View style={{width:80, height:80, backgroundColor:'red', alignSelf:'center'}}>
                      <Image
                        style={{width:80, height:80}}
                        resizeMode={'cover'}
                        source={{uri: rowData.imagen}}/>
                    </View>
                    <View style={{flex:1, marginLeft:20, alignSelf:'center'}}>
                      <Text>#{rowID}</Text>
                      <Text>Nombre {rowData.nombre}</Text>
                      <Text>Descripción {rowData.descripcion}</Text>
                      <Text>Cantidad {rowData.cantidad}</Text>
                    </View>

                  </View>
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
  console.log('mapStateToProps',state);
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
