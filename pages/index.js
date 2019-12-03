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
        <style>@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');</style>
      </Head>

      <Dashboard />

      <style jsx>{``}</style>
    </div>
  )
}

export default Home
