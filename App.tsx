import { View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Router from './src/navigation/Router.jsx'
import SplashScreen from './src/screens/SplashScreen.jsx'
import { Provider } from 'react-redux'
import store from './src/reduxStore/store.js'



const App = () => {
  return (
    <Provider store={store} >
      <StatusBar backgroundColor='#E6F4FE' barStyle="dark-content" />
      <Router />
    </Provider>
  )
}

export default App