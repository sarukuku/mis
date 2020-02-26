import React, { useEffect, useState } from 'react'
import Report from '../report'
import fetch from 'isomorphic-unfetch'
import './style.scss'
import Navbar from '../navbar/navbar'

// TODO add this to the filter
const nMonths = 3

const Dashboard = () => {
  const [eventData, setEventData] = useState('')
  const [reports, setReports] = useState([])
  const [newReporter, setNewReporter] = useState('')
  let eventSource

  const fetchReporters = () => {
    return fetch(`/api/report?nMonths=${nMonths}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }

  const updateReports = (eventData, reports) => {
    if(eventData.length !== 0) {
      const data = JSON.parse(eventData)
      // The message contains the data to update the reports with.
      // Index the data via reporter->month->topic
      // The type lets you know how deep in the tree you need to go ie a month type will not have a topic ID
      switch (data.type) {
        case 'topic':
          if (reports.length !== 0) {
            let r_index = reports.findIndex(x => x.id === data.reporter)
            let months = reports[r_index].months
            let m_index = months.findIndex(x => x.id === data.month)
            let top = months[m_index].topics
            let t_index = top.findIndex(x => x.id === data.topic)
            reports[r_index].months[m_index].topics[t_index].notes = data.payload
            console.log(reports[r_index].months[m_index].topics[t_index].notes)
          }
          break;
        case 'month':
          break;
        default:
      }
    }
    return reports
  }

  useEffect(() => {
    fetchReporters().then(setReports)

    if (typeof (EventSource) !== "undefined" && eventSource === undefined) {
      eventSource = new EventSource('/stream')

      eventSource.addEventListener('open', () => {
        console.log("Connection to stream opened")
      })

      eventSource.addEventListener('error', () => {
        eventSource.close()
        console.log("event stream closed")
      })

      eventSource.addEventListener('message', (event) => {
        console.log('message received')
        setEventData(event.data)
      })
    }

    return () => {
      eventSource.close()
      setEventData('')
    }
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
        reports={updateReports(eventData, reports)}
        setReports={setReports}
        newReporter={newReporter}
        setNewReporter={setNewReporter}
        addReporter={addReporter}
      />
      <div className="locations">
        {updateReports(eventData, reports)
          .filter(r => !r.hidden)
          .map(r => (
            <Report key={r.reporter} location={r} />
          ))}
      </div>
    </>
  )
}

export default Dashboard
