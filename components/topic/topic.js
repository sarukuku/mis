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

  const deleteNote = async indexOfNote => {
    const notes = await fetch(`/api/topic/${topic.id}/${indexOfNote}`, {
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
            <ListItem disableGutters="true" key={`${note}-${key}`}>
              <ListItemText primary={note} />
              <IconButton aria-label="delete" size="small" onClick={() => deleteNote(key)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItem>
          )
        })
      : ''

  return (
    <div className="topic">
      <Typography component="h4">{name}</Typography>
      <List dense="true" disablePadding="true">
        {allNotes}
      </List>
      <LabeledInput value={newNote} valueSetter={setNewNote} submitHandler={createNote} hint="Add new note" />
    </div>
  )
}

export default Topic
