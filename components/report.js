import React, { useState, useEffect } from 'react'
import Month from './month'
import Topic from './topic'
import fetch from 'isomorphic-unfetch'

const Report = ({ location }) => {
  const MONTHS = ['January', 'February', 'March']

  const [months, setMonths] = useState([])

  useEffect(() => {
    setMonths(location.months)
  }, [])

  const addMonth = async (reportId, month) => {
    const months = await fetch(`/api/month/${reportId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: month, topics: [] })
    }).then(m => m.json())

    setMonths([...months])
  }

  // TODO fixme :)
  const availableMonths = MONTHS.filter(m => !location.months.includes(m))

  return (
    <div className="location">
      <h2>{location.reporter}</h2>

      <div className="months">
        {months.map(month => {
          return <Month key={month.name} reportId={location.id} month={month} setMonths={setMonths} />
        })}
        Add new month
        <select onChange={e => addMonth(location.id, e.target.value)}>
          {availableMonths.map(m => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Report
