import React, { useState, useEffect } from 'react'
import Month from './month/month'

const Report = ({ location }) => {
  const [months, setMonths] = useState([])

  useEffect(() => {
    setMonths(location.months)
  }, [])

  return (
    <div className="location">
      <h2>{location.reporter}</h2>

      <div className="months">
        {months.reverse().map(month => (
          <Month key={month.name} reportId={location.id} month={month} setMonths={setMonths} />
        ))}
      </div>
    </div>
  )
}

export default Report
