'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class LaPosadaApp extends Component {

  constructor(props) {
      super(props);
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
