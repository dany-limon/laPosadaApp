'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, View, Text, Image} from 'react-native'

import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'
import * as AppImages from '../../commons/Images'

import { connect } from 'react-redux'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class SplashPage extends Component {



  render() {
    return(
      <View style={styles.container}>
        <Image
            style={styles.image}
            source={AppImages.icono_laposada}
          />
      </View>
    )
  }
}
//icono_laposada

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:AppColors.main,
    justifyContent:'center',
    alignItems:'center',
  },
  image:{
    width: 200*initialScale,
    height: 200*initialScale
  }
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(SplashPage);
