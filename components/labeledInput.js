import React from 'react'
import { TextField } from 'material-ui'
import { Button } from '@material-ui/core'

export const LabeledInput = ({ value, valueSetter, submitHandler }) => {
  return (
    <div>
      <TextField value={value} onChange={e => valueSetter(e.target.value)} hintText="Write here a note :)" />
      <Button variant="contained" color="primary" onClick={submitHandler}>
        Add Note
      </Button>
    </div>
  )
}

export default LabeledInput
