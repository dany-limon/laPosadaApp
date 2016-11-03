'use strict';

//*************************************************
// React
//*************************************************
import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, Navigator, Platform, TouchableOpacity} from 'react-native'
import * as AppFonts from './commons/Fonts'

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
import {SplashPage, LoginPage, RestorePaswordPage, InventaryPage, InventaryDetailItemPage, InventaryEditItemPage} from './components/pages/'
const scenes = Actions.create(
  <Scene key="root" >
      <Scene key="splash"  component={SplashPage} hideNavBar={true} type='reset' hideBackImage={true} panHandlers={null} />
      <Scene key="login" component={LoginPage} title='Acceso' hideNavBar={false} type='reset' hideBackImage={true} panHandlers={null} />
      <Scene key="restorePassword" component={RestorePaswordPage} title='Restablecer'/>
      <Scene key="inventary" initial={true} component={InventaryPage} title='Inventario' hideNavBar={false} type='reset' hideBackImage={true} panHandlers={null} />
      <Scene key="inventaryDetailItem" component={InventaryDetailItemPage} title='Detalle'/>
      <Scene key="inventaryEditItem" component={InventaryEditItemPage} title='Editar'/>
  </Scene>
)

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

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
            navigationBarStyle={{backgroundColor:'#722f37'}}
            titleStyle={{color:'white', fontFamily:AppFonts.medium, fontSize:20*initialScale, backgroundColor:'transparent'}}
            rightButtonTextStyle={{color:'white', fontFamily:AppFonts.light, fontSize:18*initialScale, backgroundColor:'transparent'}}
            hideBackImage={true}
            backTitle={'Atrás'}
            backButtonTextStyle={{color:'white', fontFamily:AppFonts.light, fontSize:18*initialScale, backgroundColor:'transparent'}}
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
