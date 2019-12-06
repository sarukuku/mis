import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { LabeledInput } from '../labeledInput'
import { Card, CardActions, CardContent, CardHeader, IconButton, Divider } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './styles'

const Topic = ({ topic }) => {
  const classes = useStyles()

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
              <>
            <ListItem className={classes.note} disableGutters="true" key={`${note}-${key}`}>
              <ListItemText primary={note} />
              <IconButton aria-label="delete" size="small" onClick={() => deleteNote(key)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItem>
            <Divider />
            </>
          )
        })
      : ''

  return (
    <Card className={classes.topic}>
      <CardHeader title={<Typography component="h4">{name}</Typography>} />
      <CardContent className={classes.topicContent}>
        <List className={classes.noteList} dense="true" disablePadding="true">
          {allNotes}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <LabeledInput value={newNote} valueSetter={setNewNote} submitHandler={createNote} hint="Add new note" />
      </CardActions>
    </Card>
  )
}

export default Topic
