import React, { useEffect, useState } from 'react'
import Report from '../report'
import fetch from 'isomorphic-unfetch'
import './style.scss'

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [newReporter, setNewReporter] = useState('')
  const [filteredReporters, setFilteredReporters] = useState({})

  const handleFilteredReporter = (reporter, checked) => {
    filteredReporters[reporter] = checked
    setFilteredReporters({ ...filteredReporters })
  }

  const fetchReporters = () => {
    return fetch(`http://localhost:3000/api/report`).then(res => res.json())
  }

  useEffect(() => {
    fetchReporters().then(r => {
      setReports(r)

      // initialize filters
      r.map(rf => (filteredReporters[rf.reporter] = true))
      setFilteredReporters({ ...filteredReporters })
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
      <div>
        {reports.map(r => (
          <span key={`filter-${r.reporter}`}>
            <label>{r.reporter}</label>
            <input
              type="checkbox"
              checked={!!filteredReporters[r.reporter]}
              onChange={e => handleFilteredReporter(r.reporter, e.target.checked)}
            />
          </span>
        ))}
      </div>

      <div>
        <input type="text" value={newReporter} onChange={e => setNewReporter(e.target.value)} />
        <button onClick={addReporter}>Add new Report</button>
      </div>

      <div className="locations">
        {reports
          .filter(r => !!filteredReporters[r.reporter])
          .map(r => (
            <Report key={r.reporter} location={r} />
          ))}
      </div>
    </>
  )
}

export default Dashboard
