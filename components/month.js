import React, { useState } from 'react'
import Topic from './topic'
import fetch from 'isomorphic-unfetch'

const Month = ({ reportId, month, setMonths }) => {
  const [newTopicName, setNewTopicName] = useState('')

  const addTopic = async (reportId, monthId) => {
    const months = await fetch(`/api/month/topic/${reportId}/${monthId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newTopicName, notes: [] })
    }).then(m => m.json())

    setMonths([...months])
  }

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
        <button onClick={() => deleteMonth(reportId, month.id)}>DELETE</button>
      </h3>
      {month.topics.map(topic => (
        <Topic key={topic} topic={topic} />
      ))}
      <input
        type="text"
        onChange={e => {
          setNewTopicName(e.target.value)
        }}
      />
      <button
        onClick={() => {
          addTopic(reportId, month.id)
        }}
      >
        Add topic
      </button>
    </div>
  )
}

export default Month
