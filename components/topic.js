import React from 'react'

const Topic = ({ topic }) => {
  const { name, notes } = topic

  const allNotes =
    notes && notes.length
      ? notes.map(note => {
          return <li key={note}>{note}</li>
        })
      : ''

  return (
    <div className="topic">
      <h4>{name}</h4>
      <ul>{allNotes}</ul>
    </div>
  )
}

export default Topic
