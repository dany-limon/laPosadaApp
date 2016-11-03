'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, ListView, Image, TouchableOpacity, Alert} from 'react-native'
import {Actions} from 'react-native-router-flux'
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
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}/>

        <View style={{height:40*initialScale}} />
        <Button label='Acceder' onPress={()=>{
          console.log('Accediendo');
          this.props.login(this.state.email, this.state.password)
        }} />

        <LabelButton
          label='He olvidado mi contraseña'
          onPress={()=>{ Actions.restorePassword() }}/>


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
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    login:(email, password)=>{
      dispatch(AppDataActions.login(email, password))
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
