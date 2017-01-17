'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity, Alert} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Spinner from 'react-native-spinkit'
import { connect } from 'react-redux'
import * as AppDataActions from '../../../redux/actions/AppDataAction'
import {InputText, Button, LabelButton} from '../../widgets/'
import * as AppFonts from '../../../commons/Fonts'
import * as AppColors from '../../../commons/Colors'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class LoginPage extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password:  '',
      }
    }

  _renderLoginButton(){
    if (!this.props.loginInProgress){
      return(
        <View>
          <Button label='Acceder' onPress={()=>{
            console.log('Accediendo');
            this.props.login(this.state.email, this.state.password)
          }} />

          <LabelButton
            label='He olvidado mi contraseña'
            onPress={()=>{ Actions.restorePassword() }}/>
        </View>
      )
    }else{
      return(
        <Spinner style={{alignSelf:'center'}} type='FadingCircleAlt' color={AppColors.main} size={50*initialScale}/>
      )
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <InputText
          label={'Email'}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}/>

        <View style={{height:20*initialScale}} />
        <InputText
          label={'Contraseña'}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}/>

        <View style={{height:40*initialScale}} />
        {this._renderLoginButton()}
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
    marginLeft:40*initialScale,
    marginRight:40*initialScale,
    paddingTop:40*initialScale
  },
})


/*
* REDUX
*/
function mapStateToProps(state) {
  return {
    loginInProgress: state.appDataState.loginInProgress
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    login:(email, password)=>{
      dispatch(AppDataActions.login(email.toLowerCase(), password))
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(LoginPage);
