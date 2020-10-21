import React from 'react'
import { Provider } from 'react-redux'

import store from './store/index'
import { init } from './helpers/db'

import PlacesNavigator from './navigation/PlacesNavigator'

init()
  .then(() => {
    console.log('Initialized database')
  })
  .catch((err) => {
    console.log('Initialized failed')
    console.log(err)
  })

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  )
}
