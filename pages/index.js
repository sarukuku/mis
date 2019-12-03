import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import './index.scss'
import Report from '../components/report'

const Home = () => {
  const [reporters, setReporters] = useState([])
  const [reporter, setReporter] = useState('')

  const fetchReporters = () => {
    return fetch(`http://localhost:3000/api/report`).then(res => res.json())
  }

  useEffect(() => {
    fetchReporters().then(reporters => setReporters(reporters))
  }, [])

  const addReporter = async () => {
    await fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reporter })
    })
    fetchReporters().then(reporters => setReporters(reporters))
  }

  const onChangeHandle = text => {
    setReporter(text)
  }

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <input type="text" onChange={e => onChangeHandle(e.target.value)} />
      <button onClick={addReporter}>Add new location</button>

      <div className="locations">
        {reporters.map(location => (
          <Report key={location.reporter} location={location} />
        ))}
      </div>

      <style jsx>{``}</style>
    </div>
  )
}

export default Home
