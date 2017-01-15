var React = require('react')
var ReactNative = require('react-native')
var htmlToElement = require('./htmlToElement')
import * as AppFonts from '../../commons/Fonts'
import * as AppColors from '../../commons/Colors'
var {
  Linking,
  StyleSheet,
  Text,
} = ReactNative


var HTMLView = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    stylesheet: React.PropTypes.object,
    onLinkPress: React.PropTypes.func,
    onError: React.PropTypes.func,
    renderNode: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      onLinkPress: Linking.openURL,
      onError: console.error.bind(console),
    }
  },

  getInitialState() {
    return {
      element: null,
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.startHtmlRender(nextProps.value)
    }
  },

  componentDidMount() {
    this.mounted = true
    this.startHtmlRender(this.props.value)
  },

  componentWillUnmount() {
    this.mounted = false
  },

  startHtmlRender(value) {
    if (!value) return this.setState({element: null})

    var opts = {
      linkHandler: this.props.onLinkPress,
      styles: Object.assign({}, baseStyles, this.props.stylesheet),
      customRenderer: this.props.renderNode,
    }

    htmlToElement(value, opts, (err, element) => {
      if (err) return this.props.onError(err)

      if (this.mounted) this.setState({element})
    })
  },

  render() {
    if (this.state.element) {
      return <Text children={this.state.element} />
    }
    return <Text />
  },
})

var baseStyles = StyleSheet.create({
  h1:{
    fontFamily:AppFonts.bold,
    fontSize:20,
  },
  h2:{
    fontFamily:AppFonts.lightItalic,
    fontSize:18,
  },
  b: {
    fontWeight: '800',
    fontSize:18,
  },
  p:{
    fontFamily:AppFonts.regular,
    fontSize:18
  },
  strong: {
    fontWeight: '700',
    fontFamily:AppFonts.regular,
    color:AppColors.main,
    fontSize:18
  },
  i: {
    fontFamily:AppFonts.lightItalic,
    fontSize:18
  },
  em: {
    fontFamily:AppFonts.medium,
    fontSize:18
  },
  pre: {
    fontFamily:AppFonts.regular,
    fontSize:18,
    color:AppColors.main,
  },
  code: {
    fontFamily:AppFonts.regular,
    fontSize:18,
    backgroundColor:'yellow',
  },
  li:{
    fontFamily:AppFonts.italic,
    fontSize:18
  },
  a: {
    fontFamily:AppFonts.regular,
    color: '#007AFF',
  },
})

module.exports = HTMLView
