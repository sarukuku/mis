import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { LabeledInput } from '../labeledInput'
import { Card, CardActions, CardContent, CardHeader, Divider, IconButton } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './styles'

const Topic = ({ topic, notes }) => {
  const classes = useStyles()
  const { name } = topic

  const [newNote, setNewNote] = useState('')

  const createNote = async () => {
    const notes = await fetch(`/api/topic/${topic.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: newNote })
    }).then(n => n.json())

    setNewNote('')
  }

  const deleteNote = async indexOfNote => {
    const notes = await fetch(`/api/topic/${topic.id}/${indexOfNote}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(n => n.json())
  }

  const allNotes =
    notes && notes.length
      ? notes.map((note, key) => {
          return (
            <React.Fragment key={`${note}-${key}`}>
              <ListItem className={classes.note} disableGutters={true}>
                <ListItemText primary={note} />
                <IconButton aria-label="delete" size="small" onClick={() => deleteNote(key)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })
      : ''

  return (
    <Card className={classes.topic}>
      <CardHeader
        className={classes.topicHeader}
        title={
          <Typography className={classes.topicTitle} component="h4">
            {name}
          </Typography>
        }
      />
      <CardContent className={classes.topicContent}>
        <List dense={true} disablePadding={true}>
          {allNotes}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <LabeledInput formClass={classes.addNote} value={newNote} valueSetter={setNewNote} submitHandler={createNote} hint="Add new note" />
      </CardActions>
    </Card>
  )
}

export default Topic
