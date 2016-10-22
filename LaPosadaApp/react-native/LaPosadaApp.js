'use strict'

//*************************************************
// React
//*************************************************
import React, { Component, } from 'react'
import {StyleSheet, Text, View} from 'react-native'

//*************************************************
// Router-flux
//*************************************************
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'

//*************************************************
// Firebase
//*************************************************
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyAZPdz24aSCVeLLYolfiOsa4rg_PkJm4Y4",
  authDomain: "la-posada-29910.firebaseapp.com",
  databaseURL: "https://la-posada-29910.firebaseio.com",
  storageBucket: "la-posada-29910.appspot.com",
  messagingSenderId: "470755118242"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

//*************************************************
// Redux
//*************************************************
import { connect } from 'react-redux'
import * as AppDataAction from './redux/actions/AppDataAction'


class LaPosadaApp extends Component {

  constructor(props) {
      super(props)

      //Almacenamos la Referencia a firebase
      this.itemsRef = firebaseApp.database().ref()
    }

    componentDidMount() {

      //añadimos el listener de Firebase
      this.listenForItems(this.itemsRef)
    }

    //************************************************
    //Listener de Firebase
    //************************************************
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

          //Formateamos en items la BBDD de Firebase
          var items = [];
          snap.forEach((child) => {
            items.push({
              val: child.val(),
              key: child.key
            })
          })

          //Almacenamos los items en el store de Redux
          this.props.updateAppData(items)
        })
      }

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Bienvenido a React Native!
          </Text>
          <Text style={styles.instructions}>
            La Posada versión inicial
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


/*
* REDUX
*/
function mapStateToProps(state) {
  return {
    data:state.appDataState.data,
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    updateAppData:(data)=>{
      dispatch(AppDataAction.updateData(data))
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(LaPosadaApp);
