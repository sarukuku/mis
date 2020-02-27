import React, { useState, useEffect } from 'react'
import Month from './month/month'

const Report = ({ location, months }) => {
  return (
    <div className="location">
      <h2>{location.reporter}</h2>
      <div className="months">
        {months.map(month => (
          <Month key={month.name} reportId={location.id} month={month}  />
        ))}
      </div>
    </div>
  )
}

export default Report
