import React from 'react'
import { TextField } from 'material-ui'
import { Button } from '@material-ui/core'

export const LabeledInput = ({ value, valueSetter, submitHandler }) => {
  const submitWrapper = e => {
    e.preventDefault()
    submitHandler()
  }
  return (
    <form onSubmit={submitWrapper}>
      <TextField value={value} onChange={e => valueSetter(e.target.value)} hintText="Write here a note :)" />
      <Button variant="contained" color="primary" size="small" onClick={submitHandler}>
        Add Note
      </Button>
    </form>
  )
}

export default LabeledInput
