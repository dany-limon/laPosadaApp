'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, Text, View, TouchableOpacity, TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

export default class SearchHeader extends Component {

  static propTypes = {
    onPressSearch: React.PropTypes.func,
    placeholder: React.PropTypes.string,
  }

  static defaultProps = {
    placeholder: ''
  }

  constructor(props) {
      super(props);

      this.state = {
        text: '' ,
      };
    }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref='textInput'
          underlineColorAndroid ='transparent'
          style={styles.input}
          onChangeText={(text) =>{ this.setState({ text }) }}
          onSubmitEditing={this.props.onPressSearch.bind(this, this.state.text)}
          onEndEditing={this.props.onPressSearch.bind(this, this.state.text)}
          onFocus={() => this.setState({ text:''})}
          placeholder = {this.props.placeholder}
          returnKeyType = 'go'
          value={this.state.text}/>
          <TouchableOpacity style={styles.button} onPress={this.props.onPressSearch.bind(this, this.state.text)}>
            <Icon name="md-search" style={styles.image} />
          </TouchableOpacity>
      </View>
    )
  }
}

//*************************************************
// Estilos
//*************************************************
const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'center'
  },
  input:{
    fontSize:16,
    fontFamily:AppFonts.regular,
    flex:1,
    borderRadius:20,
    marginLeft:15*initialScale,
    marginRight:15*initialScale,
    marginTop:10, paddingLeft:15,
    paddingRight:40,
    height: 45,
    borderColor: AppColors.graySepator,
    borderWidth: 1,
    backgroundColor:'white'
  },
  button:{
    position:'absolute',
    right:25,
    top:10,
    bottom:0,
    justifyContent:'center'
  },
  image:{
    alignSelf:'center',
    fontSize:30,
    color:AppColors.main,
    backgroundColor:'transparent',
    padding:5,
  }
})
