import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import SockJS from 'sockjs-client'

import { loadState, loadState1, saveState, saveState1 } from '../localstorage/localStorage'
import rootReducer from './reducers'
import createHistory from './history'
import socketActions from './sockets'

export const history = createHistory()

const isBrowser = typeof window !== 'undefined'

const persistedState = loadState()
const persistedState1 = loadState1()
const initialState = { basket: persistedState, currency: persistedState1 }
const enhancers = []
const middleware = [thunk, routerMiddleware(history)]

const composeFunc = process.env.NODE_ENV === 'development' ? composeWithDevTools : compose

const composedEnhancers = composeFunc(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer(history), initialState, composedEnhancers)
let socket

store.subscribe(() => {
  saveState(store.getState())
})
store.subscribe(() => {
  saveState1(store.getState())
})

if (typeof ENABLE_SOCKETS !== 'undefined' && ENABLE_SOCKETS) {
  const initSocket = () => {
    socket = new SockJS(`${isBrowser ? window.location.origin : 'http://localhost'}/ws`)

    socket.onopen = () => {
      store.dispatch(socketActions.connected)
    }

    socket.onmessage = (message) => {
      // eslint-disable-next-line no-console
      console.log(message)

      // socket.close();
    }

    socket.onclose = () => {
      store.dispatch(socketActions.disconnected)
      setTimeout(() => {
        initSocket()
      }, 2000)
    }
  }

  initSocket()
}
export function getSocket() {
  return socket
}

export default store
