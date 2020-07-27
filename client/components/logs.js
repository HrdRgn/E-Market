import React from 'react'
import { useSelector } from 'react-redux'

import Header from './header'
import Head from './head'

const Home = () => {
  const info = useSelector((s) => s.basket)

  return (
    <div>
      <Header> </Header>
      <Head title="E-Market" />
      <div> {info} </div>
    </div>
  )
}

Home.propTypes = {}

export default React.memo(Home)
