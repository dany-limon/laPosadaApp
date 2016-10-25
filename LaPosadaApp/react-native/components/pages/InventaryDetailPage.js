'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View, ListView, Image} from 'react-native'
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'
import { connect } from 'react-redux'


class InventaryDetailPage extends Component {

    render() {
      if (!this.props.fbDataBase
        || !this.props.fbDataBase.inventario
        || !this.props.fbDataBase.inventario.elementos){
        return (<View/>)
      }

      return (
        <View style={styles.container}>
            <Text>detalle</Text>
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(InventaryDetailPage);
