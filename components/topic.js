import React from 'react'

const Topic = ({ topic }) => {
  const { name, notes } = topic

  return (
    <div className="topic">
      <h4>{name}</h4>
      <ul>
        {notes.map(note => {
          return <li key={note}>{note}</li>
        })}
      </ul>
    </div>
  )
}

export default Topic
