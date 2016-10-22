'use strict'

//*************************************************
// Importaciones
//*************************************************
import React, { Component, } from 'react'
import LaPosadaApp from './LaPosadaApp'
import * as firebase from 'firebase'

//*************************************************
// Configuración de Firebase
//*************************************************
const firebaseConfig = {
  apiKey: "AIzaSyAZPdz24aSCVeLLYolfiOsa4rg_PkJm4Y4",
  authDomain: "la-posada-29910.firebaseapp.com",
  databaseURL: "https://la-posada-29910.firebaseio.com",
  storageBucket: "la-posada-29910.appspot.com",
  messagingSenderId: "470755118242"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
//**************************************************

export default class App extends Component {

  //************************************************
  //Listener de Firebase
  //************************************************
  listenForItems(itemsRef) {
      itemsRef.on('value', (snap) => {

        //Almacenamos en items la BBDD de Firebase
        var items = [];
        snap.forEach((child) => {
          items.push({
            val: child.val(),
            key: child.key
          })
        })

        //TODO - almacenar en redux
        console.log('Obtenida BBDD',items)
      })
    }

  //************************************************
  //* Ciclo de Vida de react
  //************************************************
  componentDidMount() {

    //añadimos el listener de Firebase
    this.listenForItems(this.itemsRef)
  }

  //Constructor de React
  constructor(props) {
    super(props)

    //Almacenamos la Referencia a firebase
    this.itemsRef = firebaseApp.database().ref();
  }

  //Render de React
  render() {
    return (
      <LaPosadaApp />
    )
  }
}
