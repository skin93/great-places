import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import placesReducer from './reducers/places'

const reducer = combineReducers({
  places: placesReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
