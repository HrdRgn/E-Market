import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux'
import Users from './users'
import Header from './header'
import Head from './head'

const Dummy = () => {
  return (
    <div>
      <Header> </Header>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <Provider store={store}>
          <Users />
        </Provider>
        <div className="bg-indigo-800 hover:text-red-500 text-white font-bold rounded-lg border shadow-lg p-10">
          Abracardabara
        </div>
      </div>
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
