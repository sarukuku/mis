import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { LabeledInput } from './labeledInput'
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

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
              <span>{note}</span>
              <IconButton aria-label="delete" size="small" onClick={() => deleteNote(note)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </li>
          )
        })
      : ''

  return (
    <div className="topic">
      <h4>{name}</h4>
      <ul>{allNotes}</ul>
      <LabeledInput value={newNote} valueSetter={setNewNote} submitHandler={createNote} />
    </div>
  )
}

export default Topic
