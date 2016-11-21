'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, View, Text} from 'react-native'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {InventaryPage, StatutesPage} from './'
import {TabBar} from '../widgets/'


const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class HomePage extends Component {

  render() {
    return(
      <View style={styles.container}>
        <ScrollableTabView
          style={{flex:1}}
          locked={true}
          tabBarUnderlineStyle = {{backgroundColor:AppColors.main}}
          tabBarActiveTextColor = {AppColors.main}
          tabBarInactiveTextColor = {AppColors.lightGray}
          tabBarTextStyle = {{ fontSize:20*initialScale, paddingTop:5}}
          >
             <InventaryPage tabLabel = 'Inventario'/>
             <StatutesPage tabLabel = 'Estatutos'/>
             <View tabLabel = 'Reuniones'/>
        </ScrollableTabView>
      </View>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'white'
  },
})
