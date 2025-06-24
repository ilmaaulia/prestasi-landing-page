import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'

import { thunk } from 'redux-thunk'
import achievementsReducer from './achievements/reducer'
import newsReducer from './news/reducer'
import studentsReducer from './students/reducer'

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducers = combineReducers({
  achievements: achievementsReducer,
  news: newsReducer,
  students: studentsReducer,
})

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk)),
)

export default store
