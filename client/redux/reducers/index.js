import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import basket from './basket'
import base from './base'
import currency from './currency'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    basket,
    base,
    currency
  })
export default createRootReducer
