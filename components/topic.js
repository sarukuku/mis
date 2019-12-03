import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'

const Topic = ({ topic }) => {
  const { name } = topic

  const [notes, setNotes] = useState(topic.notes || [])
  const [newNote, setNewNote] = useState('')

  const createNote = async () => {
    const notes = await fetch(`/api/topic/${topic.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newNote })
    }).then(n => n.json())

    setNotes([...notes])
    setNewNote('')
  }

  const deleteNote = async note => {
    const notes = await fetch(`/api/topic/${topic.id}/${note}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(n => n.json())

    setNotes([...notes])
  }

  const allNotes =
    notes && notes.length
      ? notes.map((note, key) => {
          return (
            <li key={`${note}-${key}`}>
              <p>{note}</p>
              <button onClick={() => deleteNote(note)}>[delete]</button>
            </li>
          )
        })
      : ''

  return (
    <div className="topic">
      <h4>{name}</h4>
      <ul>{allNotes}</ul>
      <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} />
      <button onClick={createNote}>Add Note</button>
    </div>
  )
}

export default Topic
