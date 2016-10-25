'use strict';

//*************************************************
// React
//*************************************************
import React, { Component, } from 'react'
import {StyleSheet, Text, View, Navigator, Platform} from 'react-native'

//*************************************************
// Router-flux
//*************************************************
import {Modal, Actions, Scene, Router} from 'react-native-router-flux'


//*************************************************
// Redux
//*************************************************
import { connect } from 'react-redux'
import * as AppDataAction from './redux/actions/AppDataAction'
import {InventaryPage, InventaryDetailPage} from './components/pages/'

const scenes = Actions.create(
  <Scene key="root" >
      <Scene key="inventary" initial={true} component={InventaryPage} title='Inventario'/>
      <Scene key="inventaryDetail" component={InventaryDetailPage} title='Detalle'/>
  </Scene>
)

class LaPosadaApp extends Component {

    //Constructor del componente
    constructor(props) {
      super(props)
    }

    componentWillMount() {
      //Apaño para que se vea bien en Android 4
      if(Platform.OS === 'android' && Platform.Version < 21){
        Navigator.NavigationBar.Styles.General.NavBarHeight = 40
      }
    }

    componentDidMount() {
      this.props.initializeApp()
    }

    getNavBarOffset(){
      var offset = 0
      if (Platform.OS === 'ios'){
        offset = 20
      } else if(Platform.OS === 'android' && Platform.Version < 21){
        offset = 13
      }else if(Platform.OS === 'android' && Platform.Version >= 21){
        offset = 0
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
           />
      )
    }
}

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
