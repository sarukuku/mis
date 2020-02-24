import React, { useEffect, useState } from 'react'
import Report from '../report'
import fetch from 'isomorphic-unfetch'
import './style.scss'
import Navbar from '../navbar/navbar'

// TODO add this to the filter
const nMonths = 3

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [newReporter, setNewReporter] = useState('')

  const fetchReporters = () => {
    return fetch(`/api/report?nMonths=${nMonths}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

  useEffect(() => {
    fetchReporters().then(setReports)
    
    // SSE client
    const eventSource = new EventSource('/stream')

    eventSource.addEventListener('open', () => {
      console.log("Connection to stream opened")
    })
  
    eventSource.addEventListener('message', event => {
      const data = JSON.parse(event.data)
      console.log(data)
    })

    eventSource.addEventListener('error', () => {
      eventSource.close()
      console.log("event stream closed")
    })
  }, [])

  const addReporter = async () => {
    await fetch('/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reporter: newReporter })
    })
    setNewReporter('')
    fetchReporters().then(setReports)
  }

  return (
    <>
      <Navbar
        reports={reports}
        setReports={setReports}
        newReporter={newReporter}
        setNewReporter={setNewReporter}
        addReporter={addReporter}
      />
      <div className="locations">
        {reports
          .filter(r => !r.hidden)
          .map(r => (
            <Report key={r.reporter} location={r} />
          ))}
      </div>
    </>
  )
}

export default Dashboard
