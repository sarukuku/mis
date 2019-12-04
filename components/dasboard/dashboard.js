import React, { useEffect, useState } from 'react'
import Report from '../report'
import fetch from 'isomorphic-unfetch'
import './style.scss'
import CheckBoxFilterHorizontal from '../checboxFilterHorizontal'
import { LabeledInput } from '../labeledInput'

const Dashboard = () => {
  const [reports, setReports] = useState([])
  const [newReporter, setNewReporter] = useState('')

  const fetchReporters = () => {
    return fetch(`http://localhost:3000/api/report`).then(res => res.json())
  }

  useEffect(() => {
    fetchReporters().then(setReports)
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
      <CheckBoxFilterHorizontal elements={reports} setElements={setReports} label={'reporter'} />
      <LabeledInput value={newReporter} valueSetter={setNewReporter} submitHandler={addReporter} hint="Add new reporter" />
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
