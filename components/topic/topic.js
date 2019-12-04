import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { LabeledInput } from '../labeledInput'
import { IconButton } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import './style.scss'

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
            <List dense="true" disablePadding="true" key={`${note}-${key}`}>
              <ListItem disableGutters="true">
                <ListItemText primary={note} />
                <IconButton aria-label="delete" size="small" onClick={() => deleteNote(note)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </ListItem>
            </List>
          )
        })
      : ''

  return (
    <div className="topic">
      <Typography component="h4">{name}</Typography>
      <ul>{allNotes}</ul>
      <LabeledInput value={newNote} valueSetter={setNewNote} submitHandler={createNote} />
    </div>
  )
}

export default Topic
