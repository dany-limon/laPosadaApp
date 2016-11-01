'use strict';

//*************************************************
// React
//*************************************************
import React, { Component, } from 'react'
import {StyleSheet, Text, View, Navigator, Platform, TouchableOpacity} from 'react-native'


//*************************************************
// Router-flux
//*************************************************
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'


//*************************************************
// Redux
//*************************************************
import { connect } from 'react-redux'
import * as AppDataAction from './redux/actions/AppDataAction'


//*************************************************
// Pantallas
//*************************************************
import {InventaryPage, InventaryDetailItemPage, InventaryEditItemPage, InventaryAddItemPage} from './components/pages/'
const scenes = Actions.create(
  <Scene key="root" >
      <Scene key="inventary" initial={true} component={InventaryPage} title='Inventario' rightTitle='Nuevo' onRight={()=>{Actions.inventaryNewItem()}}/>
      <Scene key="inventaryDetailItem" component={InventaryDetailItemPage} title='Detalle'/>
      <Scene key="inventaryEditItem" component={InventaryEditItemPage} title='Editar'/>
      <Scene key="inventaryNewItem" component={InventaryAddItemPage} title='Nuevo elemento'/>
  </Scene>
)

//*************************************************
// Componente
//*************************************************
class LaPosadaApp extends Component {

    //Constructor del componente
    constructor(props) {
      super(props)

      this.props.initializeApp()
    }

    componentWillMount() {
      //Apaño para que se vea bien en Android 4
      if(Platform.OS === 'android' && Platform.Version < 21){
        Navigator.NavigationBar.Styles.General.NavBarHeight = 40
      }
    }

    getNavBarOffset(){
      var offset = 0
      if (Platform.OS === 'ios'){
        offset = 20
      } else if(Platform.OS === 'android' && Platform.Version < 21){
        offset = 13
      }else if(Platform.OS === 'android' && Platform.Version >= 21){
        offset = -2
      } else{
        offset = 0
      }
      return Navigator.NavigationBar.Styles.General.NavBarHeight + offset
    }

    //Render de React Pinta las pantallas
    render() {

      return (
         <Router
            ref={(c) => this._router = c}
            scenes={scenes}
            sceneStyle={{paddingTop: this.getNavBarOffset()}}
            navigationBarStyle={{backgroundColor:'#5f021f'}}
            titleStyle={{color:'white'}}
            rightButtonTextStyle={{color:'white'}}
           />
      )
    }
}

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
    initializeApp:()=>{
      dispatch(AppDataAction.initializeApp())
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
