import React, { useState } from 'react'
import Topic from './topic/topic'
import fetch from 'isomorphic-unfetch'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const Month = ({ reportId, month, setMonths }) => {
  // TODO show a dialog "Hey, are you sure?"
  const deleteMonth = async (reportId, monthId) => {
    const months = await fetch(`/api/month/${reportId}/${monthId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(m => m.json())

    setMonths([...months])
  }

  return (
    <div className="month">
      <h3>
        {month.name}
        <IconButton aria-label="delete" size="small" onClick={() => deleteMonth(reportId, month.id)}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </h3>
      {month.topics.map(topic => (
        <Topic key={`${topic.name}-${month.id}`} topic={topic} />
      ))}
    </div>
  )
}

export default Month
