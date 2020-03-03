import React, { useEffect, useState } from 'react'
import Report from '../report'
import fetch from 'isomorphic-unfetch'
import './style.scss'
import Navbar from '../navbar/navbar'

const nMonths = 3

// We search the reports json tree for the id we need to change
// this assumes a tree format of [node {id:
//                                     ...
//                                     [node, node, ...]},
//                                node { ... },
//                                ...]
function findAndReplaceInReports(array_of_nodes, id, payload) {
  if (!Array.isArray(array_of_nodes)) return false

  Object.values(array_of_nodes).forEach(function(o) {
    // Each node object contains one array with it's data contained
    let array_key
    for (let k in o) {
      if (o.hasOwnProperty(k) && Array.isArray(o[k])) {
        array_key = k
        break
      }
    }
    // Is this the node we want to replace?
    if (o.hasOwnProperty('id')) {
      if (o.id === id) {
        o[array_key] = payload
        return true
      }
    }
    // Recurse into the nodes data array
    if (findAndReplaceInReports(o[array_key], id, payload)) return true
  })
  return false
}

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

  const updatedReports = (eventData, reports) => {
    if (eventData.length !== 0 && reports.length !== 0) {
      const data = JSON.parse(eventData)
      if (data.id === '') {
        // If the id is '' we are updating all the reports
        reports = data.payload
      } else {
        findAndReplaceInReports(reports, data.id, data.payload)
      }
      console.log('Reports updated')
    }
    return reports
  }

  let eventOpenL
  let eventMessageL
  let eventErrorL

  useEffect(() => {
    fetchReporters().then(setReports)

    // Set up server side event handling
    if (typeof EventSource !== 'undefined' && eventSource === undefined) {
      eventSource = new EventSource('/stream')

      eventSource.addEventListener('open', eventOpenL => {
        console.log('Connection to stream opened')
      })

      eventSource.addEventListener('error', eventErrorL => {
        eventSource.close()
        console.log('Event stream closed')
      })

      eventSource.addEventListener('message', eventMessageL => {
        console.log('Message received:')
        setEventData(eventMessageL.data)
      })
    }

    return () => {
      if (eventSource !== undefined) {
        eventSource.close()
        eventSource.removeEventListener('open', eventOpenL)
        eventSource.removeEventListener('message', eventMessageL)
        eventSource.removeEventListener('error', eventErrorL)
        setEventData('')
      }
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
  }

  const latest_reports = updatedReports(eventData, reports)

  return (
    <>
      <Navbar
        reports={latest_reports}
        setReports={setReports}
        newReporter={newReporter}
        setNewReporter={setNewReporter}
        addReporter={addReporter}
      />
      <div className="locations">
        {latest_reports
          .filter(r => !r.hidden)
          .map(r => (
            <Report key={r.reporter} location={r} months={r.months} />
          ))}
      </div>
    </>
  )
}

export default Dashboard
