import React from 'react'
import Head from 'next/head'
import './index.scss'

import Dashboard from '../components/dashboard'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Dashboard />

      <style jsx>{``}</style>
    </div>
  )
}

export default Home
