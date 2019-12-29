import React from 'react'
import Head from 'next/head'
import { MuiThemeProvider } from '@material-ui/core'

import './index.scss'

import Dashboard from '../components/dashboard/dashboard'
import { createMuiTheme } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: { 500: '#ff5544' },
    secondary: grey
  }
})

const Home = () => {
  return (
    <>
      <Head>
        <title>MIS Tool</title>
        <link rel="icon" href="/static/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet" />
        <meta name="robots" content="noindex,nofollow"></meta>
      </Head>

      <MuiThemeProvider theme={theme}>
        <Dashboard />
      </MuiThemeProvider>
    </>
  )
}

export default Home
