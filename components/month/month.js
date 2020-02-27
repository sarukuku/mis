import React, { useState } from 'react'
import Topic from '../topic/topic'
import fetch from 'isomorphic-unfetch'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { IconButton, Typography } from '@material-ui/core'
import DeleteDialog from '../delete/DeleteDialog'

import useStyles from './styles'

const Month = ({ reportId, month }) => {
  const classes = useStyles()

  const [openDialog, setOpenDialog] = useState(false)

  const deleteMonth = async (reportId, monthId) => {
    const months = await fetch(`/api/month/${reportId}/${monthId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(m => m.json())
  }

  return (
    <div className="month">
      <DeleteDialog
        open={openDialog}
        title={'Are you sure?'}
        setOpen={setOpenDialog}
        message={'Delete the month implies delete all the topics and notes under each, are you sure you want to delete the full month?'}
        successAction={() => deleteMonth(reportId, month.id)}
      />

      <Typography component={'h3'}>
        {month.name}
        <IconButton className={classes.deleteButton} aria-label="delete" onClick={() => setOpenDialog(true)}>
          <DeleteIcon fontSize={'inherit'} />
        </IconButton>
      </Typography>

      {month.topics.map(topic => (
        <Topic key={`${topic.name}-${month.id}`} topic={topic} notes={topic.notes} />
      ))}
    </div>
  )
}

export default Month
