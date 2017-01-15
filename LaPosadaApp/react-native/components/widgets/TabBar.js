
import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';


const IPHONE6_WIDTH = 375;
var initialScale = Dimensions.get('window').width / IPHONE6_WIDTH


const TabBar = React.createClass({
  propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    tabIconsOff: React.PropTypes.object,
    tabIconsOn: React.PropTypes.object,
  },

  componentDidMount() {
    this.setAnimationValue({ value: this.props.activeTab, });
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue);
  },

  setAnimationValue({ value, }) {

  },

  //color between rgb(59,89,152) and rgb(204,204,204)
  iconColor(progress) {
    const red = 59 + (204 - 59) * progress;
    const green = 89 + (204 - 89) * progress;
    const blue = 152 + (204 - 152) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  },

  render() {
    const tabWidth = this.props.containerWidth / this.props.tabs.length;
    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1, ], outputRange: [0, tabWidth, ],
    });
    return <View style={{backgroundColor:'white'}}>
      <View style={[styles.tabUpLineStyle,{width:this.props.containerWidth}]}/>
    <Animated.View style={[styles.tabUnderlineStyle, { width: tabWidth }, { left, }, ]} />
      <View style={[styles.tabs, this.props.style, ]}>
        {this.props.tabs.map((tab, i) => {
          return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={[styles.tab]}>
            <Image
              resizeMode='contain'
              style={{width:55*initialScale,height:55*initialScale}}
              source={this.props.activeTab == i ? this.props.tabIconsOn[tab] : this.props.tabIconsOff[tab]} />
          </TouchableOpacity>;
        })}

      </View>
    </View>;
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 55*initialScale,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    height: 55*initialScale,
    backgroundColor: 'transparent',
    bottom: 0,
  },
  tabUpLineStyle:{
    backgroundColor:'rgba(0,0,0,0.05)',
    height:1,
  },
});

export default TabBar;
