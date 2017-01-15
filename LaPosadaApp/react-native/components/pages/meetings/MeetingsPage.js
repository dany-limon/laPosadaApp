'use strict'

import React, { Component, } from 'react'
import {StyleSheet, Dimensions, View, ListView, Share} from 'react-native'
import { connect } from 'react-redux'
import {SearchHeader, GotoUpButton} from '../../widgets/'
import {HtmlTextInfoCell} from '../../cell/'
import * as AppFonts from '../../../commons/Fonts'
import * as AppColors from '../../../commons/Colors'
import _ from 'lodash'

const IPHONE6_WIDTH = 375;
const initialScale = Dimensions.get('window').width / IPHONE6_WIDTH

class MeetingsPage extends Component {

  constructor(props) {
      super(props);

      this.state = {
        text: '' ,
        filter:false,
        showButtonUp:false,
      };
    }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <HtmlTextInfoCell data={rowData} />
    )
  }

  _renderSearchHeader(){
    return(
      <SearchHeader
        placeholder = 'Filtrar por texto'
        onPressSearch = {(text)=>{ this._handleSearch(text) }}/>
    )
  }

  _getDataSource(){
    let items = (this.props.items ? this.props.items : [])
    let text = this.state.text
    if (this.state.filter && text != ''){
      items = _.filter(items, function(o) {
        if (o.header && o.header.toUpperCase().includes(text.toUpperCase())){
          return true
        }else if (o.title && o.title.toUpperCase().includes(text.toUpperCase())){
          return true
        }else if (o.text && o.text.toUpperCase().includes(text.toUpperCase())){
          return true
        }else{
          return false
        }
      })
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    let dataSource = ds.cloneWithRows(items)
    return dataSource
  }

  _handleSearch(text){
    this.setState({
      text:text,
      filter:(text!='')
    })
  }

  _handleScroll(event){
    let showButtonUp = (event.nativeEvent.contentOffset.y > 100)
    if (this.state.showButtonUp != showButtonUp)
    this.setState({
      showButtonUp:showButtonUp
    })
  }

  render() {
    return(
      <View style={styles.container}>

        <ListView
          ref='_scrollView'
          style={styles.container}
          enableEmptySections={true}
          dataSource={this._getDataSource()}
          renderHeader={this._renderSearchHeader.bind(this)}
          renderRow={this._renderRow.bind(this)}
          onScroll={this._handleScroll.bind(this)}
        />

        <GotoUpButton
          visible={this.state.showButtonUp}
          onPress={() => { this.refs._scrollView.scrollTo({x:0,y:0,animated:true}); }}/>
      </View>
    )
  }
}

/*
* ESTILOS
*/
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:AppColors.backgroundList,
  },
})


/*
* REDUX
*/
function mapStateToProps(state) {
  return {
    items:state.meetingsState.items,
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

export default connect(mapStateToProps,mapDispatchToProps,mergeProps)(MeetingsPage);
