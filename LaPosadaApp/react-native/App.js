'use strict'

//*************************************************
// React
//*************************************************
import React, { Component, } from 'react'
import LaPosadaApp from './LaPosadaApp'

//*************************************************
// Redux
//*************************************************
import { Provider,connect, Alert } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import * as reducers from './redux/reducers'
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <LaPosadaApp />
      </Provider>
    )
  }
  
}
